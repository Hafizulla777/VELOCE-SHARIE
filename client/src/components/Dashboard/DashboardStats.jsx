import { motion } from 'framer-motion';
import { FaClipboardList, FaCar, FaCalendarCheck, FaStar } from 'react-icons/fa';
import { fadeUp, staggerContainer } from '../animations/variants';

const stats = [
  {
    label: 'Total Bookings',
    value: '0',
    icon: FaClipboardList,
    color: 'from-primary-500 to-primary-600',
    shadow: 'shadow-primary-500/20',
    change: 'Your rental history',
  },
  {
    label: 'Cars Rented',
    value: '0',
    icon: FaCar,
    color: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-500/20',
    change: 'Unique vehicles',
  },
  {
    label: 'Completed',
    value: '0',
    icon: FaCalendarCheck,
    color: 'from-emerald-500 to-green-500',
    shadow: 'shadow-emerald-500/20',
    change: 'Successful trips',
  },
  {
    label: 'Avg. Rating',
    value: '—',
    icon: FaStar,
    color: 'from-amber-500 to-yellow-500',
    shadow: 'shadow-amber-500/20',
    change: 'Your reviews',
  },
];

const DashboardStats = ({ bookings }) => {
  const totalBookings = bookings?.length || 0;
  const uniqueCars = [...new Set(bookings?.map((b) => b.carId?._id || b.carId).filter(Boolean))].length;
  const completed = bookings?.filter((b) => b.status === 'completed' || b.status === 'confirmed').length || 0;

  const displayStats = stats.map((s, i) => {
    if (i === 0) return { ...s, value: totalBookings };
    if (i === 1) return { ...s, value: uniqueCars };
    if (i === 2) return { ...s, value: completed };
    return s;
  });

  return (
    <motion.div
      variants={staggerContainer(0.08, 0.1)}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
    >
      {displayStats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={fadeUp}
          className="relative group rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-6 hover:border-white/10 transition-all duration-500 overflow-hidden"
        >
          <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
          <div className="relative z-10">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} ${stat.shadow} shadow-lg flex items-center justify-center mb-4`}>
              <stat.icon className="text-white text-base" />
            </div>
            <p className="text-3xl font-black text-white tracking-tight mb-1">{stat.value}</p>
            <p className="text-sm font-semibold text-white/50 mb-0.5">{stat.label}</p>
            <p className="text-[11px] text-white/25">{stat.change}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DashboardStats;