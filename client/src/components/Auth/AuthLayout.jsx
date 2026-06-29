import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCar, FaShieldAlt, FaBolt, FaStar } from 'react-icons/fa';
import { staggerContainer, fadeUp, blurReveal } from '../animations/variants';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-black">
      {/* Left Side - Branding & Visuals */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-dark-100">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary-500/15 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] bg-primary-700/10 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 bg-grid-dark opacity-[0.03]"></div>
        </div>

        {/* Logo */}
        <Link to="/" className="relative z-10 flex items-center gap-2.5 group w-fit">
          <div className="bg-gradient-to-br from-primary-400 to-primary-600 p-2.5 rounded-xl">
            <FaCar className="text-white text-base" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black text-white tracking-tight">
              Veloce<span className="text-primary-500">Share</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-semibold mt-0.5">
              Luxury Car Share
            </span>
          </div>
        </Link>

        {/* Main Content */}
        <motion.div 
          variants={staggerContainer(0.15, 0.2)} 
          initial="hidden" 
          animate="visible" 
          className="relative z-10 my-auto"
        >
          <motion.h1 variants={blurReveal} className="text-5xl xl:text-6xl font-black tracking-tighter leading-[0.9] text-white mb-6">
            Drive Luxury.<br />
            Share <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Excellence.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-md leading-relaxed mb-12">
            Join the world's most exclusive car sharing community. Experience premium vehicles trusted by discerning enthusiasts.
          </motion.p>

          <motion.div variants={staggerContainer(0.1, 0.4)} className="grid grid-cols-1 gap-4 max-w-md">
            <motion.div variants={fadeUp} className="flex items-center gap-4 p-4 rounded-2xl glass-panel">
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center text-lg shrink-0">
                <FaBolt />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Instant Booking</h4>
                <p className="text-white/40 text-xs mt-0.5">Reserve your dream car in under 2 minutes.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="flex items-center gap-4 p-4 rounded-2xl glass-panel">
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center text-lg shrink-0">
                <FaShieldAlt />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Verified & Insured</h4>
                <p className="text-white/40 text-xs mt-0.5">Every vehicle is inspected and fully covered.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="flex items-center gap-4 p-4 rounded-2xl glass-panel">
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center text-lg shrink-0">
                <FaStar />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">5-Star Rated Owners</h4>
                <p className="text-white/40 text-xs mt-0.5">Connect with trusted, top-tier luxury owners.</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer Quote */}
        <div className="relative z-10 text-white/30 text-xs uppercase tracking-[0.2em] font-semibold">
          © {new Date().getFullYear()} Veloce Share Inc.
        </div>
      </div>

      {/* Right Side - Form Area */}
      <div className="flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
        {/* Mobile Background Glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-[120px] lg:hidden"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile Logo */}
          <Link to="/" className="lg:hidden flex items-center justify-center gap-2.5 mb-12">
            <div className="bg-gradient-to-br from-primary-400 to-primary-600 p-2.5 rounded-xl">
              <FaCar className="text-white text-base" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              Veloce<span className="text-primary-500">Share</span>
            </span>
          </Link>

          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">{title}</h2>
            <p className="text-white/50 text-base">{subtitle}</p>
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;