// ============================================================================
// FILE: server/routes/paymentRoutes.js
// PURPOSE: Route definitions for Payment/Stripe API endpoints
// ============================================================================

const express = require('express');
const router = express.Router();
const { 
  createPaymentIntent,
  confirmPayment,
  handleWebhook 
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// ============================================
// PAYMENT ROUTES (All require authentication)
// ============================================

// Create payment intent (for checkout page)
router.route('/create-intent')
  .post(protect, createPaymentIntent);

// Confirm successful payment
router.route('/confirm')
  .post(protect, confirmPayment);

// Stripe webhook endpoint (NO auth - verified by Stripe signature)
// IMPORTANT: Must use raw body parser for this route in server.js!
router.route('/webhook')
  .post(handleWebhook);


module.exports = router;