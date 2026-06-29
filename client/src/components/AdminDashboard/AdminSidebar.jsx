// ============================================================================
// FILE: src/components/AdminDashboard/AdminSidebar.jsx
// PURPOSE: Admin panel navigation sidebar component
// ============================================================================

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('dashboard');

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'fas fa-chart-line',
      path: '/admin/dashboard'
    },
    {
      id: 'bookings',
      label: 'Bookings',
      icon: 'fas fa-calendar-check',
      path: '/admin/bookings'
    },
    {
      id: 'cars',
      label: 'Car Listings',
      icon: 'fas fa-car',
      path: '/admin/cars',
      badge: { count: 12, color: 'bg-red-500' }
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: 'fas fa-users',
      path: '/admin/customers'
    }
  ];

  const managementItems = [
    {
      id: 'revenue',
      label: 'Revenue',
      icon: 'fas fa-dollar-sign',
      path: '/admin/revenue'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'fas fa-cog',
      path: '/admin/settings'
    }
  ];

  return (
    <aside className="w-64 bg-[#141414] border-r border-gray-800 fixed h-full overflow-y-auto z-20 sidebar-scrollbar">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="font-playfair text-2xl font-bold bg-gradient-to-r from-[#d4af37] to-[#f4e4bc] bg-clip-text text-transparent">
          LUXE
        </h1>
        <p className="text-xs text-gray-500 mt-1 tracking-wider">ADMIN PANEL</p>
      </div>

      {/* Main Menu */}
      <nav className="mt-6 px-3">
        <div className="mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider px-4 mb-2 font-semibold">
            Main Menu
          </p>
          
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setActiveLink(item.id)}
              className={`sidebar-link flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all duration-300 ${
                activeLink === item.id || location.pathname === item.path
                  ? 'bg-[rgba(212,175,55,0.08)] border-l-3 border-l-[#d4af37] text-[#d4af37]'
                  : 'text-gray-400 hover:bg-[rgba(212,175,55,0.05)] hover:text-white border-l-3 border-l-transparent'
              }`}
            >
              <i className={`${item.icon} w-5 text-center`}></i>
              <span className="text-sm font-medium">{item.label}</span>
              
              {item.badge && (
                <span className={`ml-auto ${item.badge.color} text-white text-xs px-2 py-0.5 rounded-full font-semibold`}>
                  {item.badge.count}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider px-4 mb-2 font-semibold">
            Management
          </p>
          
          {managementItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setActiveLink(item.id)}
              className={`sidebar-link flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all duration-300 ${
                activeLink === item.id
                  ? 'bg-[rgba(212,175,55,0.08)] border-l-3 border-l-[#d4af37] text-[#d4af37]'
                  : 'text-gray-400 hover:bg-[rgba(212,175,55,0.05)] hover:text-white border-l-3 border-l-transparent'
              }`}
            >
              <i className={`${item.icon} w-5 text-center`}></i>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Admin Profile - Fixed at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-[#141414]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4e4bc] flex items-center justify-center text-[#0a0a0a] font-bold text-sm">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Admin User</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
          <button 
            className="text-gray-400 hover:text-[#d4af37] transition-colors p-1"
            title="Logout"
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>

      <style jsx>{`
        .sidebar-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-scrollbar::-webkit-scrollbar-track {
          background: #141414;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 3px;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d4af37;
        }
      `}</style>
    </aside>
  );
};

export default AdminSidebar;