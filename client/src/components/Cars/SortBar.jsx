import { motion } from 'framer-motion';
import { FaThLarge, FaList, FaSortAmountDown } from 'react-icons/fa';

const SortBar = ({ count, sortBy, setSortBy, view, setView }) => {
  return (
    <div className="glass-panel rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
      <p className="text-sm text-white/60">
        Showing <span className="font-bold text-white">{count}</span> available cars
      </p>
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none">
          <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-xs" />
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field appearance-none pl-10 pr-8 cursor-pointer text-sm py-2.5 w-full md:w-56"
          >
            <option value="popular" className="bg-dark-100">Sort: Popular</option>
            <option value="newest" className="bg-dark-100">Sort: Newest</option>
            <option value="price-low" className="bg-dark-100">Price: Low to High</option>
            <option value="price-high" className="bg-dark-100">Price: High to Low</option>
            <option value="rating" className="bg-dark-100">Highest Rated</option>
          </select>
        </div>
        <div className="hidden md:flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setView('grid')} className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-primary-500 text-white' : 'text-white/50 hover:text-white'}`}>
            <FaThLarge className="text-sm" />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setView('list')} className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-primary-500 text-white' : 'text-white/50 hover:text-white'}`}>
            <FaList className="text-sm" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SortBar;