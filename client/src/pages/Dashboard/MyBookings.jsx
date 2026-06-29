// ============================================================================
// FILE: src/pages/Dashboard/MyBookings.jsx (UPDATED VERSION)
// PURPOSE: Display bookings with correct car information
// ============================================================================

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import Loader from '../../components/Loader/Loader';
import toast from 'react-hot-toast';
import { FaCalendarAlt, FaCar, FaMapMarkerAlt, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/bookings/my-bookings-simple'); // Use our new endpoint
      
      console.log('📋 Bookings received:', data); // Debug log
      
      if (data.success) {
        setBookings(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIX: Extract car name safely from multiple possible field structures
  const getCarName = (booking) => {
    // Option 1: If car is populated object
    if (booking.car?.name) return booking.car.name;
    
    // Option 2: If car is populated but uses different field
    if (booking.car?.brand && booking.car?.type) {
      return `${booking.car.brand} ${booking.car.type}`;
    }
    
    // Option 3: Check for nested structure
    if (typeof booking.car === 'object' && booking.car !== null) {
      return Object.values(booking.car).find(v => typeof v === 'string' && v.length > 3) || 'Luxury Vehicle';
    }
    
    // Option 4: Fallback
    return 'Luxury Vehicle';
  };

  // ✅ FIX: Get car image safely
  const getCarImage = (booking) => {
    // Try multiple possible image locations
    if (booking.car?.image) return booking.car.image;
    if (booking.car?.imageUrl) return booking.car.imageUrl;
    if (booking.car?.images?.[0]) return booking.car.images[0];
    
    // Default fallback image
    return 'https://images.unsplash.com/photo-1494976766949-88df6e44f042?w=400&h=250&fit=crop';
  };

  // ✅ FIX: Get price safely
  const getPrice = (booking) => {
    // Try totalPrice first (your schema), then totalAmount, then calculate
    if (booking.totalPrice) return `$${booking.totalPrice}`;
    if (booking.totalAmount) return `$${booking.totalAmount}`;
    if (booking.subtotal) return `$${booking.subtotal}`;
    
    return '$0';
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: 'bg-yellow-500/10',
        text: 'text-yellow-400',
        border: 'border-yellow-500/30',
        icon: FaClock,
        label: 'Pending'
      },
      approved: {
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        icon: FaCheckCircle,
        label: 'Confirmed'
      },
      completed: {
        bg: 'bg-green-500/10',
        text: 'text-green-400',
        border: 'border-green-500/30',
        icon: FaCheckCircle,
        label: 'Completed'
      },
      cancelled: {
        bg: 'bg-red-500/10',
        text: 'text-red-400',
        border: 'border-red-500/30',
        icon: FaTimesCircle,
        label: 'Cancelled'
      },
      active: {
        bg: 'bg-purple-500/10',
        text: 'text-purple-400',
        border: 'border-purple-500/30',
        icon: FaCar,
        label: 'Active'
      }
    };
    
    return statusConfig[status.toLowerCase()] || statusConfig.pending;
  };

  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
            <p className="text-white/50 mt-1">Manage your reservations</p>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex gap-2 bg-white/5 rounded-lg p-1">
            {['all', 'pending', 'active', 'completed', 'cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filter === tab
                    ? 'bg-primary-500 text-black'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20">
            <FaCalendarAlt className="text-5xl text-white/20 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No bookings yet</h2>
            <p className="text-white/50">When you book a car, it will appear here</p>
            <Link 
              to="/cars"
              className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-black font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Browse Fleet
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings
              .filter(booking => {
                if (filter === 'all') return true;
                return booking.status?.toLowerCase() === filter;
              })
              .map((booking) => {
                const statusInfo = getStatusBadge(booking.status);
                
                return (
                  <div 
                    key={booking._id}
                    className="glass-panel rounded-xl overflow-hidden hover:border-primary-500/30 transition-all"
                  >
                    <div className="p-6 flex flex-col lg:flex-row gap-6">
                      
                      {/* Left: Car Image & Info */}
                      <div className="flex items-center gap-4 lg:w-80">
                        {/* Car Image */}
                        <div className="w-24 h-20 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                          <img 
                            src={getCarImage(booking)}
                            alt={getCarName(booking)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Car Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white text-lg truncate">
                            {getCarName(booking)} {/* ✅ FIXED: Uses safe extraction */}
                          </h3>
                          
                          <div className="flex items-center gap-4 mt-2 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                              <FaMapMarkerAlt className="text-xs" />
                              {booking.pickupLocation || 'Main Office'}
                            </span>
                            
                            <span>•</span>
                            
                            <span>{formatDate(booking.startDate)}</span>
                            
                            <span>-</span>
                            
                            <span>{formatDate(booking.endDate)}</span>
                          </div>

                          {/* Price */}
                          <div className="mt-2">
                            <span className="text-xl font-bold text-primary-500">
                              {getPrice(booking)} {/* ✅ FIXED: Safe price extraction */}
                              <span className="text-sm text-white/40 font-normal">/day</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Status & Actions */}
                      <div className="flex flex-col items-end justify-between lg:w-40">
                        
                        {/* Status Badge */}
                        <div className={`px-4 py-2 rounded-lg ${statusInfo.bg} ${statusInfo.border} flex items-center gap-2`}>
                          <statusInfo.icon className={statusInfo.text} />
                          <span className={`text-xs font-bold uppercase tracking-wider ${statusInfo.text}`}>
                            {statusInfo.label}
                          </span>
                        </div>

                        {/* Confirmation Number */}
                        <div className="text-right mt-2">
                          <p className="text-[10px] text-white/40 uppercase tracking-wider">Confirmation #</p>
                          <p className="text-sm font-mono font-bold text-white">
                            {booking.confirmationNumber || booking._id.toString().slice(-8).toUpperCase()}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        {(booking.status === 'pending' || booking.status === 'approved') && (
                          <button 
                            onClick={() => window.open(`/cars/${booking.car?._id}`, '_blank')}
                            className="mt-3 w-full py-2 px-4 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold text-white hover:bg-white/10 hover:text-primary-500 transition-all"
                          >
                            View Car →
                          </button>
                        )}

                        {booking.status === 'completed' && (
                          <button 
                            className="mt-3 w-full py-2 px-4 bg-green-500/10 border border-green-500/30 rounded-lg text-sm font-semibold text-green-400 hover:bg-green-500/20 transition-all"
                          onClick={() => toast.success('Thank you for your feedback!')}
                          >
                            Leave Review
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;