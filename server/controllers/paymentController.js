// ============================================================================
// FILE: server/controllers/paymentController.js
// PURPOSE: Stripe payment integration - create intents, confirm, webhooks
// ============================================================================

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');

// @desc    Create Stripe Payment Intent
// @route   POST /api/payments/create-intent
// @access  Private (Authenticated users)
const createPaymentIntent = async (req, res) => {
  try {
    const { carId, startDate, endDate, pickupLocation } = req.body;
    const customerId = req.user._id;

    // Validate required fields
    if (!carId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide carId, startDate, and endDate'
      });
    }

    // Check if car exists and is available
    const car = await Car.findById(carId);
    
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    if (car.status !== 'approved') {
      return res.status(400).json({
        success: false,
        message: 'This car is not available for booking'
      });
    }

    // Calculate rental days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      return res.status(400).json({
        success: false,
        message: 'Booking must be at least 1 day'
      });
    }

    // Use pricePerDay or price (fallback for mixed data formats)
    const pricePerDay = car.pricePerDay || car.price;
    const subtotal = pricePerDay * diffDays;
    const serviceFee = 50; // Fixed service fee
    const insurance = 120; // Optional insurance
    const taxRate = 0.0875; // 8.75% tax
    const tax = Math.round(subtotal * taxRate);
    const totalAmount = subtotal + serviceFee + insurance + tax;

    // Convert to cents for Stripe (amount must be in smallest currency unit)
    const amountInCents = Math.round(totalAmount * 100);

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      
      // Metadata for tracking
      metadata: {
        customerId: customerId.toString(),
        carId: carId.toString(),
        startDate,
        endDate,
        days: diffDays.toString(),
        integration_check: 'accept_a_payment'
      },

      // Automatic payment methods
      automatic_payment_methods: {
        enabled: true
      }
    });

    // Create pending booking record in database
    const booking = new Booking({
      customer: customerId,
      car: carId,
      owner: car.owner,
      startDate,
      endDate,
      days: diffDays,
      subtotal,
      serviceFee,
      insurance,
      tax,
      totalAmount,
      pickupLocation: pickupLocation || 'To be determined',
      status: 'pending',
      paymentStatus: 'pending',
      stripePaymentIntentId: paymentIntent.id
    });

    await booking.save();

    // Send client secret to frontend (needed to complete payment)
    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        bookingId: booking._id,
        paymentIntentId: paymentIntent.id,
        amount: totalAmount,
        currency: 'usd'
      },
      message: 'Payment intent created successfully'
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    
    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    if (error.type === 'StripeInvalidRequestError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment request'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating payment intent',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Confirm payment after successful Stripe checkout
// @route   POST /api/payments/confirm
// @access  Private
const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, bookingId } = req.body;

    if (!paymentIntentId || !bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Payment intent ID and booking ID are required'
      });
    }

    // Retrieve payment intent from Stripe to verify status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        success: false,
        message: `Payment not completed. Status: ${paymentIntent.status}`
      });
    }

    // Find and update booking in database
    const booking = await Booking.findById(bookingId)
      .populate('customer', 'name email')
      .populate('car', 'name year color image');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Verify this booking belongs to the current user
    if (booking.customer._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to confirm this booking'
      });
    }

    // Update booking status
    booking.status = 'confirmed';
    booking.paymentStatus = 'paid';
    booking.stripePaymentIntentId = paymentIntentId;
    booking.paidAt = new Date();
    booking.confirmationNumber = generateConfirmationNumber();
    
    await booking.save();

    // TODO: Send confirmation email
    // await sendBookingConfirmationEmail(booking);

    // TODO: Notify car owner about new booking
    // await notifyOwner(booking);

    res.json({
      success: true,
      data: {
        booking,
        confirmationNumber: booking.confirmationNumber,
        transactionId: paymentIntentId
      },
      message: 'Payment confirmed and booking finalized!'
    });

  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while confirming payment'
    });
  }
};

// @desc    Handle Stripe webhook events
// @route   POST /api/payments/webhook
// @access  Public (authenticated by Stripe signature)
const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify webhook signature (CRITICAL for security)
    event = stripe.webhooks.constructEvent(
      req.rawBody, // Raw body (not parsed JSON)
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the specific event type
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      await handleSuccessfulPayment(paymentIntent);
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      await handleFailedPayment(failedPayment);
      break;

    case 'charge.refunded':
      const refund = event.data.object;
      await handleRefund(refund);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Return 200 to acknowledge receipt of the event
  res.json({ received: true });
};

// Helper: Handle successful payment from webhook
const handleSuccessfulPayment = async (paymentIntent) => {
  try {
    const { customerId, carId } = paymentIntent.metadata;

    // Find booking by Stripe payment intent ID
    const booking = await Booking.findOne({ 
      stripePaymentIntentId: paymentIntent.id 
    });

    if (booking && booking.paymentStatus !== 'paid') {
      booking.status = 'confirmed';
      booking.paymentStatus = 'paid';
      booking.paidAt = new Date();
      booking.confirmationNumber = generateConfirmationNumber();
      await booking.save();

      console.log(`✅ Booking ${booking._id} confirmed via webhook`);
      
      // TODO: Send email notification
    }

  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
};

// Helper: Handle failed payment
const handleFailedPayment = async (paymentIntent) => {
  try {
    const booking = await Booking.findOne({ 
      stripePaymentIntentId: paymentIntent.id 
    });

    if (booking) {
      booking.status = 'cancelled';
      booking.paymentStatus = 'failed';
      booking.failureReason = paymentIntent.last_payment_error?.message || 'Unknown error';
      await booking.save();

      console.log(`❌ Booking ${booking._id} failed via webhook`);
      
      // TODO: Notify user about failed payment
    }

  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
};

// Helper: Handle refund
const handleRefund = async (charge) => {
  try {
    // Find booking by charge ID or payment intent
    const booking = await Booking.findOne({
      $or: [
        { stripeChargeId: charge.id },
        { stripePaymentIntentId: charge.payment_intent }
      ]
    });

    if (booking) {
      booking.paymentStatus = 'refunded';
      booking.refundedAt = new Date();
      booking.refundAmount = charge.amount_refunded / 100; // Convert back to dollars
      await booking.save();

      console.log(`💰 Refund processed for booking ${booking._id}`);
      
      // TODO: Notify user and owner about refund
    }

  } catch (error) {
    console.error('Error handling refund:', error);
  }
};

// Helper: Generate unique confirmation number
const generateConfirmationNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LUXE-${timestamp}-${random}`;
};


module.exports = {
  createPaymentIntent,
  confirmPayment,
  handleWebhook
};