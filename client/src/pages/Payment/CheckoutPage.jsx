// ============================================================================
// FILE: src/pages/Payment/CheckoutPage.jsx
// PURPOSE: Main checkout page - combines summary + payment + confirmation flow
// ============================================================================

import React, { useState } from 'react';
import BookingSummary from '../../components/Payment/BookingSummary';
import StripePaymentForm from '../../components/Payment/StripePaymentForm';
import BookingConfirmation from '../../components/Payment/BookingConfirmation';

const CheckoutPage = () => {
  // Page state: 'checkout' | 'processing' | 'success' | 'error'
  const [pageState, setPageState] = useState('checkout');
  
  // Booking data (would come from URL params or state)
  const [bookingData] = useState({
    carName: 'Ferrari F8 Tributo',
    carImage: 'https://images.unsplash.com/photo-1617531653520-bd466ee81bf9?w=400&h=250&fit=crop',
    year: 2023,
    color: 'Red',
    location: 'Los Angeles International Airport (LAX)',
    startDate: '2024-01-18',
    endDate: '2024-01-21',
    days: 3,
    pricePerDay: 850,
    serviceFee: 50,
    insurance: 120,
    taxRate: 0.0875
  });

  // Transaction result data
  const [transactionResult, setTransactionResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle successful payment
  const handlePaymentSuccess = (paymentData) => {
    console.log('💳 Payment successful:', paymentData);
    
    setTransactionResult({
      ...paymentData,
      ...bookingData,
      totalAmount: calculateTotal(bookingData),
      bookingId: `BK-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
      customerEmail: 'customer@example.com', // Would come from auth context
      customerName: 'John Doe' // Would come from auth context
    });

    // Show processing state briefly, then success
    setPageState('processing');
    
    setTimeout(() => {
      setPageState('success');
    }, 1500); // Simulate processing time
  };

  // Handle payment error
  const handlePaymentError = (error) => {
    console.error('❌ Payment failed:', error);
    setErrorMessage(error);
    setPageState('error');
  };

  // Calculate total amount
  const calculateTotal = (data) => {
    const subtotal = data.pricePerDay * data.days;
    const tax = Math.round(subtotal * data.taxRate);
    return subtotal + data.serviceFee + data.insurance + tax;
  };

  // Render different states
  if (pageState === 'success') {
    return <BookingConfirmation bookingDetails={transactionResult} />;
  }

  if (pageState === 'processing') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="font-playfair text-2xl font-bold text-white mb-2">Processing Your Payment</h2>
          <p className="text-gray-400">Please don't close this window...</p>
        </div>
      </div>
    );
  }

  if (pageState === 'error') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-red-500/30 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-times text-red-400 text-2xl"></i>
          </div>
          <h2 className="font-playfair text-2xl font-bold text-white mb-2">Payment Failed</h2>
          <p className="text-gray-400 mb-6">{errorMessage || 'Something went wrong with your payment.'}</p>
          
          <button 
            onClick={() => {
              setPageState('checkout');
              setErrorMessage('');
            }}
            className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#c9a227] text-[#0a0a0a] rounded-lg font-bold hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Default: Show checkout page
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8 px-4">
      
      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <a href="/" className="hover:text-[#d4af37] transition-colors">Home</a>
          <i className="fas fa-chevron-right text-xs"></i>
          <a href="/cars" className="hover:text-[#d4af37] transition-colors">Cars</a>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-white">Checkout</span>
        </nav>

        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-2">
          Complete Your Booking
        </h1>
        <p className="text-gray-400">Review your reservation and enter payment details</p>
      </div>

      {/* Progress Steps */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-center gap-4 md:gap-8">
          {/* Step 1 */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">
              <i className="fas fa-check"></i>
            </div>
            <span className="text-sm font-medium text-green-400 hidden sm:inline">Select Car</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-green-500 max-w-[60px]"></div>
          
          {/* Step 2 */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">
              <i className="fas fa-check"></i>
            </div>
            <span className="text-sm font-medium text-green-400 hidden sm:inline">Review Details</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-[#d4af37] max-w-[60px]"></div>
          
          {/* Step 3 - Current */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center text-[#0a0a0a] text-sm font-bold animate-pulse">
              3
            </div>
            <span className="text-sm font-semibold text-[#d4af37] hidden sm:inline">Payment</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-gray-700 max-w-[60px]"></div>
          
          {/* Step 4 */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-sm font-bold">
              4
            </div>
            <span className="text-sm font-medium text-gray-500 hidden sm:inline">Confirm</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Column - Payment Form (3 cols) */}
        <div className="lg:col-span-3">
          <StripePaymentForm 
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        </div>

        {/* Right Column - Booking Summary (2 cols) */}
        <div className="lg:col-span-2">
          <BookingSummary bookingData={bookingData} />
          
          {/* Additional Info Card */}
          <div className="mt-6 bg-[rgba(31,31,31,0.5)] border border-gray-800 rounded-xl p-5">
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <i className="fas fa-shield-alt text-green-400"></i>
              Cancellation Policy
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-green-400 mt-1 text-xs"></i>
                Free cancellation up to 24 hours before pickup
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-info-circle text-blue-400 mt-1 text-xs"></i>
                50% refund for cancellations within 24 hours
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-times text-red-400 mt-1 text-xs"></i>
                No refund for no-shows
              </li>
            </ul>
          </div>

          {/* Support Contact */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 mb-2">Need assistance?</p>
            <a href="tel:+18001234567" className="text-sm text-[#d4af37] hover:text-[#f4e4bc] transition-colors">
              <i className="fas fa-phone mr-1"></i> 1-800-123-4567
            </a>
          </div>
        </div>

      </div>

      {/* Footer Note */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-800 text-center">
        <p className="text-xs text-gray-600">
          <i className="fas fa-lock mr-1 text-green-500"></i>
          Your payment is secured with 256-bit SSL encryption. We never store your full card number.
        </p>
      </div>

    </div>
  );
};

export default CheckoutPage;