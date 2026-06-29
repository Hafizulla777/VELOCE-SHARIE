import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaCar, FaChevronRight, FaClock } from 'react-icons/fa';

const statusConfig = {
  pending: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400', label: 'Pending' },
  confirmed: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', label: 'Confirmed' },
  active: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', label: 'Active' },
  completed: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400', label: 'Completed' },
  cancelled: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', label: 'Cancelled' },
};

const BookingCard = ({ booking }) => {
  const car = booking.carId || {};
  const status = statusConfig[booking.status] || statusConfig.pending;
  const carImage = car.image || car.imageUrl || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=400';

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent hover:border-white/10 transition-all duration-500 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Car Image */}
        <div className="sm:w-48 h-40 sm:h-auto relative overflow-hidden flex-shrink-0">
          <img
            src={carImage}
            alt={car.name || 'Car'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Details */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="font-bold text-white text-lg tracking-tight group-hover:text-primary-400 transition-colors">
                  {car.name || 'Unknown Car'}
                </h3>
                <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mt-0.5">
                  {car.brand || ''} {car.type ? `• ${car.type}` : ''}
                </p>
              </div>
              <span className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${status.bg} ${status.border} ${status.text}`}>
                {status.label}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="flex items-center gap-2.5 text-sm text-white/50">
                <FaCalendarAlt className="text-primary-500/60 text-xs flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-white/25 uppercase tracking-wider font-semibold">Pickup</p>
                  <p className="text-white/70 text-xs font-medium">{formatDate(booking.startDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/50">
                <FaClock className="text-primary-500/60 text-xs flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-white/25 uppercase tracking-wider font-semibold">Drop-off</p>
                  <p className="text-white/70 text-xs font-medium">{formatDate(booking.endDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/50">
                <FaMapMarkerAlt className="text-primary-500/60 text-xs flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-white/25 uppercase tracking-wider font-semibold">Location</p>
                  <p className="text-white/70 text-xs font-medium">{car.location || 'TBD'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
            <div>
              <p className="text-[10px] text-white/25 uppercase tracking-wider font-semibold">Total</p>
              <p className="text-xl font-black text-white tracking-tight">
                ${booking.totalPrice || car.price || '—'}
                <span className="text-xs text-white/30 font-medium ml-1">/trip</span>
              </p>
            </div>
            <Link
              to={`/cars/${car._id || booking.carId}`}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-500 hover:text-primary-400 transition-colors group/btn"
            >
              View Car
              <FaChevronRight className="text-[9px] group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;