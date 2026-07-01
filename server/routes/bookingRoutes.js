// ============================================================================
// FILE: server/routes/bookingRoutes.js
// PURPOSE: Booking routes (Single production version)
// ============================================================================

const express = require('express');
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  updateBookingStatus
} = require('../controllers/bookingController');

const { protect } = require('../middleware/authMiddleware');

// ============================================
// CUSTOMER ROUTES
// ============================================

// Create booking
router.post('/', protect, createBooking);

// Get my bookings
router.get('/my-bookings', protect, getMyBookings);

// Get single booking
router.get('/:id', protect, getBookingById);

// Cancel booking
router.put('/:id/cancel', protect, cancelBooking);

// ============================================
// OWNER ROUTES
// ============================================

// Owner bookings
router.get('/owner/bookings', protect, getMyBookings);

// Update booking status
router.put('/:id/status', protect, updateBookingStatus);

module.exports = router;