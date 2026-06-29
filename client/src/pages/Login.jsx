import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  FaCar,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaGoogle,
  FaFacebookF,
  FaShieldAlt,
  FaBolt,
} from 'react-icons/fa';
import { fadeUp, blurReveal, staggerContainer } from '../components/animations/variants';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsSubmitting(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* ── Left Panel: Visual ── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

        {/* Decorative glows */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary-500/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full"
        >
          <Link to="/" className="flex items-center gap-2.5 group w-fit">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary-500 blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-to-br from-primary-400 to-primary-600 p-2.5 rounded-xl">
                <FaCar className="text-white text-base" />
              </div>
            </motion.div>
            <span className="text-xl font-black text-white tracking-tight">
              Veloce<span className="text-primary-500">Share</span>
            </span>
          </Link>

          <div className="space-y-8 max-w-lg">
            <motion.p
              variants={blurReveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="text-[11px] font-bold uppercase tracking-[0.35em] text-primary-400"
            >
              Exclusive Access
            </motion.p>
            <motion.h1
              variants={blurReveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
              className="text-4xl xl:text-5xl font-black text-white leading-[1.1] tracking-tight"
            >
              Step Into the
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-primary-300">
                Driver's Seat
              </span>
            </motion.h1>
            <motion.p
              variants={blurReveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
              className="text-white/50 text-base leading-relaxed max-w-md"
            >
              Access the world's most exclusive fleet of luxury and supercars.
              Your next extraordinary journey starts here.
            </motion.p>

            <motion.div
              variants={staggerContainer(0.15, 0.9)}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-8 pt-4"
            >
              {[
                { icon: FaShieldAlt, label: 'Secure Booking' },
                { icon: FaBolt, label: 'Instant Confirm' },
                { icon: FaCar, label: '500+ Cars' },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                    <item.icon className="text-primary-500 text-xs" />
                  </div>
                  <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-white/25 text-xs"
          >
            © {new Date().getFullYear()} Veloce Share Inc. All rights reserved.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Right Panel: Form ── */}
      <div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-grid-dark opacity-40" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative z-10 w-full max-w-md px-6 sm:px-8"
        >
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2.5 mb-10 group mx-auto w-fit">
            <div className="bg-gradient-to-br from-primary-400 to-primary-600 p-2.5 rounded-xl">
              <FaCar className="text-white text-base" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              Veloce<span className="text-primary-500">Share</span>
            </span>
          </Link>

          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">
              Welcome Back
            </h2>
            <p className="text-white/40 text-sm">
              Sign in to continue your premium experience
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                Email Address
              </label>
              <div
                className={`relative rounded-xl transition-all duration-300 ${
                  focusedField === 'email'
                    ? 'ring-2 ring-primary-500/30'
                    : ''
                }`}
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <FaEnvelope className="text-sm" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  className="input-field pl-11 pr-4 !rounded-xl"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-primary-500 hover:text-primary-400 transition-colors uppercase tracking-wider"
                >
                  Forgot?
                </Link>
              </div>
              <div
                className={`relative rounded-xl transition-all duration-300 ${
                  focusedField === 'password'
                    ? 'ring-2 ring-primary-500/30'
                    : ''
                }`}
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <FaLock className="text-sm" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  className="input-field pl-11 pr-12 !rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-sm" />
                  ) : (
                    <FaEye className="text-sm" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="pt-2"
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative group bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-sm uppercase tracking-[0.15em] py-4 rounded-xl overflow-hidden shadow-lg shadow-primary-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 my-8"
          >
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 gap-3"
          >
            <button className="flex items-center justify-center gap-2.5 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 text-sm font-semibold">
              <FaGoogle className="text-base" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2.5 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 text-sm font-semibold">
              <FaFacebookF className="text-base" />
              Facebook
            </button>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-white/40 mt-10"
          >
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-primary-500 font-bold hover:text-primary-400 transition-colors"
            >
              Create One
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;