import { motion } from 'framer-motion';
import { FaCar } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="flex items-center justify-center py-32">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-5"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary-500 blur-xl opacity-60"></div>
          <div className="relative bg-gradient-to-br from-primary-400 to-primary-600 p-4 rounded-2xl">
            <FaCar className="text-white text-2xl" />
          </div>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 rounded-full bg-primary-500"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Loader;