import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { FaArrowRight, FaPlay, FaStar, FaBolt, FaShieldAlt } from 'react-icons/fa';
import { staggerContainer, fadeUp, blurReveal } from '../animations/variants';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y       = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.7], [1, 0.9]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - rect.left - rect.width / 2) / 25);
    mouseY.set((clientY - rect.top - rect.height / 2) / 25);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-24"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary-500/20 rounded-full blur-[150px] opacity-50"></div>
        <div className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] bg-primary-700/15 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        ></div>
      </div>

      <motion.div style={{ y, opacity, scale }} className="container mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          animate="visible"
          className="text-center max-w-6xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/30 bg-primary-500/5 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-400">
                Premium Luxury Car Sharing
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              variants={blurReveal}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.9] text-white"
            >
              Drive{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                Luxury.
              </span>
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              variants={blurReveal}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.9] text-white"
            >
              Share{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                Excellence.
              </span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Experience the world's most exclusive automobiles. Connect with trusted owners and elevate every journey with Veloce Share.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/cars"
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.15em] text-sm overflow-hidden shadow-2xl shadow-primary-500/30"
              >
                <span className="relative z-10">Explore Cars</span>
                <FaArrowRight className="relative z-10 text-xs group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-3 border border-white/15 bg-white/5 backdrop-blur-md text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.15em] text-sm hover:border-primary-500/50 hover:bg-white/10 transition-all"
              >
                <FaPlay className="text-[10px] text-primary-500" />
                Become an Owner
              </Link>
            </motion.div>
          </motion.div>

          {/* Car Image with Glow Ring */}
          <motion.div
            variants={fadeUp}
            style={{ x: smoothX, y: smoothY }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Outer glow */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[40%] bg-primary-500/30 rounded-full blur-[100px] z-0"
            />
            {/* Inner ring */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[60px] bg-primary-500/40 rounded-full blur-[50px] z-0"
            />

            {/* Floating car */}
            <motion.img
              src="https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=2000&auto=format&fit=crop"
              alt="Luxury Sports Car"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-full h-auto object-contain"
              style={{ filter: 'drop-shadow(0 25px 50px rgba(255, 90, 31, 0.3))' }}
            />
          </motion.div>

          {/* Info Cards */}
          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto mt-12">
            {[
              { icon: <FaBolt />,       label: 'Instant Booking',  value: '2 min' },
              { icon: <FaShieldAlt />,  label: 'Trusted Owners',   value: '5K+' },
              { icon: <FaStar />,       label: 'Premium Service',  value: '4.9★' },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="flex flex-col md:flex-row items-center gap-3 p-4 md:p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center text-base shrink-0">
                  {card.icon}
                </div>
                <div className="text-center md:text-left">
                  <p className="text-lg md:text-xl font-black text-white leading-none">{card.value}</p>
                  <p className="text-[10px] md:text-xs text-white/50 uppercase tracking-wider mt-1">{card.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [1, 0.5, 1] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-primary-500"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;