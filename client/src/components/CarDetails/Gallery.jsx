import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaExpand, FaCar } from 'react-icons/fa';

const Gallery = ({ images, name }) => {
  const fallbackImage = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000';
  const galleryImages = images && images.length > 0 ? images : [fallbackImage, fallbackImage, fallbackImage];
  
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  const handleNext = () => setActiveIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:max-h-[600px]">
        {galleryImages.map((img, i) => (
          <motion.button 
            key={i} 
            onClick={() => setActiveIndex(i)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${
              activeIndex === i ? 'border-primary-500 shadow-lg shadow-primary-500/20' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`${name} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
          </motion.button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 group rounded-3xl overflow-hidden border border-white/10 bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img 
              src={galleryImages[activeIndex]} 
              alt={name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button 
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev} 
            className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white hover:bg-primary-500/20"
          >
            <FaChevronLeft />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext} 
            className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white hover:bg-primary-500/20"
          >
            <FaChevronRight />
          </motion.button>
        </div>

        {/* Badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="px-3 py-2 rounded-full glass-panel text-xs font-bold uppercase tracking-wider text-white hover:bg-primary-500/20 transition-colors flex items-center gap-2">
            <FaCar className="text-primary-500" /> 360° View
          </button>
          <button className="w-10 h-10 rounded-full glass-panel text-white hover:bg-primary-500/20 transition-colors flex items-center justify-center">
            <FaExpand className="text-sm" />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full glass-panel text-xs font-medium text-white">
          {activeIndex + 1} / {galleryImages.length}
        </div>
      </div>
    </div>
  );
};

export default Gallery;