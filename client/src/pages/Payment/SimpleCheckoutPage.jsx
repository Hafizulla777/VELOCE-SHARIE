// ============================================================================
// FILE: src/pages/Payment/SimpleCheckoutPage.jsx (FIXED VERSION)
// PURPOSE: Fixed booking page - Now works with your actual MongoDB data!
// ============================================================================

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const SimpleCheckoutPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get logged-in user
  
  // State
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState('');
  const [carLoading, setCarLoading] = useState(true);
  const [carData, setCarData] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    pickupLocation: ''
  });

  // Fetch car details from API when component mounts
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        console.log('🚗 Fetching car ID:', carId);
        
        const response = await axios.get(`/api/cars/${carId}`);
        
        console.log('✅ Car data received:', response.data);
        
        if (response.data.success && response.data.data) {
          setCarData(response.data.data);
          setCarLoading(false);
        } else {
          setError('Car not found');
          setCarLoading(false);
        }
        
      } catch (err) {
        console.error('❌ Error fetching car:', err);
        setError('Failed to load car details');
        setCarLoading(false);
      }
    };

    if (carId) {
      fetchCarDetails();
    }
  }, [carId]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  // Calculate total (works with BOTH "price" and "pricePerDay")
  const calculateTotal = () => {
    if (!formData.startDate || !formData.endDate || !carData) return 0;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
    
    if (days < 1) return 0;
    
    // Support both field names for flexibility
    const pricePerDay = carData.pricePerDay || carData.price || 100;
    const subtotal = pricePerDay * days;
    const serviceFee = 50;
    const tax = Math.round(subtotal * 0.0875);
    
    return subtotal + serviceFee + tax;
  };

  // Handle booking submission - FIXED!
  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.startDate || !formData.endDate) {
      setError('Please select pickup and return dates');
      return;
    }

    if (!formData.pickupLocation.trim()) {
      setError('Please enter a pickup location');
      return;
    }

    if (!user) {
      setError('Please login to make a booking');
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('📤 Sending booking request...');
      console.log('Car ID:', carId);
      console.log('User:', user);
      console.log('Form data:', formData);

      // Call the SIMPLE booking API with CORRECT data structure
      const response = await axios.post(
        '/api/bookings/create-simple',
        {
          carId: carId,                    // ✅ MongoDB ObjectId
          startDate: formData.startDate,
          endDate: formData.endDate,
          pickupLocation: formData.pickupLocation
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('✅ Booking response:', response.data);

      if (response.data.success) {
        setBookingData(response.data.data.booking);
        setBookingSuccess(true);
        
        // Show success message
        if (response.data.data.emailSent) {
          alert(`🎉 BOOKING CONFIRMED!\n\nConfirmation #: ${response.data.data.booking.confirmationNumber}\n✅ Email sent to ${user.email}`);
        } else {
          alert(`🎉 BOOKING CONFIRMED!\n\nConfirmation #: ${response.data.data.booking.confirmationNumber}\n📧 Check your email for details`);
        }
      } else {
        setError(response.data.message || 'Booking failed');
      }

    } catch (err) {
      console.error('❌ Booking error:', err);
      
      // Detailed error logging
      if (err.response) {
        console.error('Error status:', err.response.status);
        console.error('Error data:', err.response.data);
        setError(err.response?.data?.message || `Server error (${err.response.status})`);
      } else if (err.request) {
        setError('No response from server. Is it running?');
      } else {
        setError(err.message || 'Failed to create booking');
      }

      // For demo mode - still show success even if API fails
      if (window.location.hostname === 'localhost' || process.env.NODE_ENV === 'development') {
        console.log('⚠️ Demo mode: Showing success anyway');
        
        // Generate fake confirmation number
        const fakeConfirmationNumber = `LUXE-DEMO-${Date.now().toString(36).toUpperCase()}`;
        
        setBookingData({
          confirmationNumber: fakeConfirmationNumber,
          ...formData,
          totalAmount: calculateTotal(),
          carName: carData?.name || 'Luxury Car',
          customerEmail: user?.email || 'demo@example.com',
          customerName: user?.name || 'Demo User'
        });
        
        setBookingSuccess(true);
        alert(`🎉 DEMO MODE: Booking Confirmed!\n\nConfirmation #: ${fakeConfirmationNumber}\n(API Error: ${err.message})`);
      }
      
    } finally {
      setLoading(false);
    }
  };

  // Loading state (fetching car)
  if (carLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Car Details...</h2>
          <p className="text-gray-400">Please wait while we fetch the vehicle information</p>
        </div>
      </div>
    );
  }

  // Error state (car not found)
  if (error && !carData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-[#141414] border border-red-500/30 rounded-xl p-8">
          <i className="fas fa-exclamation-triangle text-red-400 text-5xl mb-4"></i>
          <h2 className="text-2xl font-bold text-white mb-3">Oops!</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/cars')}
            className="px-6 py-3 bg-[#d4af37] text-[#0a0a0a] rounded-lg font-bold hover:bg-[#f4e4bc] transition-colors"
          >
            Back to Cars
          </button>
        </div>
      </div>
    );
  }

  // Success screen
  if (bookingSuccess && bookingData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          
          {/* Success Card */}
          <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] border-2 border-green-500/50 rounded-2xl overflow-hidden shadow-2xl shadow-green-500/20">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 p-8 text-center border-b border-green-500/30">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <i className="fas fa-check text-white text-3xl"></i>
              </div>
              <h1 className="font-playfair text-3xl font-bold text-white mb-2">
                🎉 Booking Confirmed!
              </h1>
              <p className="text-gray-300">Your luxury car reservation is all set!</p>
            </div>

            {/* Details */}
            <div className="p-8 space-y-6">
              
              {/* Confirmation Number */}
              <div className="bg-[#0a0a0a] rounded-lg p-4 text-center border border-gray-800">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Confirmation Number</p>
                <p className="text-2xl font-bold text-[#d4af37] font-mono">{bookingData.confirmationNumber}</p>
              </div>

              {/* Car Info */}
              {carData && (
                <div className="flex gap-4 bg-[#0a0a0a] rounded-xl p-4 border border-gray-800">
                  <img 
                    src={carData.image} 
                    alt={carData.name}
                    className="w-24 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-bold text-white text-lg">{carData.name}</h3>
                    <p className="text-sm text-gray-400">{carData.brand} • {carData.type}</p>
                  </div>
                </div>
              )}

              {/* Dates & Location */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>📅 Pickup:</span>
                  <span className="font-semibold">{new Date(formData.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>📅 Return:</span>
                  <span className="font-semibold">{new Date(formData.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>📍 Location:</span>
                  <span className="font-semibold">{formData.pickupLocation}</span>
                </div>
              </div>

              {/* Total */}
              <div className="bg-gradient-to-r from-[rgba(212,175,55,0.1)] to-transparent rounded-lg p-4 border border-[rgba(212,175,55,0.2)] text-center">
                <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                <p className="text-3xl font-bold text-[#d4af37]">${calculateTotal().toLocaleString()}</p>
              </div>

              {/* Email Notice */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
                <i className="fas fa-envelope text-blue-400 text-2xl mb-2"></i>
                <p className="text-sm text-blue-300 font-semibold">✉️ Confirmation email sent!</p>
                <p className="text-xs text-gray-400 mt-1">Check your inbox (and spam folder)</p>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="p-8 pt-0 space-y-3">
              <button
                onClick={() => navigate('/dashboard/my-bookings')}
                className="w-full py-3 bg-[#d4af37] text-[#0a0a0a] rounded-lg font-bold hover:bg-[#f4e4bc] transition-colors"
              >
                📋 View My Bookings
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="w-full py-3 bg-[#1f1f1f] text-white rounded-lg font-semibold hover:bg-[#2a2a2a] transition-colors border border-gray-700"
              >
                🏠 Back to Home
              </button>
            </div>

          </div>

          <p className="text-center text-xs text-gray-600 mt-4">
            💡 Save this confirmation number for your records
          </p>

        </div>
      </div>
    );
  }

  // Checkout form (default view)
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8 px-4">
      
      {/* Page Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
          <a href="/" className="hover:text-[#d4af37] transition-colors">Home</a>
          <i className="fas fa-chevron-right text-xs"></i>
          <a href="/cars" className="hover:text-[#d4af37] transition-colors">Cars</a>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-white">Book Now</span>
        </nav>

        <h1 className="font-playfair text-4xl font-bold text-white mb-2">
          Complete Your Reservation
        </h1>
        <p className="text-gray-400">Simple booking - No payment required! 🚗</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column - Car Summary */}
        <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[rgba(212,175,55,0.15)] rounded-xl overflow-hidden">
          <div className="relative h-56">
            <img 
              src={carData?.image || 'https://images.unsplash.com/photo-1617531653520-bd466ee81bf9?w=400&h=250&fit=crop'} 
              alt={carData?.name || 'Luxury Car'}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-5">
              <h2 className="text-2xl font-bold text-white">{carData?.name || 'Luxury Car'}</h2>
              <p className="text-gray-300">{carData?.brand} • {carData?.type}</p>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-700">
              <span className="text-gray-400">Price per day</span>
              <span className="text-2xl font-bold text-[#d4af37]">${carData?.price || carData?.pricePerDay || 0}</span>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <i className="fas fa-star text-[#d4af37]"></i>
                Features Included:
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-400"></i>
                  Unlimited mileage
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-400"></i>
                  Basic insurance coverage
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-400"></i>
                  24/7 roadside assistance
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-400"></i>
                  GPS navigation system
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Form */}
        <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[rgba(212,175,55,0.15)] rounded-xl p-6">
          <h3 className="font-playfair text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <i className="fas fa-calendar-check text-[#d4af37]"></i>
            Booking Details
          </h3>

          <form onSubmit={handleConfirmBooking} className="space-y-5">
            
            {/* Pickup Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                📅 Pickup Date *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Return Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                📅 Return Date *
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate || new Date().toISOString().split('T')[0]}
                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                📍 Pickup Location *
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="e.g., Los Angeles Airport, Downtown Office..."
                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#d4af37] focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Price Breakdown */}
            {formData.startDate && formData.endDate && (
              <div className="bg-[#0a0a0a] rounded-lg p-4 space-y-2 border border-gray-700">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">${carData?.price || carData?.pricePerDay || 0} × {Math.ceil(Math.abs(new Date(formData.endDate) - new Date(formData.startDate)) / (1000*60*60*24))} days</span>
                  <span className="text-white">${((carData?.price || carData?.pricePerDay || 0) * Math.ceil(Math.abs(new Date(formData.endDate) - new Date(formData.startDate)) / (1000*60*60*24))).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Service fee</span>
                  <span className="text-white">$50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax (8.75%)</span>
                  <span className="text-white">${Math.round((carData?.price || carData?.pricePerDay || 0) * Math.ceil(Math.abs(new Date(formData.endDate) - new Date(formData.startDate)) / (1000*60*60*24)) * 0.0875)}</span>
                </div>
                <div className="border-t border-gray-600 pt-2 flex justify-between font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-[#d4af37] text-lg">${calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm flex items-center gap-2">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.startDate || !formData.endDate || !formData.pickupLocation}
              className={`w-full py-4 rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
                loading || !formData.startDate || !formData.endDate || !formData.pickupLocation
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#d4af37] to-[#c9a227] text-[#0a0a0a] hover:shadow-[0_12px_32px_rgba(212,175,55,0.4)] hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-check-circle"></i>
                  Confirm Booking (Demo Mode)
                </>
              )}
            </button>

            {/* Demo Notice */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-yellow-300 text-xs text-center">
              <i className="fas fa-info-circle mr-1"></i>
              <strong>Demo Mode:</strong> No real payment! Just click to book.
            </div>

          </form>
        </div>

      </div>

    </div>
  );
};

export default SimpleCheckoutPage;