import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  FaTachometerAlt,
  FaClipboardList,
  FaUserCircle,
  FaSignOutAlt,
  FaCar,
  FaTimes,
  FaBars,
} from 'react-icons/fa';

const navItems = [
  { name: 'Overview', path: '/dashboard', icon: FaTachometerAlt, end: true },
  { name: 'My Bookings', path: '/dashboard/my-bookings', icon: FaClipboardList },
  { name: 'Profile', path: '/dashboard/profile', icon: FaUserCircle },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
        <NavLink to="/" className="flex items-center gap-2.5 group" onClick={() => setIsOpen(false)}>
          <div className="bg-gradient-to-br from-primary-400 to-primary-600 p-2 rounded-lg">
            <FaCar className="text-white text-sm" />
          </div>
          <span className="text-lg font-black text-white tracking-tight">
            Veloce<span className="text-primary-500">Share</span>
          </span>
        </NavLink>
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        >
          <FaTimes size={14} />
        </button>
      </div>

      {/* User Info */}
      <div className="px-6 py-6 border-b border-white/5">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-primary-500/20">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-white text-sm truncate">{user?.name}</p>
            <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold truncate">
              {user?.role === 'owner' ? 'Fleet Owner' : 'Customer'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                isActive
                  ? 'bg-primary-500/15 text-primary-400 border border-primary-500/20 shadow-lg shadow-primary-500/5'
                  : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
              }`
            }
          >
            <item.icon
              className={`text-base transition-colors ${
                item.path === '/dashboard'
                  ? undefined
                  : undefined
              }`}
            />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-4 pb-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-red-400/80 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/10 transition-all duration-300"
        >
          <FaSignOutAlt className="text-base" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[270px] min-h-screen bg-dark-100 border-r border-white/5 fixed left-0 top-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-6 left-5 z-50 w-11 h-11 rounded-xl bg-dark-100 border border-white/10 flex items-center justify-center text-white/70 hover:text-primary-500 transition-colors shadow-xl"
      >
        <FaBars size={16} />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-dark-100 border-r border-white/5 z-50 shadow-2xl shadow-black/60"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;