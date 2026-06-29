import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  FaCar, FaSignOutAlt, FaTachometerAlt,
  FaBars, FaTimes, FaClipboardList,
} from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen]     = useState(false);
  const [scrolled, setScrolled]                 = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40);
  });

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home',  path: '/' },
    { name: 'Fleet', path: '/cars' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }, // ✅ CONTACT LINK ADDED HERE
  ];

  return (
    <motion.nav
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-2xl border-b border-white/5 py-3 shadow-2xl shadow-black/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary-500 blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-primary-400 to-primary-600 p-2.5 rounded-xl">
                <FaCar className="text-white text-base" />
              </div>
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black text-white tracking-tight">
                Veloce<span className="text-primary-500">Share</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-semibold mt-0.5">
                Luxury Car Share
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative text-[13px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 group ${
                    isActive ? 'text-primary-500' : 'text-white/70 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    <span
                      className={`absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
            {user && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `relative text-[13px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 group ${
                    isActive ? 'text-primary-500' : 'text-white/70 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Dashboard
                    <span
                      className={`absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
           

            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:border-primary-500/30 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-sm text-white/90 hidden xl:block max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <svg
                      className={`w-3 h-3 text-white/60 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute right-0 mt-4 w-72 bg-gradient-to-b from-dark-50 to-black border border-white/10 rounded-2xl shadow-2xl shadow-black/60 py-2 overflow-hidden z-50 backdrop-blur-2xl"
                        >
                          <div className="px-6 py-5 border-b border-white/5 bg-gradient-to-br from-primary-500/10 to-transparent">
                            <p className="text-[10px] font-bold text-primary-500 uppercase tracking-[0.25em]">
                              Welcome back
                            </p>
                            <p className="font-semibold text-white truncate text-sm mt-1">{user.email}</p>
                          </div>
                          <Link
                            to="/dashboard"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 px-6 py-3.5 text-sm text-white/80 hover:text-primary-500 hover:bg-white/5 transition-colors"
                          >
                            <FaTachometerAlt className="text-white/40" /> Dashboard
                          </Link>
                          <Link
                            to="/dashboard/my-bookings"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 px-6 py-3.5 text-sm text-white/80 hover:text-primary-500 hover:bg-white/5 transition-colors"
                          >
                            <FaClipboardList className="text-white/40" /> My Bookings
                          </Link>
                          <div className="border-t border-white/5 mt-1">
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-6 py-3.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left font-semibold"
                            >
                              <FaSignOutAlt className="text-red-400/70" /> Logout
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[13px] font-semibold uppercase tracking-[0.15em] text-white/80 hover:text-primary-500 transition-colors px-4"
                  >
                    Login
                  </Link>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to="/register"
                      className="relative group bg-gradient-to-r from-primary-500 to-primary-600 text-white text-[13px] font-bold uppercase tracking-[0.15em] py-3 px-7 rounded-full overflow-hidden shadow-lg shadow-primary-500/30"
                    >
                      <span className="relative z-10">Sign Up</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-2xl border-t border-white/5 mt-3"
          >
            <div className="flex flex-col gap-2 px-6 py-8">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block text-2xl font-black uppercase tracking-tight py-2 ${
                        isActive ? 'text-primary-500' : 'text-white hover:text-primary-500'
                      } transition-colors`
                    }
                  >
                    {item.name}
                  </NavLink>
                </motion.div>
              ))}
              {user ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <NavLink
                      to="/dashboard"
                      className="block text-2xl font-black uppercase tracking-tight text-white hover:text-primary-500 py-2 transition-colors"
                    >
                      Dashboard
                    </NavLink>
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    onClick={handleLogout}
                    className="text-2xl font-black uppercase tracking-tight text-red-400 text-left flex items-center gap-3 py-2"
                  >
                    <FaSignOutAlt /> Logout
                  </motion.button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col gap-3 mt-6 pt-6 border-t border-white/5"
                >
                  <Link
                    to="/login"
                    className="text-center text-base font-bold uppercase tracking-wider text-white border border-white/10 py-4 rounded-xl hover:border-primary-500/50 hover:text-primary-500 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-center text-base font-bold uppercase tracking-wider bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 rounded-xl shadow-lg shadow-primary-500/30"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;