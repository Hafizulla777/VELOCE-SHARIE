import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaCheckCircle } from 'react-icons/fa';
import { fadeUp } from '../animations/variants';

const testimonials = [
  {
    id: 1,
    name: 'Alexander Pierce',
    role: 'CEO, Pierce Holdings',
    text: 'The Porsche 911 I rented through Veloce Share was immaculate. The entire experience, from booking to return, was seamless. This is how luxury car rental should be.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sophia Laurent',
    role: 'Creative Director',
    text: 'Impeccable service and an incredible selection of vehicles. The owner I connected with was professional and the car was delivered right to my hotel.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Michael Chang',
    role: 'Tech Entrepreneur',
    text: "Best platform for luxury car rental I've ever used. The transparency, the quality of cars, and the concierge support are simply unmatched.",
    avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
    rating: 5,
  },
  {
    id: 4,
    name: 'Isabella Rossi',
    role: 'Fashion Designer',
    text: 'Veloce Share transformed my weekend getaway into an unforgettable experience. The Lamborghini was a dream to drive. Highly recommended!',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary-500/5 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-primary-500 text-sm font-bold uppercase tracking-[0.3em] mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Client{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
              Voices
            </span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative min-h-[400px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-xl"
              >
                <FaQuoteLeft className="text-primary-500/30 text-4xl mb-6" />

                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <FaStar key={i} className="text-primary-500 text-sm" />
                  ))}
                </div>

                <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 italic">
                  "{testimonials[current].text}"
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={testimonials[current].avatar}
                        alt={testimonials[current].name}
                        className="w-14 h-14 rounded-full ring-2 ring-primary-500/30 object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center border-2 border-black">
                        <FaCheckCircle className="text-white text-[8px]" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white tracking-wide">{testimonials[current].name}</h4>
                      <p className="text-[11px] text-primary-500 uppercase tracking-widest font-semibold">
                        {testimonials[current].role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20">
                    <FaCheckCircle className="text-primary-500 text-xs" />
                    <span className="text-xs text-white/70 font-semibold uppercase tracking-wider">Verified</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:border-primary-500/50 hover:text-primary-500 transition-colors"
            >
              <FaChevronLeft className="text-sm" />
            </motion.button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-primary-500' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:border-primary-500/50 hover:text-primary-500 transition-colors"
            >
              <FaChevronRight className="text-sm" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;