// ============================================================================
// FILE: src/components/AdminDashboard/CustomerTable.jsx
// PURPOSE: Display recent customers with status badges and management options
// ============================================================================

import React from 'react';

const CustomerTable = ({ customers }) => {
  // Default customer data (can be overridden via props)
  const defaultCustomers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@email.com',
      initials: 'JD',
      avatarGradient: 'from-purple-500 to-pink-500',
      status: 'active',
      joinedDate: 'Jan 15, 2024'
    },
    {
      id: 2,
      name: 'Sarah Miller',
      email: 'sarah@email.com',
      initials: 'SM',
      avatarGradient: 'from-blue-500 to-cyan-500',
      status: 'active',
      joinedDate: 'Jan 14, 2024'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@email.com',
      initials: 'MJ',
      avatarGradient: 'from-green-500 to-emerald-500',
      status: 'active',
      joinedDate: 'Jan 13, 2024'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      email: 'emma@email.com',
      initials: 'EW',
      avatarGradient: 'from-orange-500 to-red-500',
      status: 'pending',
      joinedDate: 'Jan 12, 2024'
    }
  ];

  const displayCustomers = customers || defaultCustomers;

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      active: {
        bg: 'bg-[rgba(59,130,246,0.15)]',
        text: 'text-[#3b82f6]',
        border: 'border-[rgba(59,130,246,0.3)]',
        label: 'Active'
      },
      pending: {
        bg: 'bg-[rgba(251,191,36,0.15)]',
        text: 'text-[#fbbf24]',
        border: 'border-[rgba(251,191,36,0.3)]',
        label: 'Pending'
      },
      banned: {
        bg: 'bg-[rgba(239,68,68,0.15)]',
        text: 'text-[#ef4444]',
        border: 'border-[rgba(239,68,68,0.3)]',
        label: 'Banned'
      }
    };

    const config = statusConfig[status] || statusConfig.active;

    return (
      <span className={`status-badge ${config.bg} ${config.text} ${config.border} px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="card-luxury bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[rgba(212,175,55,0.15)] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-800 flex justify-between items-center">
        <h3 className="font-playfair text-xl font-semibold text-white">Recent Customers</h3>
        <a 
          href="/admin/customers" 
          className="text-[#d4af37] text-sm hover:text-[#f4e4bc] transition-colors flex items-center gap-1"
        >
          View All 
          <i className="fas fa-arrow-right text-xs"></i>
        </a>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[rgba(31,31,31,0.5)]">
            <tr>
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">
                Customer
              </th>
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">
                Status
              </th>
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {displayCustomers.map((customer) => (
              <tr 
                key={customer.id}
                className="table-row transition-colors duration-200 hover:bg-[rgba(212,175,55,0.05)]"
              >
                {/* Customer Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar with gradient */}
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${customer.avatarGradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                      {customer.initials}
                    </div>
                    
                    {/* Name & Email */}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{customer.name}</p>
                      <p className="text-xs text-gray-500 truncate">{customer.email}</p>
                    </div>
                  </div>
                </td>

                {/* Status Badge */}
                <td className="px-6 py-4">
                  <StatusBadge status={customer.status} />
                </td>

                {/* Join Date */}
                <td className="px-6 py-4 text-sm text-gray-400">
                  {customer.joinedDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State (if no customers) */}
      {displayCustomers.length === 0 && (
        <div className="p-12 text-center">
          <i className="fas fa-users text-gray-600 text-4xl mb-3"></i>
          <p className="text-gray-400">No customers found</p>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;