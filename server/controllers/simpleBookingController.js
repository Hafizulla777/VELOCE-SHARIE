// ============================================================================
// FILE: server/controllers/simpleBookingController.js (FINAL FIX - Handles Missing Owner)
// ============================================================================

const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your_email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your_app_password'
    }
  });
};

// Send confirmation email
const sendConfirmationEmail = async (booking) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"LUXE Cars 🚗" <${process.env.EMAIL_USER}>`,
      to: booking.customerEmail,
      subject: `✅ Booking Confirmed - ${booking.confirmationNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background: #0a0a0a; color: #fff; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #141414; border-radius: 10px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #d4af37, #f4e4bc); color: #000; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { padding: 30px; }
            .booking-details { background: #1f1f1f; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #333; }
            .detail-label { color: #999; }
            .detail-value { font-weight: bold; color: #d4af37; }
            .total { font-size: 24px; color: #d4af37; text-align: center; margin: 20px 0; }
            .btn { display: inline-block; background: #d4af37; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 BOOKING CONFIRMED!</h1>
              <p>Your luxury car reservation is confirmed</p>
            </div>
            
            <div class="content">
              <h2>Hello ${booking.customerName}!</h2>
              <p>Thank you for choosing LUXE Cars.</p>
              
              <div class="booking-details">
                <h3 style="color: #d4af37;">📋 Booking Details</h3>
                <div class="detail-row">
                  <span class="detail-label">Confirmation:</span>
                  <span class="detail-value">${booking.confirmationNumber}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Car:</span>
                  <span class="detail-value">${booking.carName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Pickup:</span>
                  <span class="detail-value">${new Date(booking.startDate).toLocaleDateString()}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Return:</span>
                  <span class="detail-value">${new Date(booking.endDate).toLocaleDateString()}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Days:</span>
                  <span class="detail-value">${booking.days}</span>
                </div>
              </div>

              <div class="total">Total: $${booking.totalAmount}</div>

              <p style="text-align: center;">
                <a href="http://localhost:5173/dashboard/my-bookings" class="btn">View Bookings</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${booking.customerEmail}`);
    return true;
  } catch (error) {
    console.error('❌ Email error:', error);
    return false;
  }
};

// @desc    Create booking - Works even if car has no owner field!
// @route   POST /api/bookings/create-simple
// @access  Private
const createSimpleBooking = async (req, res) => {
  try {
    const { carId, startDate, endDate, pickupLocation } = req.body;

    // Validation
    if (!carId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide carId, startDate, and endDate'
      });
    }

    // Find car
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    // Calculate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
    
    if (days < 1) {
      return res.status(400).json({
        success: false,
        message: 'Booking must be at least 1 day'
      });
    }

    // Get price
    const pricePerDay = car.pricePerDay || car.price || 100;
    const subtotal = pricePerDay * days;
    const serviceFee = 50;
    const tax = Math.round(subtotal * 0.0875);
    const totalAmount = subtotal + serviceFee + tax;

    // Generate confirmation number
    const confirmationNumber = `LUXE-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // ✅ FIX: Handle missing owner field gracefully
    let ownerId = car.owner;
    
    // If car doesn't have owner field, use admin user as fallback
    if (!ownerId) {
      console.log('⚠️ Car has no owner field, using system admin');
      
      // Find any admin user to use as owner
      const adminUser = await User.findOne({ role: 'admin' }).select('_id');
      if (adminUser) {
        ownerId = adminUser._id;
      } else {
        // If no admin, use the customer themselves (for demo mode)
        ownerId = req.user._id;
      }
    }

    console.log('📝 Creating booking with:');
    console.log('   Car:', car.name);
    console.log('   Customer:', req.user._id);
    console.log('   Owner:', ownerId);

    // Create booking with ALL required fields
    const booking = await Booking.create({
      car: carId,
      customer: req.user._id,
      owner: ownerId,                    // ✅ Now always has a value!
      startDate: start,
      endDate: end,
      totalPrice: totalAmount,
      status: 'pending',
      message: `Booking for ${car.name || 'Luxury Vehicle'} (${days} days)`
    });

    // Populate for response
    const populatedBooking = await Booking.findById(booking._id)
      .populate('customer', 'name email')
      .populate('car', 'name brand type image')
      .populate('owner', 'name email');

    // Send email
    const emailData = {
      customerName: populatedBooking.customer?.name || 'Valued Customer',
      customerEmail: populatedBooking.customer?.email || req.user.email,
      carName: populatedBooking.car?.name || 'Luxury Vehicle',
      confirmationNumber: booking.confirmationNumber,
      startDate: booking.startDate,
      endDate: booking.endDate,
      days: days,
      totalAmount: totalAmount,
      pickupLocation: pickupLocation || 'Main Office'
    };

    let emailSent = false;
    try {
      emailSent = await sendConfirmationEmail(emailData);
    } catch (emailError) {
      console.log('⚠️ Email failed but booking still created:', emailError.message);
    }

    return res.status(201).json({
      success: true,
      data: {
        booking: populatedBooking,
        emailSent,
        message: emailSent 
          ? '🎉 Booking confirmed! Check your email.' 
          : '✅ Booking confirmed!'
      },
      message: 'Booking created successfully!'
    });

  } catch (error) {
    console.error('❌ Error creating booking:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Server error while creating booking',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get my bookings
const getMyBookingsSimple = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id })
      .populate('car', 'name year color image')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });

  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings'
    });
  }
};


module.exports = {
  createSimpleBooking,
  getMyBookingsSimple,
  sendConfirmationEmail
};