// ============================================================================
// FILE: src/components/Payment/BookingConfirmation.jsx
// PURPOSE: Success page displayed after successful booking/payment
// ============================================================================

import React from 'react';
import { Link } from 'react-router-dom';

const BookingConfirmation = ({ bookingDetails, onGoHome, onViewBooking }) => {
  // Default booking data (would come from props/state)
  const defaultDetails = {
    bookingId: 'BK-2024-10284',
    transactionId: 'txn_1705234567890',
    carName: 'Ferrari F8 Tributo',
    carImage: 'https://images.unsplash.com/photo-1617531653520-bd466ee81bf9?w=400&h=250&fit=crop',
    startDate: '2024-01-18',
    endDate: '2024-01-21',
    days: 3,
    totalAmount: 2720,
    pickupLocation: 'Los Angeles International Airport (LAX)',
    customerEmail: 'john.doe@email.com',
    customerName: 'John Doe',
    status: 'confirmed'
  };

  const details = bookingDetails || defaultDetails;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        
        {/* Success Animation Container */}
        <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[rgba(212,175,55,0.3)] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(212,175,55,0.15)]">
          
          {/* Top Success Banner */}
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-b border-green-500/30 py-8 text-center relative overflow-hidden">
            {/* Animated background circles */}
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-100"></div>
            
            {/* Success Icon */}
            <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-4 shadow-lg shadow-green-500/30">
              <i className="fas fa-check text-white text-4xl animate-bounce"></i>
            </div>
            
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-2">
              Booking Confirmed! 🎉
            </h1>
            <p className="text-gray-300 text-lg">
              Your luxury car reservation has been successfully processed
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-6">
            
            {/* Booking Reference Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Booking ID</p>
                <p className="text-lg font-bold text-[#d4af37] font-mono">{details.bookingId}</p>
              </div>
              <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Transaction ID</p>
                <p className="text-sm font-semibold text-white font-mono">{details.transactionId}</p>
              </div>
            </div>

            {/* Car Details Card */}
            <div className="flex gap-4 bg-[#0a0a0a] rounded-xl p-4 border border-gray-800">
              <img 
                src={details.carImage} 
                alt={details.carName}
                className="w-32 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">{details.carName}</h3>
                <div className="space-y-1 text-sm text-gray-400">
                  <p className="flex items-center gap-2">
                    <i className="fas fa-calendar-alt text-[#d4af37] w-4"></i>
                    {new Date(details.startDate).toLocaleDateString('en-US', { 
                      month: 'short', day: 'numeric', year: 'numeric' 
                    })} - {new Date(details.endDate).toLocaleDateString('en-US', { 
                      month: 'short', day: 'numeric', year: 'numeric' 
                    })}
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="fas fa-clock text-[#d4af37] w-4"></i>
                    {details.days} days rental
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="fas fa-map-marker-alt text-[#d4af37] w-4"></i>
                    {details.pickupLocation}
                  </p>
                </div>
              </div>
            </div>

            {/* Total Amount */}
            <div className="bg-gradient-to-r from-[rgba(212,175,55,0.1)] to-transparent rounded-lg p-4 border border-[rgba(212,175,55,0.2)] flex justify-between items-center">
              <span className="text-gray-300">Total Paid</span>
              <span className="text-3xl font-bold text-[#d4af37]">${details.totalAmount.toLocaleString()}</span>
            </div>

            {/* Confirmation Email Notice */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex gap-3">
              <i className="fas fa-envelope text-blue-400 text-xl mt-0.5"></i>
              <div>
                <p className="text-sm text-blue-300 font-semibold mb-1">Confirmation email sent!</p>
                <p className="text-sm text-gray-400">
                  We've sent a detailed confirmation to <strong className="text-white">{details.customerEmail}</strong>. 
                  Please check your inbox (and spam folder).
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <Link 
                to="/dashboard/my-bookings" 
                onClick={onViewBooking}
                className="py-3 px-6 bg-[#1f1f1f] border border-gray-700 hover:border-[#d4af37] text-white rounded-lg font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2"
              >
                <i className="fas fa-list-alt"></i>
                View My Bookings
              </Link>
              
              <Link 
                to="/" 
                onClick={onGoHome}
                className="py-3 px-6 bg-gradient-to-r from-[#d4af37] to-[#c9a227] text-[#0a0a0a] rounded-lg font-bold text-center transition-all duration-300 hover:shadow-[0_8px_24px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <i className="fas fa-home"></i>
                Back to Home
              </Link>
            </div>

            {/* Additional Info */}
            <div className="pt-4 border-t border-gray-800 text-center">
              <p className="text-xs text-gray-500 mb-2">Need help with your booking?</p>
              <a href="/contact" className="text-sm text-[#d4af37] hover:text-[#f4e4bc] transition-colors">
                Contact Support →
              </a>
            </div>

          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-600 mt-6">
          <i className="fas fa-info-circle mr-1"></i>
          Save this page for your records. Booking details have been sent to your email.
        </p>

      </div>
    </div>
  );
};

export default BookingConfirmation;