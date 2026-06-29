// ============================================================================
// FILE: server/routes/bookingRoutes.js
// PURPOSE: All booking-related API routes (Fixed version!)
// ============================================================================

const express = require('express');
const router = express.Router();

// Import controllers (use simple one for demo)
const { 
  createSimpleBooking,
  getMyBookingsSimple 
} = require('../controllers/simpleBookingController');

// ADDED: Import owner/admin controller for the missing routes
const { 
  getMyBookings, 
  updateBookingStatus 
} = require('../controllers/bookingController');

const { protect } = require('../middleware/authMiddleware');


// ============================================
// CUSTOMER BOOKING ROUTES (UNCHANGED)
// ============================================

// Create new booking (SIMPLE - No payment needed!)
router.route('/')
  .post(protect, createSimpleBooking);

// Get current user's bookings
router.route('/my-bookings')
  .get(protect, getMyBookingsSimple);


// ============================================
// OWNER BOOKING ROUTES (ADDED THESE TWO)
// ============================================

// Get owner's incoming bookings
router.route('/owner/bookings')
  .get(protect, getMyBookings);

// Update booking status (Approve/Reject for owners)
router.route('/:id/status')
  .put(protect, updateBookingStatus);


module.exports = router;