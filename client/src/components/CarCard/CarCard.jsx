import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUsers, FaGasPump, FaCog, FaStar, FaHeart, FaArrowRight } from 'react-icons/fa';

const CarCard = ({ car }) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-xl overflow-hidden hover:border-primary-500/40 transition-all duration-500 h-full flex flex-col"
    >
      {/* Glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={car.image || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000'}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60"></div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:border-primary-500/50 transition-colors z-10"
        >
          <FaHeart className={`text-sm transition-colors ${liked ? 'text-primary-500' : 'text-white/70'}`} />
        </button>

        {/* Price Tag */}
        <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
          <span className="text-primary-500 font-bold text-base">${car.price}</span>
          <span className="text-white/60 text-xs ml-1">/day</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-xl font-bold text-white group-hover:text-primary-500 transition-colors">{car.name}</h3>
            <div className="flex items-center gap-1 shrink-0 mt-1">
              <FaStar className="text-primary-500 text-xs" />
              <span className="text-white text-xs font-bold">{car.rating || '4.9'}</span>
            </div>
          </div>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-semibold">
            {car.brand} • {car.type}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5">
            <FaUsers className="text-primary-500/60 text-xs" />
            <span className="text-white/60 text-xs">{car.seats} Seats</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5">
            <FaCog className="text-primary-500/60 text-xs" />
            <span className="text-white/60 text-xs">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5">
            <FaGasPump className="text-primary-500/60 text-xs" />
            <span className="text-white/60 text-xs">{car.fuel}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5">
            <FaStar className="text-primary-500/60 text-xs" />
            <span className="text-white/60 text-xs">Premium</span>
          </div>
        </div>

        <Link
          to={`/cars/${car._id}`}
          className="group/btn mt-auto relative w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-bold py-3.5 rounded-xl hover:bg-primary-500 hover:border-primary-500 transition-all uppercase tracking-[0.15em] text-xs overflow-hidden"
        >
          <span className="relative z-10">View Details</span>
          <FaArrowRight className="relative z-10 text-[10px] group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default CarCard;