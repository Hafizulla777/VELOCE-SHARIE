import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FaCalendarAlt, FaClock, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import { fadeUp } from '../animations/variants';

const BookingCard = ({ car }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  // Calculate days and price dynamically
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  const days = start && end ? Math.ceil((end - start) / (1000 * 60 * 60 * 24)) : 0;

  // Use the dual-format virtuals
  const pricePerDay = car.displayPrice || 0;
  const totalPrice = days > 0 ? (days * pricePerDay) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to book this car');
      navigate('/login');
      return;
    }

    if (!startDate || !endDate) {
      toast.error('Please select pickup and drop-off dates');
      return;
    }

    if (days <= 0) {
      toast.error('Drop-off date must be after pickup date');
      return;
    }

    if (user.role === 'owner' && car.owner?._id === user._id) {
      toast.error('You cannot book your own car');
      return;
    }

    setLoading(true);

    try {
      // ── NUCLEAR PAYLOAD: Sends both keys to work on OLD backend AND NEW backend ──
      const payload = {
        car: car._id,
        carId: car._id,        // Keeping old key just in case Render hasn't updated yet
        startDate: startDate,
        endDate: endDate,
      };

      const response = await api.post('/bookings', payload);

      toast.success(response.data.message || 'Booking request sent to owner!');

      // Redirect to customer bookings
      if (user.role === 'owner') {
        navigate('/dashboard/owner/bookings');
      } else {
        navigate('/dashboard/my-bookings');
      }

    } catch (error) {
      // This will catch the exact 400 error message from the backend bouncers
      const message = error.response?.data?.message || 'Failed to create booking. Check your dates.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format to prevent selecting past dates
  const today = new Date().toISOString().split('T')[0];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-6 backdrop-blur-sm sticky top-28"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Price</p>
          <h2 className="text-3xl font-black text-white tracking-tight">
            ${pricePerDay} <span className="text-sm text-white/40 font-medium">/ day</span>
          </h2>
        </div>
        {car.rating > 0 && (
          <div className="flex items-center gap-1.5 bg-yellow-500/10 px-3 py-1.5 rounded-lg border border-yellow-500/20">
            <span className="text-yellow-400 text-sm font-bold">★</span>
            <span className="text-yellow-400 text-sm font-bold">{car.rating}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50 mb-1.5 block">
              Pickup Date
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs" />
              <input
                type="date"
                value={startDate}
                min={today}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  // Auto-set drop-off to 1 day after pickup
                  if (!endDate || endDate <= e.target.value) {
                    const nextDay = new Date(e.target.value);
                    nextDay.setDate(nextDay.getDate() + 1);
                    setEndDate(nextDay.toISOString().split('T')[0]);
                  }
                }}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50 outline-none transition-all [color-scheme:dark]"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50 mb-1.5 block">
              Drop-off Date
            </label>
            <div className="relative">
              <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs" />
              <input
                type="date"
                value={endDate}
                min={startDate || today}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50 outline-none transition-all [color-scheme:dark]"
                required
              />
            </div>
          </div>
        </div>

        {days > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-2"
          >
            <div className="flex justify-between text-sm text-white/60">
              <span>${pricePerDay} x {days} days</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="border-t border-dashed border-white/10 pt-2 flex justify-between text-white font-bold">
              <span>Estimated Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-white/30 pt-1">* Final total includes service fee & insurance applied at checkout</p>
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={loading || !startDate || !endDate}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full relative group bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-sm uppercase tracking-[0.15em] py-4 rounded-xl overflow-hidden shadow-lg shadow-primary-500/25 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Book Now
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>

        <div className="flex items-center justify-center gap-2 pt-2">
          <FaShieldAlt className="text-white/20 text-xs" />
          <p className="text-[11px] text-white/30">Secure booking • Free cancellation up to 24hrs</p>
        </div>
      </form>
    </motion.div>
  );
};

export default BookingCard;