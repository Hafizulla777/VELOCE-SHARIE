// ============================================================================
// FILE: src/components/AdminDashboard/AdminStatsCards.jsx
// PURPOSE: Display 4 key platform statistics with luxury styling
// ============================================================================

import React from 'react';

const AdminStatsCards = ({ stats }) => {
  // Default stats data (can be overridden via props)
  const defaultStats = [
    {
      id: 'customers',
      title: 'Total Customers',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'fas fa-users',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400'
    },
    {
      id: 'bookings',
      title: 'Active Bookings',
      value: '184',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'fas fa-calendar-check',
      iconBg: 'bg-green-500/10',
      iconColor: 'text-green-400'
    },
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: '$284K',
      change: '+23.1%',
      changeType: 'positive',
      icon: 'fas fa-dollar-sign',
      iconBg: 'bg-yellow-500/10',
      iconColor: 'text-yellow-400'
    },
    {
      id: 'pending',
      title: 'Pending Cars',
      value: '12',
      change: 'Action needed',
      changeType: 'warning',
      icon: 'fas fa-clock',
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-400'
    }
  ];

  const displayStats = stats || defaultStats;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {displayStats.map((stat) => (
        <div
          key={stat.id}
          className="stat-card bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[rgba(212,175,55,0.15)] rounded-xl p-6 transition-all duration-300 hover:border-[rgba(212,175,55,0.3)] hover:shadow-[0_12px_48px_rgba(212,175,55,0.15)] hover:-translate-y-0.5 relative overflow-hidden group"
        >
          {/* Top gradient line on hover */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Content */}
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`w-12 h-12 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
              <i className={`${stat.icon} ${stat.iconColor} text-xl`}></i>
            </div>
            
            {stat.changeType === 'positive' ? (
              <span className="text-green-400 text-xs font-semibold flex items-center gap-1">
                <i className="fas fa-arrow-up text-[10px]"></i> 
                {stat.change}
              </span>
            ) : stat.changeType === 'warning' ? (
              <span className="text-orange-400 text-xs font-semibold">
                {stat.change}
              </span>
            ) : (
              <span className="text-red-400 text-xs font-semibold flex items-center gap-1">
                <i className="fas fa-arrow-down text-[10px]"></i> 
                {stat.change}
              </span>
            )}
          </div>

          <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
          <p className="text-gray-400 text-sm">{stat.title}</p>
        </div>
      ))}
    </section>
  );
};

export default AdminStatsCards;