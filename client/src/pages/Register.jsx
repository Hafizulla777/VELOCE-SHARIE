import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  FaCar,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaGoogle,
  FaFacebookF,
  FaCheck,
  FaCrown,
  FaUserTie,
} from 'react-icons/fa';
import { fadeUp, blurReveal, staggerContainer } from '../components/animations/variants';

const passwordChecks = [
  { label: 'At least 8 characters', test: (v) => v.length >= 8 },
  { label: 'One uppercase letter', test: (v) => /[A-Z]/.test(v) },
  { label: 'One number', test: (v) => /\d/.test(v) },
];

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const passwordValid = passwordChecks.every((c) => c.test(password));
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    if (!passwordValid) {
      toast.error('Password does not meet requirements');
      return;
    }
    if (!passwordsMatch) {
      toast.error('Passwords do not match');
      return;
    }
    setIsSubmitting(true);
    try {
      await register(name, email, password, role);
      toast.success('Account created successfully!');
      navigate(role === 'owner' ? '/dashboard/owner' : '/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* ── Right Panel: Visual (reversed from Login) ── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden order-2">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2070)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary-500/15 rounded-full blur-[150px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full"
        >
          <div className="w-fit ml-auto">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="bg-gradient-to-br from-primary-400 to-primary-600 p-2.5 rounded-xl">
                <FaCar className="text-white text-base" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Veloce<span className="text-primary-500">Share</span>
              </span>
            </Link>
          </div>

          <div className="space-y-8 max-w-lg ml-auto text-right">
            <motion.p
              variants={blurReveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="text-[11px] font-bold uppercase tracking-[0.35em] text-primary-400"
            >
              Join The Elite
            </motion.p>
            <motion.h1
              variants={blurReveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
              className="text-4xl xl:text-5xl font-black text-white leading-[1.1] tracking-tight"
            >
              Your Luxury
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-primary-300">
                Journey Begins
              </span>
            </motion.h1>
            <motion.p
              variants={blurReveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
              className="text-white/50 text-base leading-relaxed max-w-md ml-auto"
            >
              Join thousands of enthusiasts who trust Veloce Share for
              peer-to-peer luxury car experiences. Rent or list — the choice is yours.
            </motion.p>

            <motion.div
              variants={staggerContainer(0.15, 0.9)}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-6 pt-4 justify-end"
            >
              {[
                { icon: FaCrown, label: 'Premium Fleet' },
                { icon: FaUserTie, label: 'Verified Owners' },
                { icon: FaCar, label: '24/7 Support' },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="flex items-center gap-2.5"
                >
                  <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                    {item.label}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                    <item.icon className="text-primary-500 text-xs" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-white/25 text-xs text-right"
          >
            © {new Date().getFullYear()} Veloce Share Inc. All rights reserved.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Left Panel: Form ── */}
      <div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center relative order-1 lg:order-none">
        <div className="absolute inset-0 bg-grid-dark opacity-40" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative z-10 w-full max-w-md px-6 sm:px-8"
        >
          {/* Mobile logo */}
          <Link
            to="/"
            className="lg:hidden flex items-center gap-2.5 mb-10 group mx-auto w-fit"
          >
            <div className="bg-gradient-to-br from-primary-400 to-primary-600 p-2.5 rounded-xl">
              <FaCar className="text-white text-base" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              Veloce<span className="text-primary-500">Share</span>
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">
              Create Account
            </h2>
            <p className="text-white/40 text-sm">
              Join the most exclusive car sharing community
            </p>
          </div>

          {/* Role Selector */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.25 }}
            className="grid grid-cols-2 gap-3 mb-7"
          >
            {[
              {
                value: 'customer',
                label: 'Renter',
                desc: 'Browse & book luxury cars',
                icon: FaCar,
              },
              {
                value: 'owner',
                label: 'Owner',
                desc: 'List & earn from your fleet',
                icon: FaCrown,
              },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setRole(option.value)}
                className={`relative p-4 rounded-xl border text-left transition-all duration-300 group ${
                  role === option.value
                    ? 'border-primary-500/50 bg-primary-500/10 shadow-lg shadow-primary-500/10'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                {role === option.value && (
                  <motion.div
                    layoutId="roleIndicator"
                    className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <FaCheck className="text-white text-[8px]" />
                  </motion.div>
                )}
                <option.icon
                  className={`text-lg mb-2 ${
                    role === option.value ? 'text-primary-500' : 'text-white/30'
                  }`}
                />
                <p
                  className={`text-sm font-bold ${
                    role === option.value ? 'text-white' : 'text-white/70'
                  }`}
                >
                  {option.label}
                </p>
                <p className="text-[11px] text-white/35 mt-0.5 leading-tight">
                  {option.desc}
                </p>
              </button>
            ))}
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="space-y-1.5"
            >
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                Full Name
              </label>
              <div
                className={`relative rounded-xl transition-all duration-300 ${
                  focusedField === 'name' ? 'ring-2 ring-primary-500/30' : ''
                }`}
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <FaUser className="text-sm" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="John Doe"
                  className="input-field pl-11 pr-4 !rounded-xl"
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.35 }}
              className="space-y-1.5"
            >
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                Email Address
              </label>
              <div
                className={`relative rounded-xl transition-all duration-300 ${
                  focusedField === 'email' ? 'ring-2 ring-primary-500/30' : ''
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
              className="space-y-1.5"
            >
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                Password
              </label>
              <div
                className={`relative rounded-xl transition-all duration-300 ${
                  focusedField === 'password' ? 'ring-2 ring-primary-500/30' : ''
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
                  placeholder="Create a strong password"
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
              {/* Password strength indicators */}
              {password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-1.5 pt-1"
                >
                  {passwordChecks.map((check) => (
                    <div
                      key={check.label}
                      className="flex items-center gap-2"
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          check.test(password)
                            ? 'bg-primary-500/20 text-primary-500'
                            : 'bg-white/5 text-white/20'
                        }`}
                      >
                        <FaCheck className="text-[7px]" />
                      </div>
                      <span
                        className={`text-[11px] transition-colors duration-300 ${
                          check.test(password)
                            ? 'text-primary-400'
                            : 'text-white/30'
                        }`}
                      >
                        {check.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.45 }}
              className="space-y-1.5"
            >
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                Confirm Password
              </label>
              <div
                className={`relative rounded-xl transition-all duration-300 ${
                  focusedField === 'confirm'
                    ? 'ring-2 ring-primary-500/30'
                    : confirmPassword.length > 0 && !passwordsMatch
                    ? 'ring-2 ring-red-500/30'
                    : confirmPassword.length > 0 && passwordsMatch
                    ? 'ring-2 ring-green-500/30'
                    : ''
                }`}
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <FaLock className="text-sm" />
                </div>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirm')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Re-enter your password"
                  className="input-field pl-11 pr-12 !rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showConfirm ? (
                    <FaEyeSlash className="text-sm" />
                  ) : (
                    <FaEye className="text-sm" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Terms */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="flex items-start gap-3 pt-1"
            >
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500/30 focus:ring-offset-0 cursor-pointer accent-[#FF5A1F]"
              />
              <label htmlFor="terms" className="text-[12px] text-white/40 leading-relaxed cursor-pointer">
                I agree to the{' '}
                <Link to="#" className="text-primary-500 hover:text-primary-400 underline underline-offset-2">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="#" className="text-primary-500 hover:text-primary-400 underline underline-offset-2">
                  Privacy Policy
                </Link>
              </label>
            </motion.div>

            {/* Submit */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.55 }}
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
                      Create Account
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
            transition={{ delay: 0.65 }}
            className="flex items-center gap-4 my-7"
          >
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
              Or sign up with
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
            className="text-center text-sm text-white/40 mt-8"
          >
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary-500 font-bold hover:text-primary-400 transition-colors"
            >
              Sign In
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;