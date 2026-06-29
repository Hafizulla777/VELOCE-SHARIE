import { motion } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { staggerContainer, fadeUp, blurReveal } from '../animations/variants';

const CarsHero = ({ keyword, setKeyword, setLocation, location, pickupDate, setPickupDate, dropDate, setDropDate, handleSearch }) => {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary-500/20 rounded-full blur-[150px] opacity-50"></div>
        <div className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] bg-primary-700/15 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute inset-0 bg-grid-dark opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <motion.div variants={staggerContainer(0.15, 0.1)} initial="hidden" animate="visible" className="text-center max-w-4xl mx-auto mb-12">
          <motion.span variants={fadeUp} className="inline-block text-primary-500 text-xs font-bold uppercase tracking-[0.3em] mb-5 px-4 py-2 rounded-full border border-primary-500/30 bg-primary-500/5 backdrop-blur-md">
            1200+ Luxury Cars Available
          </motion.span>
          <motion.h1 variants={blurReveal} className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white mb-6">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Perfect Car</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Choose from thousands of luxury vehicles. Search by location, date, and preferences.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={fadeUp} 
          initial="hidden" 
          animate="visible"
          className="glass-panel rounded-3xl p-6 max-w-6xl mx-auto shadow-2xl shadow-black/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4 relative">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Car / Brand</label>
              <div className="relative mt-1">
                <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                <input type="text" placeholder="Search cars..." className="input-field pl-11" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              </div>
            </div>
            <div className="md:col-span-3 relative">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Location</label>
              <div className="relative mt-1">
                <FaMapMarkerAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                <input type="text" placeholder="City" className="input-field pl-11" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
            </div>
            <div className="md:col-span-2 relative">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Pickup</label>
              <div className="relative mt-1">
                <FaCalendarAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                <input type="date" className="input-field pl-11" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
              </div>
            </div>
            <div className="md:col-span-2 relative">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Drop</label>
              <div className="relative mt-1">
                <FaCalendarAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                <input type="date" className="input-field pl-11" value={dropDate} onChange={(e) => setDropDate(e.target.value)} />
              </div>
            </div>
            <div className="md:col-span-1 flex items-end">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSearch} className="w-full btn-primary py-3 rounded-xl font-bold uppercase tracking-wider text-sm">
                Go
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CarsHero;