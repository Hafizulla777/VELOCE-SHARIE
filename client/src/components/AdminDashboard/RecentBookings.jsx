// ============================================================================
// FILE: src/components/AdminDashboard/RecentBookings.jsx
// PURPOSE: Display recent platform bookings with status and pricing
// ============================================================================

import React from 'react';

const RecentBookings = ({ bookings }) => {
  // Default bookings data (can be overridden via props)
  const defaultBookings = [
    {
      id: '10284',
      carName: 'Ferrari F8',
      dateRange: 'Jan 18-21, 2024',
      totalAmount: 2550,
      status: 'confirmed',
      customerName: 'John Doe'
    },
    {
      id: '10283',
      carName: 'Lambo Huracán',
      dateRange: 'Jan 20-25, 2024',
      totalAmount: 4750,
      status: 'processing',
      customerName: 'Sarah Miller'
    },
    {
      id: '10282',
      carName: 'Porsche 911',
      dateRange: 'Jan 17-19, 2024',
      totalAmount: 1440,
      status: 'confirmed',
      customerName: 'Mike Johnson'
    }
  ];

  const displayBookings = bookings || defaultBookings;

  // Status configuration
  const getStatusConfig = (status) => {
    const configs = {
      confirmed: {
        icon: 'fas fa-check-circle',
        iconBg: 'bg-green-500/10',
        iconColor: 'text-green-400',
        textColor: 'text-green-400',
        label: 'Confirmed'
      },
      processing: {
        icon: 'fas fa-clock',
        iconBg: 'bg-blue-500/10',
        iconColor: 'text-blue-400',
        textColor: 'text-blue-400',
        label: 'Processing'
      },
      cancelled: {
        icon: 'fas fa-times-circle',
        iconBg: 'bg-red-500/10',
        iconColor: 'text-red-400',
        textColor: 'text-red-400',
        label: 'Cancelled'
      },
      completed: {
        icon: 'fas fa-flag-checkered',
        iconBg: 'bg-purple-500/10',
        iconColor: 'text-purple-400',
        textColor: 'text-purple-400',
        label: 'Completed'
      }
    };

    return configs[status] || configs.processing;
  };

  return (
    <div className="card-luxury bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[rgba(212,175,55,0.15)] rounded-xl p-6 lg:col-span-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-playfair text-xl font-semibold text-white">Recent Bookings</h3>
        <a 
          href="/admin/bookings" 
          className="text-[#d4af37] text-sm hover:text-[#f4e4bc] transition-colors flex items-center gap-1"
        >
          View All 
          <i className="fas fa-arrow-right text-xs"></i>
        </a>
      </div>

      {/* Bookings List */}
      {displayBookings.length > 0 ? (
        <div className="space-y-3">
          {displayBooks.map((booking) => {
            const statusConfig = getStatusConfig(booking.status);
            
            return (
              <div 
                key={booking.id}
                className="flex items-center justify-between p-4 bg-[rgba(31,31,31,0.3)] rounded-lg hover:bg-[rgba(31,31,31,0.5)] transition-all duration-200 group"
              >
                {/* Left Side - Status Icon & Booking Info */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Status Icon */}
                  <div className={`w-12 h-12 rounded-lg ${statusConfig.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <i className={`${statusConfig.icon} ${statusConfig.iconColor} text-xl`}></i>
                  </div>

                  {/* Booking Details */}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white mb-0.5">
                      Booking #{booking.id}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {booking.carName} • {booking.dateRange}
                    </p>
                    {booking.customerName && (
                      <p className="text-xs text-gray-600 mt-0.5">
                        Customer: {booking.customerName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Side - Price & Status */}
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="text-sm font-semibold text-[#d4af37] mb-0.5">
                    ${booking.totalAmount.toLocaleString()}
                  </p>
                  <span className={`text-xs font-medium ${statusConfig.textColor}`}>
                    {statusConfig.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="py-8 text-center">
          <i className="fas fa-calendar-check text-gray-600 text-3xl mb-2"></i>
          <p className="text-gray-400">No recent bookings</p>
        </div>
      )}
    </div>
  );
};

export default RecentBookings;