// ============================================================================
// FILE: server/routes/adminRoutes.js
// PURPOSE: Route definitions for all Admin Dashboard API endpoints
// ============================================================================

const express = require('express');
const router = express.Router();
const { 
  getDashboardStats,
  getAllCustomers,
  getCustomerById,
  toggleBanCustomer,
  getPendingCars,
  approveCarListing,
  rejectCarListing,
  getAllBookings,
  getRevenueAnalytics
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes below require authentication AND admin role
router.use(protect);
router.use(authorize('admin'));

// ============================================
// DASHBOARD STATISTICS
// ============================================
router.route('/stats')
  .get(getDashboardStats);

// ============================================
// CUSTOMER MANAGEMENT
// ============================================
router.route('/customers')
  .get(getAllCustomers);

router.route('/customers/:id')
  .get(getCustomerById);

router.route('/customers/:id/ban')
  .put(toggleBanCustomer);

// ============================================
// CAR LISTING MODERATION
// ============================================
router.route('/cars/pending')
  .get(getPendingCars);

router.route('/cars/:id/approve')
  .put(approveCarListing);

router.route('/cars/:id/reject')
  .put(rejectCarListing);

// ============================================
// BOOKING MANAGEMENT
// ============================================
router.route('/bookings')
  .get(getAllBookings);

// ============================================
// REVENUE ANALYTICS
// ============================================
router.route('/revenue')
  .get(getRevenueAnalytics);


module.exports = router;