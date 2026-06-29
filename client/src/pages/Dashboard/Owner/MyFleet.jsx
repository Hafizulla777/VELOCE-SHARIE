import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import api from '../../../utils/api';
import { fadeUp, staggerContainer } from '../../../components/animations/variants';
import Loader from '../../../components/Loader/Loader';

const MyFleet = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await api.get('/cars/owner/my-cars');
        
        // BULLETPROOF CHECK: Handles both raw array OR { success: true, data: [...] }
        if (Array.isArray(data)) {
          setCars(data);
        } else if (data && Array.isArray(data.data)) {
          setCars(data.data); 
        } else {
          setCars([]);
        }
      } catch (error) {
        console.error(error);
        setCars([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) return <Loader />;

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer(0.1)} className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">My Fleet</h1>
          <p className="text-gray-400 mt-1">Manage your listed vehicles</p>
        </div>
        <Link to="/dashboard/owner/add-car" className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl font-semibold">
          <FiPlus size={20} /> Add Vehicle
        </Link>
      </div>

      {cars.length === 0 ? (
        <motion.div variants={fadeUp} className="glass-card rounded-2xl p-12 text-center">
          <h3 className="text-xl text-white mb-2">No Vehicles Listed</h3>
          <p className="text-gray-400 mb-6">Start earning by adding your first luxury vehicle.</p>
          <Link to="/dashboard/owner/add-car" className="btn-primary px-8 py-3 rounded-xl font-semibold inline-block">
            Add Your First Car
          </Link>
        </motion.div>
      ) : (
        <motion.div variants={staggerContainer(0.05)} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cars.map((car) => (
            <motion.div key={car._id} variants={fadeUp} className="glass-card rounded-2xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img src={car.images?.[0] || car.imageUrl || car.image || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800'} alt={car.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-DEFAULT via-transparent to-transparent"></div>
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${car.isAvailable ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                  {car.isAvailable ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white">{car.brand} {car.model}</h3>
                <p className="text-sm text-gray-400 mb-4">{car.year} • {car.category || car.type}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary-400 font-bold text-xl">${car.pricePerDay || car.price}<span className="text-xs text-gray-500 font-normal">/day</span></span>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-primary-500 transition-colors">
                      <FiEdit2 size={16} />
                    </button>
                    <button className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500 transition-colors">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyFleet;