// ============================================================================
// FILE: src/components/AdminDashboard/CarApprovalTable.jsx
// PURPOSE: Display pending car listings with approve/reject actions
// ============================================================================

import React, { useState } from 'react';

const CarApprovalTable = ({ pendingCars, onApprove, onReject }) => {
  const [localCars, setLocalCars] = useState(pendingCars || defaultPendingCars);

  // Default pending cars data (can be overridden via props)
  const defaultPendingCars = [
    {
      id: 1,
      name: 'Ferrari F8 Tributo',
      year: 2023,
      color: 'Red',
      image: 'https://images.unsplash.com/photo-1617531653520-bd466ee81bf9?w=200&h=150&fit=crop',
      ownerName: 'James Cooper',
      pricePerDay: 850,
      status: 'pending'
    },
    {
      id: 2,
      name: 'Lamborghini Huracán',
      year: 2024,
      color: 'Yellow',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200&h=150&fit=crop',
      ownerName: 'Alex Turner',
      pricePerDay: 950,
      status: 'pending'
    },
    {
      id: 3,
      name: 'Porsche 911 Turbo S',
      year: 2023,
      color: 'Black',
      image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=200&h=150&fit=crop',
      ownerName: 'Sophia Martinez',
      pricePerDay: 720,
      status: 'pending'
    },
    {
      id: 4,
      name: 'Mercedes AMG GT',
      year: 2024,
      color: 'White',
      image: 'https://images.unsplash.com/photo-1580414057983-c0c8bfe8ce5e?w=200&h=150&fit=crop',
      ownerName: 'David Chen',
      pricePerDay: 680,
      status: 'pending'
    }
  ];

  // Handle approve action
  const handleApprove = (carId) => {
    if (window.confirm('Are you sure you want to approve this car listing?')) {
      // Remove from local state with animation
      setLocalCars(localCars.filter(car => car.id !== carId));
      
      // Call parent callback if provided
      if (onApprove) {
        onApprove(carId);
      }
      
      // Show success message (in real app, use toast notification)
      console.log(`✅ Car ${carId} approved successfully!`);
    }
  };

  // Handle reject action
  const handleReject = (carId) => {
    const reason = window.prompt('Please enter rejection reason:');
    
    if (reason) {
      // Remove from local state with animation
      setLocalCars(localCars.filter(car => car.id !== carId));
      
      // Call parent callback if provided
      if (onReject) {
        onReject(carId, reason);
      }
      
      // Show rejection message
      console.log(`❌ Car ${carId} rejected. Reason: ${reason}`);
    }
  };

  return (
    <div className="card-luxury bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[rgba(212,175,55,0.15)] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-800 flex justify-between items-center">
        <h3 className="font-playfair text-xl font-semibold text-white">Pending Car Approvals</h3>
        <span className="bg-orange-500/20 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full">
          {localCars.length} Pending
        </span>
      </div>

      {/* Table Container */}
      {localCars.length > 0 ? (
        <div className="overflow-x-auto max-h-[480px] overflow-y-auto custom-scrollbar">
          <table className="w-full">
            <thead className="bg-[rgba(31,31,31,0.5)] sticky top-0 z-10">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">
                  Car Details
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">
                  Owner
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">
                  Price/Day
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {localCars.map((car) => (
                <tr 
                  key={car.id}
                  className="table-row transition-colors duration-200 hover:bg-[rgba(212,175,55,0.05)]"
                >
                  {/* Car Image & Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Car Thumbnail */}
                      <div className="w-16 h-12 rounded bg-gray-700 overflow-hidden flex-shrink-0">
                        <img 
                          src={car.image} 
                          alt={car.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="48"%3E%3Crect fill="%23374151" width="64" height="48"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239CA3AF" font-size="10"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                      
                      {/* Car Info */}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">{car.name}</p>
                        <p className="text-xs text-gray-500">{car.year} • {car.color}</p>
                      </div>
                    </div>
                  </td>

                  {/* Owner Name */}
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {car.ownerName}
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-sm font-semibold text-[#d4af37]">
                    ${car.pricePerDay}
                  </td>

                  {/* Action Buttons */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {/* Approve Button */}
                      <button
                        onClick={() => handleApprove(car.id)}
                        className="action-btn approve-btn bg-[rgba(34,197,94,0.15)] text-[#22c55e] border border-[rgba(34,197,94,0.3)] px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 hover:bg-[rgba(34,197,94,0.25)] hover:shadow-[0_4px_12px_rgba(34,197,94,0.3)] hover:scale-105 flex items-center gap-1"
                      >
                        <i className="fas fa-check text-[10px]"></i>
                        Approve
                      </button>

                      {/* Reject Button */}
                      <button
                        onClick={() => handleReject(car.id)}
                        className="action-btn reject-btn bg-[rgba(239,68,68,0.15)] text-[#ef4444] border border-[rgba(239,68,68,0.3)] px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 hover:bg-[rgba(239,68,68,0.25)] hover:shadow-[0_4px_12px_rgba(239,68,68,0.3)] hover:scale-105 flex items-center gap-1"
                      >
                        <i className="fas fa-times text-[10px]"></i>
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center">
          <i className="fas fa-car text-gray-600 text-4xl mb-3"></i>
          <p className="text-gray-400 text-lg mb-1">No Pending Cars</p>
          <p className="text-gray-500 text-sm">All caught up! No cars waiting for approval.</p>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #141414;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d4af37;
        }
      `}</style>
    </div>
  );
};

export default CarApprovalTable;