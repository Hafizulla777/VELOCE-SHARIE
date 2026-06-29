import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import CarsHero from '../components/Cars/CarsHero';
import FilterSidebar from '../components/Cars/FilterSidebar';
import SortBar from '../components/Cars/SortBar';
import CarCard from '../components/Cars/CarCard';
import SkeletonCard from '../components/Cars/SkeletonCard';
import EmptyState from '../components/Cars/EmptyState';
import Pagination from '../components/Cars/Pagination';
import { staggerContainer, fadeUp } from '../components/animations/variants';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropDate, setDropDate] = useState('');

  const [filters, setFilters] = useState({
    type: '',
    brand: '',
    minPrice: 0,
    maxPrice: 10000,
    transmission: '',
    fuel: '',
    rating: 0,
  });

  const [sortBy, setSortBy] = useState('popular');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/cars');
        
        // BULLETPROOF CHECK: Handles raw array, { cars: [] }, OR { success: true, data: [] }
        if (Array.isArray(data)) {
          setCars(data);
        } else if (data && Array.isArray(data.data)) {
          setCars(data.data); 
        } else if (data && Array.isArray(data.cars)) {
          setCars(data.cars); 
        } else {
          console.warn("Unexpected API response format:", data);
          setCars([]); 
        }
      } catch (error) {
        console.error('Error fetching cars:', error.response?.data || error.message);
        setCars([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      if (filters.type && car.type !== filters.type) return false;
      if (filters.brand && car.brand !== filters.brand) return false;
      const carTransmission = car.transmission || car.specs?.transmission;
      if (filters.transmission && carTransmission !== filters.transmission) return false;
      const carFuel = car.fuel || car.specs?.fuel;
      if (filters.fuel && carFuel !== filters.fuel) return false;
      const price = car.price || car.pricePerDay || 0;
      if (price < Number(filters.minPrice) || price > Number(filters.maxPrice)) return false;
      if (filters.rating && (car.rating || 0) < filters.rating) return false;
      return true;
    });
  }, [cars, filters]);

  const sortedCars = useMemo(() => {
    switch (sortBy) {
      case 'price-low': return [...filteredCars].sort((a, b) => (a.price || a.pricePerDay || 0) - (b.price || b.pricePerDay || 0));
      case 'price-high': return [...filteredCars].sort((a, b) => (b.price || b.pricePerDay || 0) - (a.price || a.pricePerDay || 0));
      case 'rating': return [...filteredCars].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'newest': return [...filteredCars].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default: return filteredCars;
    }
  }, [filteredCars, sortBy]);

  const totalPages = Math.ceil(sortedCars.length / itemsPerPage);
  const displayCars = sortedCars.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleResetFilters = () => {
    setFilters({ type: '', brand: '', minPrice: 0, maxPrice: 1000, transmission: '', fuel: '', rating: 0 });
    setKeyword('');
    setPage(1);
  };

  const handleSearch = () => setPage(1);

  return (
    <div className="bg-black text-white min-h-screen pb-24">
      <CarsHero 
        keyword={keyword} setKeyword={setKeyword}
        location={location} setLocation={setLocation}
        pickupDate={pickupDate} setPickupDate={setPickupDate}
        dropDate={dropDate} setDropDate={setDropDate}
        handleSearch={handleSearch}
      />

      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 mt-8">
          <aside className="hidden lg:block">
            <FilterSidebar filters={filters} setFilters={setFilters} handleReset={handleResetFilters} />
          </aside>

          <main>
            <SortBar count={displayCars.length} sortBy={sortBy} setSortBy={setSortBy} view={view} setView={setView} />

            {loading ? (
              <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : displayCars.length === 0 ? (
              <EmptyState onReset={handleResetFilters} />
            ) : (
              <motion.div variants={staggerContainer(0.1, 0.1)} initial="hidden" animate="visible" className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {displayCars.map(car => (
                  <motion.div key={car._id} variants={fadeUp}><CarCard car={car} /></motion.div>
                ))}
              </motion.div>
            )}

            {!loading && totalPages > 1 && (
              <Pagination page={page} pages={totalPages} setPage={setPage} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Cars;