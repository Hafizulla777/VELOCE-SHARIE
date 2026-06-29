// ============================================================================
// FILE: src/components/Payment/BookingSummary.jsx
// PURPOSE: Display booking details before payment confirmation
// ============================================================================

import React from 'react';

const BookingSummary = ({ bookingData }) => {
  // Default data (would come from props/state in real app)
  const defaultData = {
    carName: 'Ferrari F8 Tributo',
    carImage: 'https://images.unsplash.com/photo-1617531653520-bd466ee81bf9?w=400&h=250&fit=crop',
    year: 2023,
    color: 'Red',
    location: 'Los Angeles, CA',
    startDate: '2024-01-18',
    endDate: '2024-01-21',
    days: 3,
    pricePerDay: 850,
    serviceFee: 50,
    insurance: 120,
    taxRate: 0.0875
  };

  const data = bookingData || defaultData;

  // Calculate totals
  const subtotal = data.pricePerDay * data.days;
  const tax = Math.round(subtotal * data.taxRate);
  const total = subtotal + data.serviceFee + data.insurance + tax;

  return (
    <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[rgba(212,175,55,0.15)] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <h3 className="font-playfair text-xl font-semibold text-white mb-1">Booking Summary</h3>
        <p className="text-sm text-gray-400">Review your reservation details</p>
      </div>

      {/* Car Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={data.carImage} 
          alt={data.carName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%231f1f1f" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-size="16"%3ECar Image%3C/text%3E%3C/svg%3E';
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h4 className="text-lg font-bold text-white">{data.carName}</h4>
          <p className="text-sm text-gray-300">{data.year} • {data.color}</p>
        </div>
      </div>

      {/* Booking Details */}
      <div className="p-6 space-y-4">
        {/* Location */}
        <div className="flex items-start gap-3">
          <i className="fas fa-map-marker-alt text-[#d4af37] mt-1"></i>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Pickup Location</p>
            <p className="text-sm text-white font-medium">{data.location}</p>
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-start gap-3">
          <i className="fas fa-calendar-alt text-[#d4af37] mt-1"></i>
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Rental Period</p>
            <p className="text-sm text-white font-medium">
              {new Date(data.startDate).toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
            <p className="text-sm text-gray-400">to</p>
            <p className="text-sm text-white font-medium">
              {new Date(data.endDate).toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
            <p className="text-xs text-[#d4af37] mt-1">{data.days} days</p>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-gray-700 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">${data.pricePerDay} × {data.days} days</span>
            <span className="text-white">${subtotal.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Service fee</span>
            <span className="text-white">${data.serviceFee}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Insurance</span>
            <span className="text-white">${data.insurance}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Tax ({(data.taxRate * 100).toFixed(2)}%)</span>
            <span className="text-white">${tax}</span>
          </div>

          <div className="border-t border-gray-600 pt-3 flex justify-between">
            <span className="text-base font-semibold text-white">Total</span>
            <span className="text-base font-bold text-[#d4af37]">${total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;