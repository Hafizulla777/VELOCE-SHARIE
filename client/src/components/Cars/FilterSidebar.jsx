import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaStar, FaFilter, FaTimes, FaCheckCircle } from 'react-icons/fa';

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/5 py-5">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full text-left text-sm font-bold uppercase tracking-wider text-white/80 hover:text-primary-500 transition-colors">
        {title}
        <FaChevronDown className={`transition-transform duration-300 text-xs ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterSidebar = ({ filters, setFilters, handleReset }) => {
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const brands = ['Porsche', 'Ferrari', 'BMW', 'Mercedes', 'Audi', 'Lamborghini', 'Tesla'];
  const types = ['Sedan', 'SUV', 'Sports', 'Convertible'];
  const fuels = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const transmissions = ['Automatic', 'Manual'];

  return (
    <div className="glass-panel rounded-3xl p-6 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-black text-white flex items-center gap-2"><FaFilter className="text-primary-500" /> Filters</h3>
        <button onClick={handleReset} className="text-xs text-white/50 hover:text-primary-500 transition-colors uppercase tracking-wider flex items-center gap-1">
          <FaTimes className="text-[10px]" /> Clear
        </button>
      </div>

      <FilterSection title="Vehicle Type">
        <div className="grid grid-cols-2 gap-2">
          {types.map(t => (
            <button key={t} onClick={() => handleChange('type', filters.type === t ? '' : t)} className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${filters.type === t ? 'bg-primary-500 border-primary-500 text-white' : 'bg-white/5 border-white/10 text-white/60 hover:border-primary-500/50'}`}>
              {t}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Brand">
        <div className="space-y-2">
          {brands.map(b => (
            <div key={b} className="flex items-center gap-3 cursor-pointer group" onClick={() => handleChange('brand', filters.brand === b ? '' : b)}>
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${filters.brand === b ? 'bg-primary-500 border-primary-500' : 'border-white/20 group-hover:border-primary-500/50'}`}>
                {filters.brand === b && <FaCheckCircle className="text-white text-[10px]" />}
              </div>
              <span className={`text-sm transition-colors ${filters.brand === b ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{b}</span>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="flex items-center justify-between text-sm text-white/70 mb-3">
          <span>${filters.minPrice}</span>
          <span>${filters.maxPrice}</span>
        </div>
        <input type="range" min="0" max="1000" value={filters.maxPrice} onChange={(e) => handleChange('maxPrice', e.target.value)} className="w-full" />
      </FilterSection>

      <FilterSection title="Transmission" defaultOpen={false}>
        <div className="flex gap-2">
          {transmissions.map(t => (
            <button key={t} onClick={() => handleChange('transmission', filters.transmission === t ? '' : t)} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${filters.transmission === t ? 'bg-primary-500 border-primary-500 text-white' : 'bg-white/5 border-white/10 text-white/60 hover:border-primary-500/50'}`}>
              {t}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Fuel Type" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          {fuels.map(f => (
            <button key={f} onClick={() => handleChange('fuel', filters.fuel === f ? '' : f)} className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${filters.fuel === f ? 'bg-primary-500 border-primary-500 text-white' : 'bg-white/5 border-white/10 text-white/60 hover:border-primary-500/50'}`}>
              {f}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Minimum Rating" defaultOpen={false}>
        <div className="flex gap-2">
          {[3, 4, 5].map(r => (
            <button key={r} onClick={() => handleChange('rating', filters.rating === r ? 0 : r)} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium border flex items-center justify-center gap-1 transition-all ${filters.rating === r ? 'bg-primary-500 border-primary-500 text-white' : 'bg-white/5 border-white/10 text-white/60 hover:border-primary-500/50'}`}>
              <FaStar className="text-[10px]" /> {r}+
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

export default FilterSidebar;