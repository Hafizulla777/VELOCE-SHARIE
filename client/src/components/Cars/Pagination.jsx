import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ page, pages, setPage }) => {
  if (pages <= 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) pageNumbers.push(i);

  return (
    <div className="flex justify-center mt-12">
      <div className="flex items-center gap-2 glass-panel p-2 rounded-2xl">
        <motion.button 
          whileTap={{ scale: 0.9 }} 
          disabled={page === 1} 
          onClick={() => setPage(prev => prev - 1)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <FaChevronLeft className="text-sm" />
        </motion.button>
        
        {pageNumbers.map(num => (
          <motion.button 
            key={num} 
            whileTap={{ scale: 0.9 }}
            onClick={() => setPage(num)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
              page === num 
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30' 
                : 'text-white/60 hover:bg-white/5'
            }`}
          >
            {num}
          </motion.button>
        ))}
        
        <motion.button 
          whileTap={{ scale: 0.9 }} 
          disabled={page === pages} 
          onClick={() => setPage(prev => prev + 1)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <FaChevronRight className="text-sm" />
        </motion.button>
      </div>
    </div>
  );
};

export default Pagination;