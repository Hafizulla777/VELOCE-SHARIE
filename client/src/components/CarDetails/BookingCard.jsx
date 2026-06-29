import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaBolt, FaLock, FaCheckCircle, FaHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';

const BookingCard = ({ car, startDate, setStartDate, endDate, setEndDate, handleBooking }) => {
  const [isSaved, setIsSaved] = useState(false);

  // Check if car is already saved in localStorage on load
  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem('veloceSavedCars') || '[]');
    if (savedCars.includes(car._id)) {
      setIsSaved(true);
    }
  }, [car._id]);

  const calculateDays = () => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const days = calculateDays();
  const pricePerDay = car.price || car.pricePerDay || 0;
  const subtotal = pricePerDay * days;
  const taxes = subtotal * 0.1;
  const total = subtotal + taxes;

  // Toggle Save/Like functionality
  const toggleSave = () => {
    const savedCars = JSON.parse(localStorage.getItem('veloceSavedCars') || '[]');
    
    if (isSaved) {
      const filtered = savedCars.filter(id => id !== car._id);
      localStorage.setItem('veloceSavedCars', JSON.stringify(filtered));
      setIsSaved(false);
      toast('Removed from wishlist', { icon: '💔' });
    } else {
      savedCars.push(car._id);
      localStorage.setItem('veloceSavedCars', JSON.stringify(savedCars));
      setIsSaved(true);
      toast.success('Saved to wishlist!', { icon: '❤️' });
    }
  };

  // Share functionality (Copies link to clipboard)
  const handleShare = async () => {
    const pageUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: car.name || `${car.brand} ${car.model}`, url: pageUrl });
      } catch (err) {
        console.log('User cancelled share');
      }
    } else {
      try {
        await navigator.clipboard.writeText(pageUrl);
        toast.success('Link copied to clipboard!');
      } catch (err) {
        toast.error('Failed to copy link');
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel rounded-3xl p-6 sticky top-24 shadow-2xl shadow-black/50"
    >
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-3xl font-black text-white">${pricePerDay}</span>
          <span className="text-white/50 text-sm">/ day</span>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-xs font-bold uppercase tracking-wider">
          20% OFF
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Pick-up</label>
            <input type="date" required value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input-field mt-1" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Drop-off</label>
            <input type="date" required value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input-field mt-1" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Pick-up Time</label>
            <select className="input-field mt-1">
              <option className="bg-dark-100">10:00 AM</option>
              <option className="bg-dark-100">12:00 PM</option>
              <option className="bg-dark-100">02:00 PM</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Driver Age</label>
            <select className="input-field mt-1">
              <option className="bg-dark-100">25+</option>
              <option className="bg-dark-100">30+</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 cursor-pointer hover:border-primary-500/30 transition-colors">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <FaShieldAlt className="text-primary-500" /> Premium Insurance
            </div>
            <span className="text-sm font-bold text-white">$15/day</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 py-4 border-t border-white/5 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">${pricePerDay} x {days} days</span>
          <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Taxes & Fees (10%)</span>
          <span className="text-white font-medium">${taxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-2 mt-2 border-t border-white/5">
          <span className="text-white font-bold">Total</span>
          <span className="text-primary-500 font-black text-xl">${total.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleBooking}>
        <motion.button 
          type="submit"
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }} 
          className="w-full btn-primary py-4 rounded-xl font-bold uppercase tracking-[0.15em] text-sm"
        >
          Reserve Now
        </motion.button>
      </form>

      {/* FIXED: Save for Later now toggles the wishlist state */}
      <button 
        onClick={toggleSave} 
        className={`w-full mt-3 py-3 rounded-xl border text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
          isSaved 
            ? 'border-primary-500/50 text-primary-400 bg-primary-500/10' 
            : 'border-white/10 text-white/70 hover:text-white hover:bg-white/5'
        }`}
      >
        {isSaved ? '✓ Saved to Wishlist' : 'Save for Later'}
      </button>

      <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-white/5">
        {/* FIXED: Like button now works and turns red */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={toggleSave}
          className="flex flex-col items-center text-center gap-1 group"
        >
          <FaHeart className={`text-sm transition-colors duration-300 ${isSaved ? 'text-red-500' : 'text-primary-500 group-hover:text-red-400'}`} />
          <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold">{isSaved ? 'Liked' : 'Like'}</span>
        </motion.button>

        <div className="flex flex-col items-center text-center gap-1">
          <FaBolt className="text-primary-500 text-sm" />
          <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold">Instant Book</span>
        </div>

        {/* FIXED: Share button now copies link */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={handleShare}
          className="flex flex-col items-center text-center gap-1 group"
        >
          <FaCheckCircle className="text-primary-500 text-sm group-hover:text-green-400 transition-colors" />
          <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold">Share</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BookingCard;