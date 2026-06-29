import { motion } from 'framer-motion';
import { FaCarCrash, FaSyncAlt } from 'react-icons/fa';

const EmptyState = ({ onReset }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }} 
    animate={{ opacity: 1, scale: 1 }} 
    className="flex flex-col items-center justify-center py-20 text-center col-span-full"
  >
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-primary-500/20 blur-3xl rounded-full"></div>
      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary-500/20 to-transparent border border-primary-500/30 flex items-center justify-center">
        <FaCarCrash className="text-4xl text-primary-500" />
      </div>
    </div>
    <h3 className="text-3xl font-black text-white mb-3">No Cars Found</h3>
    <p className="text-white/50 max-w-md mb-8">We couldn't find any cars matching your criteria. Try adjusting your filters or search terms.</p>
    <button 
      onClick={onReset} 
      className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold px-8 py-3 rounded-full uppercase tracking-wider text-sm hover:scale-105 transition-transform shadow-lg shadow-primary-500/30"
    >
      <FaSyncAlt /> Reset Filters
    </button>
  </motion.div>
);

export default EmptyState;