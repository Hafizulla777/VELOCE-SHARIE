import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUsers, FaGasPump, FaCog, FaStar, FaHeart, FaArrowRight, FaMapMarkerAlt, FaCheckCircle, FaBolt } from 'react-icons/fa';

const CarCard = ({ car }) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-xl overflow-hidden hover:border-primary-500/40 transition-all duration-500 h-full flex flex-col"
    >
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

      <div className="relative overflow-hidden h-56 z-10">
        <img
          src={car.image || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000'}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60"></div>

        <div className="absolute top-4 left-4 flex gap-2">
          {car.featured && (
            <span className="px-3 py-1 rounded-full bg-primary-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">Featured</span>
          )}
          {car.instantBook && (
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider">
              <FaBolt className="text-primary-500" /> Instant
            </span>
          )}
        </div>

        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:border-primary-500/50 transition-colors z-10"
        >
          <FaHeart className={`text-sm transition-colors ${liked ? 'text-primary-500' : 'text-white/70'}`} />
        </button>

        <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
          <span className="text-primary-500 font-bold text-base">${car.price}</span>
          <span className="text-white/60 text-xs ml-1">/day</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 z-10">
        <div className="mb-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-xl font-bold text-white group-hover:text-primary-500 transition-colors">{car.name}</h3>
            <div className="flex items-center gap-1 shrink-0 mt-1">
              <FaStar className="text-primary-500 text-xs" />
              <span className="text-white text-xs font-bold">{car.rating || '4.9'}</span>
              <span className="text-white/40 text-xs">({car.reviews || '120'})</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-white/50 uppercase tracking-[0.15em] font-semibold">
            <FaMapMarkerAlt className="text-primary-500/60" /> {car.location || 'Beverly Hills, CA'}
            <span className="mx-1 w-1 h-1 rounded-full bg-white/20"></span>
            <span className="flex items-center gap-1 text-green-400/80">
              <FaCheckCircle /> Verified Owner
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6 border-y border-white/5 py-4">
          <div className="flex flex-col items-center gap-1 text-center">
            <FaUsers className="text-primary-500/60 text-sm" />
            <span className="text-white/60 text-[10px] uppercase">{car.seats} Seats</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <FaCog className="text-primary-500/60 text-sm" />
            <span className="text-white/60 text-[10px] uppercase">{car.transmission}</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <FaGasPump className="text-primary-500/60 text-sm" />
            <span className="text-white/60 text-[10px] uppercase">{car.fuel}</span>
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          <Link
            to={`/cars/${car._id}`}
            className="group/btn flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-bold py-3 rounded-xl hover:bg-primary-500 hover:border-primary-500 transition-all uppercase tracking-[0.1em] text-xs"
          >
            Details
            <FaArrowRight className="text-[10px] group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          <Link
            to={`/cars/${car._id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-3 rounded-xl hover:from-primary-600 hover:to-primary-500 transition-all uppercase tracking-[0.1em] text-xs shadow-lg shadow-primary-500/20"
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;