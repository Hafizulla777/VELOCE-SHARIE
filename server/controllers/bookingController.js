// ============================================================================
// FILE: server/controllers/bookingController.js
// ============================================================================

const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const {
      car: carId,
      carId: altCarId,
      startDate,
      endDate,
      pickupLocation,
      paymentIntentId,
      totalAmount
    } = req.body;

    const finalCarId = carId || altCarId;

    if (!finalCarId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide car, start date, and end date'
      });
    }

    // ── FIX: Strict Date Validation to prevent "Invalid Date" DB crashes ──
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ success: false, message: 'Invalid date format provided' });
    }

    if (start >= end) {
      return res.status(400).json({ success: false, message: 'End date must be after start date' });
    }

    const car = await Car.findById(finalCarId);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    // ── FIX: Only block if there is an APPROVED booking. Ignore pending ones. ──
    const isAvailable = await Booking.isCarAvailable(finalCarId, start, end);
    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Car is already booked and approved for these dates. Please try different dates.'
      });
    }

    const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));

    // Fee Logic (Preserved)
    const pricePerDay = car.pricePerDay || car.price || 0;
    const subtotal = pricePerDay * diffDays;
    const serviceFee = 50;
    const insurance = 120;
    const taxRate = 0.0875;
    const tax = Math.round(subtotal * taxRate);
    const total = subtotal + serviceFee + insurance + tax;

    // ── FIX: Status is now 'pending'. The owner must approve it. ──
    const booking = await Booking.create({
      customer: req.user._id,
      car: finalCarId,
      owner: car.owner,
      startDate: start,
      endDate: end,
      days: diffDays,
      subtotal,
      serviceFee,
      insurance,
      tax,
      totalAmount: totalAmount || total,
      totalPrice: totalAmount || total,
      pickupLocation,
      status: 'pending', // FIXED: Back to pending!
      paymentStatus: 'paid',
      stripePaymentIntentId: paymentIntentId,
      confirmationNumber: generateConfirmationNumber(),
      paidAt: new Date()
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('customer', 'name email phone')
      .populate('car')
      .populate('owner', 'name email');

    res.status(201).json({
      success: true,
      data: populatedBooking,
      message: 'Booking request sent to owner!'
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, message: 'Server error while creating booking' });
  }
};

// @desc    Get single booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('car')
      .populate('owner', 'name email phone');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (
      booking.customer._id.toString() !== req.user._id.toString() &&
      booking.owner?.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this booking' });
    }

    res.json({ success: true, data: booking });

  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching booking' });
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
        .populate('car')
        .populate('customer', 'name email phone')
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
    res.status(500).json({ success: false, message: 'Server error while fetching bookings' });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (
      booking.customer.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this booking' });
    }

    if (['completed', 'cancelled'].includes(booking.status)) {
      return res.status(400).json({ success: false, message: `Cannot cancel a ${booking.status} booking` });
    }

    const now = new Date();
    const hoursUntilPickup = (new Date(booking.startDate) - now) / (1000 * 60 * 60);

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
    res.status(500).json({ success: false, message: 'Server error while cancelling booking' });
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
      return res.status(400).json({ success: false, message: `Invalid status.` });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.owner) {
      if (
        booking.owner.toString() !== req.user._id.toString() &&
        req.user.role !== 'admin'
      ) {
        return res.status(403).json({ success: false, message: 'Not authorized' });
      }
    }

    booking.status = status;
    await booking.save();

    const updatedBooking = await Booking.findById(booking._id).populate('car').populate('customer', 'name email phone');

    res.json({ success: true, data: updatedBooking, message: `Booking status updated to ${status}` });
  } catch (error) {
    console.error('Error updating booking status:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// Helper function: Generate unique confirmation number
const generateConfirmationNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LUXE-${timestamp}-${random}`;
};

module.exports = {
  createBooking,
  getBookingById,
  getMyBookings,
  cancelBooking,
  updateBookingStatus
};