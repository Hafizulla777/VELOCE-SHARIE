// ============================================================================
// FILE: server/server.js (FINAL FIX - Correct Route Order)
// ============================================================================

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');


// Add this near the top with other requires:
const contactRoutes = require('./routes/contactRoutes');

const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://veloce-sharie.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ============================================
// ROUTE IMPORTS
// ============================================

const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const simpleBookingRoutes = require('./routes/simpleBookingRoutes'); // NEW simple routes
const adminRoutes = require('./routes/adminRoutes');


// ============================================
// MOUNT ROUTES - ORDER MATTERS!
// More specific routes MUST come first!
// ============================================

console.log('🚀 Loading routes...');

// Auth routes
app.use('/api/auth', authRoutes);
console.log('  ✅ Auth routes loaded');

// Car routes
app.use('/api/cars', carRoutes);
console.log('  ✅ Car routes loaded');


app.use('/api/contact', contactRoutes);

// ⭐ CRITICAL: Mount SIMPLE booking routes BEFORE general booking routes!
// This ensures /create-simple is caught by our new controller
app.use('/api/bookings', simpleBookingRoutes);   // ← FIRST (catches /create-simple)
console.log('  ✅ Simple booking routes loaded (/create-simple)');

// General booking routes (old ones) - mounted AFTER so they don't override
app.use('/api/bookings', bookingRoutes);           // ← SECOND (catches other endpoints)
console.log('  ✅ General booking routes loaded');

// Admin routes
app.use('/api/admin', adminRoutes);
console.log('  ✅ Admin routes loaded');


// ============================================
// ERROR HANDLING
// ============================================

app.use((err, req, res, next) => {
  console.error('💥 Error:', err.message || err);

  // Log full error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Stack:', err.stack);
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      details: err
    })
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});


// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║                                          ║
║   🚀 LUXE Car Rental Server            ║
║                                          ║
║   Environment: ${process.env.NODE_ENV || 'development'}
║   Port: ${PORT}                             ║
║   MongoDB: Connected                     ║
║                                          ║
║   Available Endpoints:                   ║
║   ────────────────────────────────        ║
║   POST /api/auth/login                  ║
║   POST /api/auth/register               ║
║   GET  /api/cars                        ║
║   GET  /api/cars/:id                    ║
║   POST /api/bookings/create-simple     ⭐ NEW!
║   GET  /api/admin/stats                 ║
║   PUT  /api/admin/cars/:id/approve      ║
║   PUT  /api/admin/cars/:id/reject       ║
║                                          ║
╚══════════════════════════════════════╝
  `);
});


module.exports = app;