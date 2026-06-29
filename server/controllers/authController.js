const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ── Generate JWT Token ──
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// ── REGISTER ──
// FIXES Error E2: Returns { user, token } — NOT raw user
const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    // ── Check if user exists ──
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // ── Create user ──
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'customer', // Frontend can pass 'owner'
      phone: phone || '',
    });

    // ── Generate token ──
    const token = generateToken(user._id);

    // ── CRITICAL: This exact shape is what frontend expects ──
    res.status(201).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          avatar: user.avatar,
          createdAt: user.createdAt,
        },
        token,
      },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
    });
  }
};

// ── LOGIN ──
// FIXES Error E2: Same { user, token } shape
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // ── Find user (include password for comparison) ──
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // ── Compare password ──
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // ── Generate token ──
    const token = generateToken(user._id);

    // ── CRITICAL: Same shape as register ──
    res.status(200).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          avatar: user.avatar,
          createdAt: user.createdAt,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during login',
    });
  }
};

// ── GET CURRENT USER (profile refresh) ──
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          avatar: user.avatar,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching profile',
    });
  }
};


// ── UPDATE PROFILE ──
const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body; // Removed avatar completely

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Safely update only allowed fields
    if (name && name.trim() !== '') user.name = name.trim();
    if (phone !== undefined && phone !== null) user.phone = phone;

    await user.save();

    console.log('✅ Profile updated successfully in DB for:', user.email);

    res.status(200).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    console.error('❌ PROFILE UPDATE ERROR:', error.message); // This will reveal the exact error in your terminal
    res.status(500).json({
      success: false,
      message: error.message || 'Server error updating profile',
    });
  }
};

module.exports = { register, login, getMe, updateProfile };