import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiTrendingUp, FiCheckCircle, FiClock } from 'react-icons/fi';
import api from '../../../utils/api';
import { fadeUp, staggerContainer } from '../../../components/animations/variants';
import Loader from '../../../components/Loader/Loader';

const OwnerEarnings = () => {
  const [stats, setStats] = useState({ totalRevenue: 0, pendingPayouts: 0, completedTrips: 0, activeBookings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const { data } = await api.get('/bookings/owner/bookings');
        
        // BULLETPROOF EXTRACT: Safely get the array out of your backend's wrapped response
        let bookingsArray = [];
        if (Array.isArray(data)) {
          bookingsArray = data;
        } else if (data?.data?.bookings && Array.isArray(data.data.bookings)) {
          bookingsArray = data.data.bookings;
        }

        // Calculate metrics locally from the extracted array
        const revenue = bookingsArray.filter(b => b.status === 'completed' || b.status === 'confirmed').reduce((acc, curr) => acc + (curr.totalAmount || curr.totalPrice || 0), 0);
        const pending = bookingsArray.filter(b => b.status === 'confirmed' || b.status === 'approved').reduce((acc, curr) => acc + (curr.totalAmount || curr.totalPrice || 0), 0);
        const completed = bookingsArray.filter(b => b.status === 'completed').length;
        const active = bookingsArray.filter(b => (b.status === 'confirmed' || b.status === 'active') && new Date(b.endDate) >= new Date()).length;

        setStats({ totalRevenue: revenue, pendingPayouts: pending, completedTrips: completed, activeBookings: active });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEarnings();
  }, []);

  if (loading) return <Loader />;

  const cards = [
    { title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: FiDollarSign, color: 'from-primary-500 to-primary-700' },
    { title: 'Pending Payouts', value: `$${stats.pendingPayouts.toLocaleString()}`, icon: FiClock, color: 'from-yellow-500 to-yellow-700' },
    { title: 'Completed Trips', value: stats.completedTrips, icon: FiCheckCircle, color: 'from-green-500 to-green-700' },
    { title: 'Active Now', value: stats.activeBookings, icon: FiTrendingUp, color: 'from-blue-500 to-blue-700' },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer(0.1)} className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white">Earnings</h1>
        <p className="text-gray-400 mt-1">Financial overview of your fleet performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <motion.div key={index} variants={fadeUp} className="glass-card rounded-2xl p-6 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.color} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm font-medium">{card.title}</span>
                <card.icon className="text-gray-500" size={20} />
              </div>
              <h2 className="text-3xl font-display font-bold text-white">{card.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp} className="glass-card rounded-2xl p-8 text-center">
        <FiTrendingUp className="mx-auto text-gray-600 mb-4" size={40} />
        <h3 className="text-xl text-white font-semibold mb-2">Advanced Analytics</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Detailed charts, revenue graphs, and fleet utilization metrics will be integrated here via a charting library like Recharts.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default OwnerEarnings;