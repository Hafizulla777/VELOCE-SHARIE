// ============================================================================
// FILE: server/controllers/adminController.js
// PURPOSE: All API endpoint handlers for Admin Dashboard functionality
// ============================================================================

const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
const getDashboardStats = async (req, res) => {
  try {
    // Get current date for filtering
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));

    // Parallel queries for better performance
    const [
      totalCustomers,
      activeBookings,
      pendingCars,
      totalRevenue,
      recentBookings,
      newCustomersThisMonth
    ] = await Promise.all([
      // Total customers count
      User.countDocuments({ role: 'customer' }),
      
      // Active bookings (not cancelled or completed)
      Booking.countDocuments({
        status: { $in: ['confirmed', 'active'] }
      }),
      
      // Pending car approvals
      Car.countDocuments({ status: 'pending' }),
      
      // Total revenue from completed bookings
      Booking.aggregate([
        { $match: { status: 'completed', paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      
      // Recent 10 bookings with populated data
      Booking.find()
        .populate('customer', 'name email')
        .populate('car', 'name year image')
        .sort({ createdAt: -1 })
        .limit(10),
        
      // New customers in last 30 days
      User.countDocuments({
        role: 'customer',
        createdAt: { $gte: thirtyDaysAgo }
      })
    ]);

    // Calculate revenue (handle empty aggregation result)
    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

    res.json({
      success: true,
      data: {
        stats: {
          totalCustomers,
          activeBookings,
          pendingCars,
          totalRevenue: revenue,
          newCustomersThisMonth
        },
        recentBookings
      }
    });

  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all customers with pagination
// @route   GET /api/admin/customers?page=1&limit=10&search=
// @access  Private (Admin only)
const getAllCustomers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    
    // Build query
    const query = {
      role: { $in: ['customer', 'owner'] }, // Exclude admins
      ...(search && {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      })
    };

    // Execute query with pagination
    const [customers, total] = await Promise.all([
      User.find(query)
        .select('-password') // Exclude password field
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      User.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        customers,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalCustomers: total,
          limit
        }
      }
    });

  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching customers'
    });
  }
};

// @desc    Get customer by ID
// @route   GET /api/admin/customers/:id
// @access  Private (Admin only)
const getCustomerById = async (req, res) => {
  try {
    const customer = await User.findById(req.params.id)
      .select('-password')
      .lean();

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Get customer's booking history
    const bookings = await Booking.find({ customer: req.params.id })
      .populate('car', 'name image')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        customer,
        recentBookings: bookings
      }
    });

  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching customer details'
    });
  }
};

// @desc    Ban/Unban customer
// @route   PUT /api/admin/customers/:id/ban
// @access  Private (Admin only)
const toggleBanCustomer = async (req, res) => {
  try {
    const { action } = req.body; // 'ban' or 'unban'
    
    if (!['ban', 'unban'].includes(action)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid action. Must be "ban" or "unban"'
      });
    }

    const customer = await User.findByIdAndUpdate(
      req.params.id,
      { 
        isBanned: action === 'ban',
        bannedAt: action === 'ban' ? new Date() : null,
        bannedReason: req.body.reason || ''
      },
      { new: true }
    ).select('-password');

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    res.json({
      success: true,
      message: `Customer ${action === 'ban' ? 'banned' : 'unbanned'} successfully`,
      data: customer
    });

  } catch (error) {
    console.error('Error toggling ban status:', error);
    res.status(500).json({
      success: false,
      message: `Server error while ${req.body.action}ning customer`
    });
  }
};

// @desc    Get pending car listings for approval
// @route   GET /api/admin/cars/pending?page=1&limit=10
// @access  Private (Admin only)
const getPendingCars = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const [cars, total] = await Promise.all([
      Car.find({ status: 'pending' })
        .populate('owner', 'name email phone')
        .sort({ submittedAt: 1 }) // Oldest first
        .skip((page - 1) * limit)
        .limit(limit),
      Car.countDocuments({ status: 'pending' })
    ]);

    res.json({
      success: true,
      data: {
        cars,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalPending: total
        }
      }
    });

  } catch (error) {
    console.error('Error fetching pending cars:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching pending cars'
    });
  }
};

// @desc    Approve car listing
// @route   PUT /api/admin/cars/:id/approve
// @access  Private (Admin only)
const approveCarListing = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car listing not found'
      });
    }

    if (car.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Car is already ${car.status}`
      });
    }

    // Update car status to approved
    car.status = 'approved';
    car.approvedBy = req.user._id;
    car.approvedAt = new Date();
    await car.save();

    // TODO: Send notification/email to owner about approval
    // await sendEmail(car.owner.email, 'Your car has been approved!', ...);

    res.json({
      success: true,
      message: 'Car listing approved successfully',
      data: car
    });

  } catch (error) {
    console.error('Error approving car:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while approving car listing'
    });
  }
};

// @desc    Reject car listing
// @route   PUT /api/admin/cars/:id/reject
// @access  Private (Admin only)
const rejectCarListing = async (req, res) => {
  try {
    const { reason } = req.body;

    if (!reason || reason.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Rejection reason must be at least 10 characters'
      });
    }

    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car listing not found'
      });
    }

    if (car.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Car is already ${car.status}`
      });
    }

    // Update car status to rejected with reason
    car.status = 'rejected';
    car.rejectedBy = req.user._id;
    car.rejectedAt = new Date();
    car.rejectionReason = reason;
    await car.save();

    // TODO: Send notification/email to owner about rejection
    // await sendEmail(car.owner.email, 'Your car was rejected', reason);

    res.json({
      success: true,
      message: 'Car listing rejected successfully',
      data: {
        carId: car._id,
        rejectionReason: reason
      }
    });

  } catch (error) {
    console.error('Error rejecting car:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while rejecting car listing'
    });
  }
};

// @desc    Get all bookings (admin view)
// @route   GET /api/admin/bookings?page=1&limit=10&status=
// @access  Private (Admin only)
const getAllBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { status, startDate, endDate } = req.query;

    // Build filter query
    const query = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const [bookings, total] = await Promise.all([
      Booking.find(query)
        .populate('customer', 'name email phone')
        .populate('car', 'name year color image pricePerDay')
        .populate('owner', 'name email')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Booking.countDocuments(query)
    ]);

    // Calculate total revenue from these bookings
    const revenueResult = await Booking.aggregate([
      { $match: { ...query, paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      success: true,
      data: {
        bookings,
        revenue: revenueResult.length > 0 ? revenueResult[0].total : 0,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalBookings: total
        }
      }
    });

  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings'
    });
  }
};

// @desc    Get revenue analytics
// @route   GET /api/admin/revenue?period=month&year=2024
// @access  Private (Admin only)
const getRevenueAnalytics = async (req, res) => {
  try {
    const { period = 'month', year = new Date().getFullYear() } = req.query;

    let groupBy;
    switch (period) {
      case 'day':
        groupBy = { 
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } 
        };
        break;
      case 'week':
        groupBy = { 
          $isoWeek: '$createdAt' 
        };
        break;
      case 'month':
      default:
        groupBy = { 
          $dateToString: { format: '%Y-%m', date: '$createdAt' } 
        };
        break;
    }

    const revenueData = await Booking.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${parseInt(year) + 1}-01-01`)
          }
        }
      },
      {
        $group: {
          _id: groupBy,
          revenue: { $sum: '$totalAmount' },
          bookingsCount: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: {
        period,
        year,
        revenueData
      }
    });

  } catch (error) {
    console.error('Error fetching revenue analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching revenue data'
    });
  }
};


module.exports = {
  getDashboardStats,
  getAllCustomers,
  getCustomerById,
  toggleBanCustomer,
  getPendingCars,
  approveCarListing,
  rejectCarListing,
  getAllBookings,
  getRevenueAnalytics
};