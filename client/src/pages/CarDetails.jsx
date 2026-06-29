import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import Loader from '../components/Loader/Loader';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaStar, FaCheckCircle, FaHeart, FaShare, FaShieldAlt, FaBolt, FaCrown } from 'react-icons/fa';
import Gallery from '../components/CarDetails/Gallery';
import BookingCard from '../components/CarDetails/BookingCard';
import CarTabs from '../components/CarDetails/CarTabs';
import { staggerContainer, fadeUp } from '../components/animations/variants';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Added state for floating buttons
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await api.get(`/cars/${id}`);
        const carData = data?.data || data;
        setCar(carData);
      } catch (error) {
        toast.error('Failed to load car details');
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  // Check if car is saved when loaded
  useEffect(() => {
    if (car?._id) {
      const savedCars = JSON.parse(localStorage.getItem('veloceSavedCars') || '[]');
      if (savedCars.includes(car._id)) {
        setIsSaved(true);
      }
    }
  }, [car]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to book a car');
      navigate('/login');
      return;
    }

    if (user.role === 'owner') {
      toast.error('Owners cannot book cars');
      return;
    }

    try {
      await api.post('/bookings', { carId: id, startDate, endDate });
      toast.success('Booking successful!');
      navigate('/dashboard/my-bookings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    }
  };

  // Floating button: Save/Like Logic
  const toggleSave = () => {
    const savedCars = JSON.parse(localStorage.getItem('veloceSavedCars') || '[]');
    if (isSaved) {
      const filtered = savedCars.filter(savedId => savedId !== car._id);
      localStorage.setItem('veloceSavedCars', JSON.stringify(filtered));
      setIsSaved(false);
      toast('Removed from wishlist', { icon: '💔' });
    } else {
      savedCars.push(car._id);
      localStorage.setItem('veloceSavedCars', JSON.stringify(savedCars));
      setIsSaved(true);
      toast.success('Saved to wishlist!', { icon: '❤️' });
    }
  };

  // Floating button: Share Logic
  const handleShare = async () => {
    const pageUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: car?.name || `${car?.brand} ${car?.model}`, url: pageUrl });
      } catch (err) {
        console.log('User cancelled share');
      }
    } else {
      try {
        await navigator.clipboard.writeText(pageUrl);
        toast.success('Link copied to clipboard!');
      } catch (err) {
        toast.error('Failed to copy link');
      }
    }
  };

  if (loading) return <Loader />;
  if (!car) return <div className="text-center py-20 text-white">Car not found</div>;

  const getCarImage = (c) => c?.images?.[0] || c?.imageUrl || c?.image || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000';
  const images = car.images?.length > 0 ? car.images : [getCarImage(car)];
  const carTitle = car.name || `${car.brand || ''} ${car.model || ''}`.trim();

  return (
    <div className="bg-black text-white min-h-screen pb-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-10 pt-32 relative z-10">
        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/cars" className="hover:text-primary-500 transition-colors">Cars</Link>
          <span>/</span>
          <span className="text-white/80 truncate">{carTitle}</span>
        </motion.div>

        {/* Header */}
        <motion.div variants={staggerContainer(0.1, 0.1)} initial="hidden" animate="visible" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-3">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-xs font-bold uppercase tracking-wider">
                <FaCrown className="text-[10px]" /> Premium
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
                <FaCheckCircle className="text-[10px]" /> Verified
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-bold uppercase tracking-wider">
                <FaBolt className="text-[10px] text-primary-500" /> Instant Book
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-3">
              {carTitle}
            </motion.h1>
            
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <FaStar key={i} className="text-primary-500 text-sm" />)}
                </div>
                <span className="text-white/80 font-bold text-sm">4.9</span>
                <span className="text-white/40 text-sm">(128 reviews)</span>
              </div>
              <div className="h-4 w-px bg-white/10"></div>
              <span className="text-white/60 text-sm uppercase tracking-wider font-semibold">{car.brand} • {car.type || car.category}</span>
            </motion.div>
          </div>

          {/* FIXED FLOATING BUTTONS: Now fully functional! */}
          <motion.div variants={fadeUp} className="flex gap-3">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={toggleSave}
              className={`w-12 h-12 rounded-full glass-panel flex items-center justify-center transition-all duration-300 ${
                isSaved 
                  ? 'text-red-500 border-red-500/50 bg-red-500/10 hover:bg-red-500/20' 
                  : 'text-white/70 hover:text-red-400 hover:border-red-500/30'
              }`}
            >
              <FaHeart className="text-lg" />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white/70 hover:text-primary-500 hover:border-primary-500/30 transition-colors"
            >
              <FaShare className="text-lg" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="h-[500px] md:h-[600px]">
              <Gallery images={images} name={carTitle} />
            </motion.div>

            {/* Owner Card */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="glass-panel rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={car.owner?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"} alt="Owner" className="w-16 h-16 rounded-full ring-2 ring-primary-500/30" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center border-2 border-black">
                    <FaCheckCircle className="text-white text-[10px]" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{car.owner?.name || 'Veloce Share'}</h4>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Verified Owner • Member since 2021</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-white/60">
                    <span className="flex items-center gap-1"><FaStar className="text-primary-500" /> 4.9 Rating</span>
                    <span>•</span>
                    <span>Response: 1 hour</span>
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-bold text-sm uppercase tracking-wider hover:bg-primary-500 hover:border-primary-500 transition-all">
                View Profile
              </button>
            </motion.div>

            <CarTabs car={car} />
          </div>

          {/* Right Sidebar (Booking) */}
          <div className="lg:col-span-1">
            <BookingCard 
              car={car} 
              startDate={startDate} 
              setStartDate={setStartDate} 
              endDate={endDate} 
              setEndDate={setEndDate} 
              handleBooking={handleBooking} 
            />
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 flex justify-center">
          <Link to="/cars" className="flex items-center gap-2 text-white/60 hover:text-primary-500 transition-colors font-medium text-sm uppercase tracking-wider">
            <FaArrowLeft /> Back to Fleet
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;