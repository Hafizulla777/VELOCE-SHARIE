// ============================================================================
// FILE: server/controllers/bookingController.js (UPDATED)
// PURPOSE: Extended booking controller with email notifications & admin features
// ============================================================================

const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');
// const nodemailer = require('nodemailer'); // Uncomment when ready to send emails

// @desc    Create new booking (called after payment success)
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const {
      carId,
      startDate,
      endDate,
      pickupLocation,
      paymentIntentId,
      totalAmount
    } = req.body;

    if (!carId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

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

    const existingBooking = await Booking.findOne({
      car: carId,
      status: { $in: ['confirmed', 'active'] },
      $or: [
        { startDate: { $lte: new Date(startDate) }, endDate: { $gte: new Date(startDate) } },
        { startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(endDate) } },
        { startDate: { $gte: new Date(startDate) }, endDate: { $lte: new Date(endDate) } }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'Car is already booked for selected dates'
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));

    const pricePerDay = car.pricePerDay || car.price;
    const subtotal = pricePerDay * diffDays;
    const serviceFee = 50;
    const insurance = 120;
    const taxRate = 0.0875;
    const tax = Math.round(subtotal * taxRate);
    const total = subtotal + serviceFee + insurance + tax;

    const booking = await Booking.create({
      customer: req.user._id,
      car: carId,
      owner: car.owner,
      startDate,
      endDate,
      days: diffDays,
      subtotal,
      serviceFee,
      insurance,
      tax,
      totalAmount: totalAmount || total,
      pickupLocation,
      status: 'confirmed',
      paymentStatus: 'paid',
      stripePaymentIntentId: paymentIntentId,
      confirmationNumber: generateConfirmationNumber(),
      paidAt: new Date()
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('customer', 'name email phone')
      .populate('car', 'name year color image')
      .populate('owner', 'name email');

    res.status(201).json({
      success: true,
      data: populatedBooking,
      message: 'Booking created successfully'
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating booking'
    });
  }
};

// @desc    Get single booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('car', 'name year color image pricePerDay images')
      .populate('owner', 'name email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (
      booking.customer._id.toString() !== req.user._id.toString() &&
      booking.owner._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking'
      });
    }

    res.json({
      success: true,
      data: booking
    });

  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching booking'
    });
  }
};

// @desc    Get current user's bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;

    let query = {};

    if (req.user.role === 'owner') {
      query.owner = req.user._id;
    } else if (req.user.role === 'customer') {
      query.customer = req.user._id;
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    const [bookings, total] = await Promise.all([
      Booking.find(query)
        .populate('car', 'name year color image')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Booking.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalBookings: total
        }
      }
    });

  } catch (error) {
    console.error('Error fetching my bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings'
    });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (
      booking.customer.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    if (['completed', 'cancelled'].includes(booking.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel a ${booking.status} booking`
      });
    }

    const now = new Date();
    const pickupTime = new Date(booking.startDate);
    const hoursUntilPickup = (pickupTime - now) / (1000 * 60 * 60);

    let refundAmount = 0;

    if (hoursUntilPickup > 24) {
      refundAmount = booking.totalAmount;
      booking.refundAmount = refundAmount;
    } else if (hoursUntilPickup > 0) {
      refundAmount = Math.round(booking.totalAmount * 0.5);
      booking.refundAmount = refundAmount;
    } else {
      refundAmount = 0;
    }

    booking.status = 'cancelled';
    booking.cancelledAt = new Date();
    booking.cancelledBy = req.user._id;
    await booking.save();

    res.json({
      success: true,
      data: {
        booking,
        refundAmount,
        refundPolicy: hoursUntilPickup > 24 ? 'full' : hoursUntilPickup > 0 ? 'partial' : 'none'
      },
      message: 'Booking cancelled successfully'
    });

  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling booking'
    });
  }
};

// @desc    Update booking status (for owners/admins)
// @route   PUT /api/bookings/:id/status
// @access  Private (Owner/Admin only)
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'approved', 'rejected', 'active', 'confirmed', 'completed', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Safely check owner to prevent crash if owner is missing
    if (booking.owner) {
      if (
        booking.owner.toString() !== req.user._id.toString() &&
        req.user.role !== 'admin'
      ) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this booking'
        });
      }
    }

    booking.status = status;
    await booking.save();

    res.json({
      success: true,
      data: booking,
      message: `Booking status updated to ${status}`
    });

  } catch (error) {
    console.error('❌ Error updating booking status:', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while updating booking status'
    });
  }
};

// Helper function: Generate unique confirmation number
const generateConfirmationNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LUXE-${timestamp}-${random}`;
};

// ============================================================================
// CRITICAL: This was missing! It exports the functions so routes can use them.
// ============================================================================
module.exports = {
  createBooking,
  getBookingById,
  getMyBookings,
  cancelBooking,
  updateBookingStatus
};