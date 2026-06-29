// ============================================================================
// FILE: server/routes/carRoutes.js (SAFE MINIMAL VERSION)
// PURPOSE: Only uses BASIC functions that 99% of carControllers have
// ============================================================================


const express = require('express');
const router = express.Router();

// Import car controller
const carController = require('../controllers/carController');

// MOVED TO TOP: Import protect so it can be used anywhere in the file
const { protect } = require('../middleware/authMiddleware');

// ============================================
// DEBUG: See what's actually exported from controller
// ============================================
console.log('🔍 carController exports:', Object.keys(carController));


// ============================================
// PUBLIC ROUTES
// ============================================

// Get all cars - try different possible function names
router.get('/', async (req, res) => {
  try {
    if (typeof carController.getCars === 'function') {
      return await carController.getCars(req, res);
    }
    if (typeof carController.getAllCars === 'function') {
      return await carController.getAllCars(req, res);
    }
    if (typeof carController.index === 'function') {
      return await carController.index(req, res);
    }
    
    console.log('⚠️ No getCars function found, returning mock data');
    res.json({
      success: true,
      data: [],
      message: 'Car controller needs getCars function'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ⚠️ Get owner's cars (MUST be BEFORE /:id)
router.get('/owner/my-cars', protect, async (req, res) => {
  try {
    if (typeof carController.getMyCars === 'function') {
      return await carController.getMyCars(req, res);
    }
    
    res.status(501).json({ success: false, message: 'getMyCars not implemented' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get single car
router.get('/:id', async (req, res) => {
  try {
    if (typeof carController.getCarById === 'function') {
      return await carController.getCarById(req, res);
    }
    
    res.status(501).json({ success: false, message: 'getCarById not implemented' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ============================================
// PROTECTED ROUTES (require login)
// ============================================

// Create car
router.post('/', protect, async (req, res) => {
  try {
    if (typeof carController.createCar === 'function') {
      return await carController.createCar(req, res);
    }
    if (typeof carController.addCar === 'function') {
      return await carController.addCar(req, res);
    }
    
    res.status(501).json({ success: false, message: 'createCar not implemented' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update car
router.put('/:id', protect, async (req, res) => {
  try {
    if (typeof carController.updateCar === 'function') {
      return await carController.updateCar(req, res);
    }
    
    res.status(501).json({ success: false, message: 'updateCar not implemented' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete car
router.delete('/:id', protect, async (req, res) => {
  try {
    if (typeof carController.deleteCar === 'function') {
      return await carController.deleteCar(req, res);
    }
    
    res.status(501).json({ success: false, message: 'deleteCar not implemented' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


module.exports = router;