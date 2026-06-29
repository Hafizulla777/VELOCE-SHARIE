const express = require('express');
const router = express.Router();
const { 
  createSimpleBooking,
  getMyBookingsSimple 
} = require('../controllers/simpleBookingController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.route('/create-simple').post(createSimpleBooking);
router.route('/my-bookings-simple').get(getMyBookingsSimple);
module.exports = router;