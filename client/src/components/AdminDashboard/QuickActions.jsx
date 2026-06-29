// ============================================================================
// FILE: src/components/AdminDashboard/QuickActions.jsx
// PURPOSE: Quick action buttons for common admin tasks
// ============================================================================

import React from 'react';

const QuickActions = ({ onAction }) => {
  // Handle action clicks
  const handleAction = (actionType) => {
    if (onAction) {
      onAction(actionType);
    } else {
      console.log(`Quick action triggered: ${actionType}`);
      
      // Default behavior - show alert (replace with actual navigation in real app)
      switch(actionType) {
        case 'addCar':
          window.location.href = '/admin/cars/add';
          break;
        case 'addCustomer':
          console.log('Add customer modal would open here');
          break;
        case 'exportReports':
          console.log('Export reports triggered');
          alert('📊 Reports export feature - Coming soon!');
          break;
        case 'sendNotification':
          console.log('Send notification modal would open here');
          break;
        default:
          console.log('Unknown action:', actionType);
      }
    }
  };

  const actions = [
    {
      id: 'addCar',
      label: 'Add New Car Listing',
      icon: 'fas fa-plus',
      primary: true,
      description: 'Add a new vehicle to the platform'
    },
    {
      id: 'addCustomer',
      label: 'Add New Customer',
      icon: 'fas fa-user-plus',
      primary: false,
      description: 'Manually register a customer'
    },
    {
      id: 'exportReports',
      label: 'Export Reports',
      icon: 'fas fa-file-export',
      primary: false,
      description: 'Download analytics & reports'
    },
    {
      id: 'sendNotification',
      label: 'Send Notification',
      icon: 'fas fa-bell',
      primary: false,
      description: 'Broadcast to users'
    }
  ];

  return (
    <div className="card-luxury bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[rgba(212,175,55,0.15)] rounded-xl p-6">
      <h3 className="font-playfair text-xl font-semibold text-white mb-4">Quick Actions</h3>
      
      <div className="space-y-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleAction(action.id)}
            className={`w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
              action.primary
                ? 'bg-gradient-to-r from-[#d4af37] to-[#c9a227] text-[#0a0a0a] hover:shadow-[0_8px_24px_rgba(212,175,55,0.4)] hover:-translate-y-0.5'
                : 'bg-[#1f1f1f] border border-gray-700 text-white hover:border-[#d4af37] hover:bg-[rgba(212,175,55,0.05)]'
            }`}
            title={action.description}
          >
            <i className={`${action.icon} ${action.primary ? '' : 'text-[#d4af37]'}`}></i>
            {action.label}
          </button>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-4 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">
          <i className="fas fa-info-circle mr-1"></i>
          Need help? Check the documentation
        </p>
      </div>
    </div>
  );
};

export default QuickActions;