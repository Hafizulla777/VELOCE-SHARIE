import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import api from '../../utils/api';
import CarCard from '../CarCard/CarCard';
import Loader from '../Loader/Loader';
import { staggerContainer, fadeUp, scaleUp } from '../animations/variants';

const FeaturedCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars');
        // FIXED: Backend returns { success: true, data: [] }, so we drill down then slice
        setCars((response.data.data || []).slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  return (
    <section className="py-32 bg-dark-200 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <span className="inline-block text-primary-500 text-sm font-bold uppercase tracking-[0.3em] mb-4">
              Our Fleet
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Featured{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                Cars
              </span>
            </h2>
            <p className="text-white/50 text-lg mt-4 max-w-xl">
              Handpicked luxury vehicles from our exclusive collection.
            </p>
          </div>
          <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
            <Link
              to="/cars"
              className="inline-flex items-center gap-2 text-white hover:text-primary-500 font-bold border-b-2 border-white/10 hover:border-primary-500 pb-2 transition-all uppercase tracking-[0.15em] text-sm group"
            >
              View All
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {loading ? (
          <Loader />
        ) : (
          <motion.div
            variants={staggerContainer(0.15, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {cars.map((car) => (
              <motion.div key={car._id} variants={scaleUp}>
                {/* CarCard now handles both old DB format and new format automatically */}
                <CarCard car={car} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;