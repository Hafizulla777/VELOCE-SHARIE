import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTachometerAlt, FaGasPump, FaCogs, FaCarBattery, FaWeightHanging, FaRoad, FaStar, FaCheckCircle, FaThumbsUp } from 'react-icons/fa';
import { staggerContainer, fadeUp } from '../animations/variants';

const TabButton = ({ active, onClick, children }) => (
  <button 
    onClick={onClick} 
    className={`relative px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
      active ? 'text-primary-500' : 'text-white/50 hover:text-white'
    }`}
  >
    {children}
    {active && (
      <motion.div 
        layoutId="activeTab"
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-500 to-primary-400"
      />
    )}
  </button>
);

const CarTabs = ({ car }) => {
  const [activeTab, setActiveTab] = useState('specs');

  const specs = [
    { label: 'Engine', value: '4.0L V8', icon: <FaCogs /> },
    { label: 'Horsepower', value: '640 hp', icon: <FaTachometerAlt /> },
    { label: 'Torque', value: '590 lb-ft', icon: <FaCarBattery /> },
    { label: 'Top Speed', value: '205 mph', icon: <FaRoad /> },
    { label: 'Fuel Tank', value: '23.0 gal', icon: <FaGasPump /> },
    { label: 'Weight', value: '3,428 lbs', icon: <FaWeightHanging /> },
  ];

  const features = [
    'Leather Seats', 'Apple CarPlay', 'Android Auto', 'Bluetooth', 'Parking Sensors', 
    '360 Camera', 'Navigation', 'Wireless Charging', 'Heated Seats', 'Sunroof', 
    'Cruise Control', 'Ambient Lighting', 'Climate Control', 'Premium Audio', 'ABS', 'Airbags'
  ];

  const reviews = [
    { name: 'Alexander Pierce', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', date: '2 weeks ago', rating: 5, text: 'Absolutely phenomenal experience. The car was pristine and drove like a dream.' },
    { name: 'Sophia Laurent', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', date: '1 month ago', rating: 5, text: 'Best rental platform I have ever used. Seamless pickup and drop off.' }
  ];

  return (
    <div className="glass-panel rounded-3xl p-8 mt-12">
      <div className="flex gap-4 border-b border-white/10 overflow-x-auto no-scrollbar mb-8">
        <TabButton active={activeTab === 'specs'} onClick={() => setActiveTab('specs')}>Specifications</TabButton>
        <TabButton active={activeTab === 'features'} onClick={() => setActiveTab('features')}>Features</TabButton>
        <TabButton active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>Reviews</TabButton>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'specs' && (
            <motion.div variants={staggerContainer(0.1, 0.1)} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {specs.map((spec, i) => (
                <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center mb-3 text-sm">{spec.icon}</div>
                  <p className="text-xs uppercase tracking-wider text-white/40 font-semibold">{spec.label}</p>
                  <h4 className="text-lg font-bold text-white mt-1">{spec.value}</h4>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'features' && (
            <motion.div variants={staggerContainer(0.05, 0.1)} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {features.map((feature, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <FaCheckCircle className="text-primary-500 text-sm shrink-0" />
                  <span className="text-sm text-white/80 font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 pb-10 border-b border-white/5">
                <div className="text-center md:text-left">
                  <h3 className="text-6xl font-black text-white">4.9</h3>
                  <div className="flex gap-1 mt-2 justify-center md:justify-start">
                    {[...Array(5)].map((_, i) => <FaStar key={i} className="text-primary-500" />)}
                  </div>
                  <p className="text-white/50 text-sm mt-2">Based on 128 reviews</p>
                </div>
                <div className="md:col-span-2 space-y-2">
                  {[5, 4, 3, 2, 1].map(star => (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-sm text-white/60 w-10">{star}★</span>
                      <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${star === 5 ? 85 : star === 4 ? 10 : 5}%` }}></div>
                      </div>
                      <span className="text-sm text-white/40 w-10 text-right">{star === 5 ? '109' : '12'}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <motion.div variants={staggerContainer(0.1, 0.1)} initial="hidden" animate="visible" className="space-y-4">
                {reviews.map((review, i) => (
                  <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full ring-2 ring-primary-500/30" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white">{review.name}</h4>
                            <FaCheckCircle className="text-primary-500 text-xs" />
                          </div>
                          <span className="text-xs text-white/40">{review.date}</span>
                        </div>
                        <div className="flex gap-1 mb-3">
                          {[...Array(review.rating)].map((_, i) => <FaStar key={i} className="text-primary-500 text-xs" />)}
                        </div>
                        <p className="text-white/70 leading-relaxed text-sm">"{review.text}"</p>
                        <button className="mt-4 flex items-center gap-2 text-xs text-white/40 hover:text-primary-500 transition-colors font-medium">
                          <FaThumbsUp /> Helpful (12)
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CarTabs;