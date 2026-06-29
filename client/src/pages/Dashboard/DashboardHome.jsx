// ============================================================================
// FILE: src/pages/Dashboard/DashboardHome.jsx (FIXED VERSION)
// PURPOSE: Dashboard home page with working booking display
// ============================================================================

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import DashboardStats from '../../components/Dashboard/DashboardStats';
import BookingCard from '../../components/Dashboard/BookingCard';
import Loader from '../../components/Loader/Loader';
import { FaArrowRight, FaClipboardList, FaCar, FaCrown } from 'react-icons/fa';
import { fadeUp, blurReveal, staggerContainer } from '../../components/animations/variants';

const DashboardHome = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        console.log('📊 Fetching dashboard data...');
        
        // ✅ FIX: Use CORRECT endpoint - our new simple booking system
        const response = await api.get('/bookings/my-bookings-simple');
        
        console.log('📋 Response:', response.data);
        
        if (response.data.success) {
          const bookingsData = response.data.data || [];
          setBookings(bookingsData);
          console.log(`✅ Loaded ${bookingsData.length} bookings`);
        }
        
      } catch (error) {
        console.error('❌ Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // ✅ FIX: Get recent bookings (limit to 3 for dashboard)
  const recentBookings = bookings.slice(0, 3);

  // ✅ FIX: Safe car name extraction
  const getCarName = (booking) => {
    // Try multiple possible field structures
    if (booking.car?.name) return booking.car.name;
    if (booking.car?.brand && booking?.type) return `${booking.car.brand} ${booking.type}`;
    if (typeof booking.car === 'string') return 'Luxury Vehicle';
    if (typeof booking.car === 'object' && booking.car !== null) {
      return Object.values(booking.car).find(v => typeof v === 'string' && v.length > 2) || 'Premium Car';
    }
    return 'Luxury Vehicle';
  };

  // ✅ FIX: Get car image safely
  const getCarImage = (booking) => {
    if (booking.car?.image) return booking.car.image;
    if (booking.car?.imageUrl) return booking.car.imageUrl;
    if (Array.isArray(booking.car?.images) && booking.car.images[0]) return booking.car.images[0];
    return 'https://images.unsplash.com/photo-1494976766949-88df6e44f042?w=200&h=150&fit=crop';
  };

  // ✅ FIX: Get price safely
  const getPriceDisplay = (booking) => {
    if (booking.totalPrice) return `$${booking.totalPrice}`;
    if (booking.totalAmount) return `$${booking.totalAmount}`;
    if (booking.subtotal) return `$${booking.subtotal}`;
    return '$0';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Invalid date';
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        variants={blurReveal}
        initial="hidden"
        animate="visible"
        className="relative rounded-3xl overflow-hidden border border-white/[0.06]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 via-primary-500/10 to-transparent" />
        <div className="absolute top-0 right-0 w-[400px] h-[200px] bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <motion.p variants={fadeUp} className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary-400 mb-2">
                {user?.role === 'owner' ? 'Fleet Owner Dashboard' : 'Welcome Back'}
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-300">{user?.name?.split(' ')[0]}</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-white/40 text-sm mt-2 max-w-md">
                {user?.role === 'owner'
                  ? 'Manage your fleet, track earnings, and oversee all reservations from one place.'
                  : 'Your luxury journey continues. Browse your bookings or find your next ride.'}
              </motion.p>
            </div>
            <motion.div variants={fadeUp} className="flex gap-3 flex-shrink-0">
              <Link to="/cars">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-xs uppercase tracking-[0.15em] px-6 py-3.5 rounded-xl shadow-lg shadow-primary-500/25 inline-flex items-center gap-2.5"
                >
                  <FaCar className="text-sm" />
                  Browse Fleet
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <DashboardStats bookings={bookings} />

      {/* Quick Actions (Owner Only) */}
      {user?.role === 'owner' && (
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          <motion.div
            variants={fadeUp}
            className="group rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-6 hover:border-primary-500/20 transition-all duration-500 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/20 flex items-center justify-center">
                <FaCrown className="text-white text-lg" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-sm">List a New Car</h3>
                <p className="text-xs text-white/35 mt-0.5">Add a vehicle to your fleet</p>
              </div>
              <FaArrowRight className="text-white/20 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="group rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-6 hover:border-primary-500/20 transition-all duration-500 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20 flex items-center justify-center">
                <FaClipboardList className="text-white text-lg" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-sm">View All Bookings</h3>
                <p className="text-xs text-white/35 mt-0.5">Manage incoming reservations</p>
              </div>
              <FaArrowRight className="text-white/20 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Recent Bookings */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">Recent Bookings</h2>
            <p className="text-xs text-white/35 mt-1">Your latest rental activity</p>
          </div>
          {recentBookings.length > 3 && (
            <Link to="/dashboard/my-bookings" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-500 hover:text-primary-400 transition-colors group">
              View All
              <FaArrowRight className="text-[9px] group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {recentBookings.length === 0 ? (
          /* Empty State */
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-dashed border-white/10 bg-white/[0.01] p-12 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
              <FaCar className="text-white/20 text-2xl" />
            </div>
            <h3 className="font-bold text-white text-lg mb-2">No bookings yet</h3>
            <p className="text-sm text-white/35 mb-6 max-w-sm mx-auto">
              You haven't made any reservations yet. Explore our premium fleet and book your first luxury ride.
            </p>
            <Link to="/cars">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-xs uppercase tracking-[0.15em] px-8 py-3.5 rounded-xl shadow-lg shadow-primary-500/25 inline-flex items-center gap-2.5"
              >
                Explore Fleet
                <FaArrowRight className="text-[10px]" />
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          /* Bookings List */
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <BookingCard 
                key={booking._id || Math.random()} 
                booking={{
                  ...booking,
                  // ✅ Ensure these fields exist for BookingCard component
                  _id: booking._id,
                  confirmationNumber: booking.confirmationNumber,
                  startDate: booking.startDate,
                  endDate: booking.endDate,
                  status: booking.status,
                  // Pass extracted data as props so BookingCard can use them
                  _carName: getCarName(booking),
                  _carImage: getCarImage(booking),
                  _priceDisplay: getPriceDisplay(booking)
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;