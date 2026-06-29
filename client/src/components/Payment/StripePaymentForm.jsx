// ============================================================================
// FILE: src/components/Payment/StripePaymentForm.jsx
// PURPOSE: Stripe payment integration UI with card input fields
// ============================================================================

import React, { useState } from 'react';

const StripePaymentForm = ({ onPaymentSuccess, onPaymentError }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces (every 4 digits)
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } 
    // Format expiry date as MM/YY
    else if (name === 'expiryDate') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length >= 2) {
        setFormData(prev => ({ ...prev, [name]: `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}` }));
      } else {
        setFormData(prev => ({ ...prev, [name]: cleaned }));
      }
    }
    // CVV - only numbers, max 4 digits
    else if (name === 'cvv') {
      setFormData(prev => ({ ...prev, [name]: value.replace(/\D/g, '').slice(0, 4) }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    if (!formData.expiryDate || formData.expiryDate.length < 5) {
      newErrors.expiryDate = 'Invalid expiry date';
    }
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'Invalid CVV';
    }
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simulate Stripe API call (replace with actual Stripe integration)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate success (90% chance of success for demo)
      if (Math.random() > 0.1) {
        if (onPaymentSuccess) {
          onPaymentSuccess({
            transactionId: `txn_${Date.now()}`,
            last4: formData.cardNumber.replace(/\s/g, '').slice(-4),
            amount: 2720 // This would come from booking data
          });
        }
      } else {
        throw new Error('Payment declined');
      }
    } catch (error) {
      console.error('Payment error:', error);
      if (onPaymentError) {
        onPaymentError(error.message);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[rgba(212,175,55,0.15)] rounded-xl p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          {/* Stripe-style branding */}
          <div className="flex gap-1">
            <div className="w-8 h-5 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 rounded"></div>
          </div>
          <h3 className="font-playfair text-xl font-semibold text-white">Payment Details</h3>
        </div>
        <p className="text-sm text-gray-400">Secure payment powered by Stripe</p>
        
        {/* Security badge */}
        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
          <i className="fas fa-lock text-green-500"></i>
          <span>Your payment information is encrypted and secure</span>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Card Number */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={`w-full bg-[#0a0a0a] border ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-700'
              } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors font-mono tracking-wider`}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
              <i className="fab fa-cc-visa text-blue-400 text-lg"></i>
              <i className="fab fa-cc-mastercard text-orange-400 text-lg"></i>
              <i className="fab fa-cc-amex text-blue-300 text-lg"></i>
            </div>
          </div>
          {errors.cardNumber && (
            <p className="text-red-400 text-xs mt-1">{errors.cardNumber}</p>
          )}
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            placeholder="John Doe"
            className={`w-full bg-[#0a0a0a] border ${
              errors.cardName ? 'border-red-500' : 'border-gray-700'
            } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors`}
          />
          {errors.cardName && (
            <p className="text-red-400 text-xs mt-1">{errors.cardName}</p>
          )}
        </div>

        {/* Expiry & CVV Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Expiry Date */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength={5}
              className={`w-full bg-[#0a0a0a] border ${
                errors.expiryDate ? 'border-red-500' : 'border-gray-700'
              } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors font-mono`}
            />
            {errors.expiryDate && (
              <p className="text-red-400 text-xs mt-1">{errors.expiryDate}</p>
            )}
          </div>

          {/* CVV */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              CVV / CVC
            </label>
            <div className="relative">
              <input
                type="password"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="•••"
                maxLength={4}
                className={`w-full bg-[#0a0a0a] border ${
                  errors.cvv ? 'border-red-500' : 'border-gray-700'
                } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors font-mono`}
              />
              <i className="fas fa-question-circle absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-help" title="3 or 4 digit security code on your card"></i>
            </div>
            {errors.cvv && (
              <p className="text-red-400 text-xs mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>

        {/* Pay Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-4 rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
            isProcessing
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#d4af37] to-[#c9a227] text-[#0a0a0a] hover:shadow-[0_12px_32px_rgba(212,175,55,0.4)] hover:-translate-y-0.5'
          }`}
        >
          {isProcessing ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Processing...
            </>
          ) : (
            <>
              <i className="fas fa-lock"></i>
              Pay Securely
            </>
          )}
        </button>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 pt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <i className="fas fa-shield-alt text-green-500"></i> SSL Secured
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-check-circle text-green-500"></i> PCI Compliant
          </span>
        </div>
      </form>
    </div>
  );
};

export default StripePaymentForm;