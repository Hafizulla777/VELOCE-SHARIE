import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiCheck, FiX, FiCalendar, FiUser } from 'react-icons/fi';
import api from '../../../utils/api';
import { fadeUp, staggerContainer } from '../../../components/animations/variants';
import Loader from '../../../components/Loader/Loader';

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
  approved: 'bg-green-500/20 text-green-400 border-green-500/30',
  active: 'bg-green-500/20 text-green-400 border-green-500/30', // Added active
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
  completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  cancelled: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/bookings/owner/bookings');
      
      if (Array.isArray(data)) {
        setBookings(data);
      } else if (data?.data?.bookings && Array.isArray(data.data.bookings)) {
        setBookings(data.data.bookings);
      } else {
        setBookings([]);
      }
    } catch (error) {
      toast.error('Failed to fetch bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await api.put(`/bookings/${id}/status`, { status: newStatus });
      toast.success(`Booking ${newStatus}`);
      fetchBookings(); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const filteredBookings = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  if (loading) return <Loader />;

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer(0.05)} className="p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Rental Requests</h1>
          <p className="text-gray-400 mt-1">Manage incoming bookings for your fleet</p>
        </div>
        <div className="flex gap-2 p-1 glass-panel rounded-xl">
          {['all', 'pending', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                filter === f ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <motion.div variants={fadeUp} className="glass-card rounded-2xl p-12 text-center">
          <h3 className="text-xl text-white mb-2">No {filter !== 'all' ? filter : ''} bookings found</h3>
          <p className="text-gray-400 text-sm mt-2">When customers book your cars, their requests will appear here.</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <motion.div key={booking._id} variants={fadeUp} className="glass-card rounded-2xl p-5 flex flex-col lg:flex-row gap-5 items-start lg:items-center">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <img src={booking.car?.image || booking.car?.images?.[0] || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=400'} alt="Car" className="w-24 h-16 rounded-xl object-cover flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-white font-bold truncate">{booking.car?.name || `${booking.car?.brand || ''} ${booking.car?.model || ''}`}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                    <span className="flex items-center gap-1"><FiUser size={14}/> {booking.customer?.name || 'Customer'}</span>
                    <span className="flex items-center gap-1"><FiCalendar size={14}/> {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-primary-400 font-bold text-lg">${booking.totalAmount || booking.totalPrice}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${statusColors[booking.status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                  {booking.status}
                </span>
              </div>

              {booking.status === 'pending' && (
                <div className="flex gap-2 flex-shrink-0">
                  {/* FIXED: Changed 'confirmed' to 'active' to match backend validStatuses list */}
                  <button onClick={() => handleStatusUpdate(booking._id, 'active')} className="flex items-center gap-1 px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors text-sm font-semibold">
                    <FiCheck /> Approve
                  </button>
                  <button onClick={() => handleStatusUpdate(booking._id, 'cancelled')} className="flex items-center gap-1 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-semibold">
                    <FiX /> Reject
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default OwnerBookings;