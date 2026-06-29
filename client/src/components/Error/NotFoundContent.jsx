// ============================================================================
// FILE: src/components/Error/NotFoundContent.jsx
// PURPOSE: 404 page content - Message, search, and navigation buttons
// ============================================================================

import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCar, FaHeadset, FaSearch } from 'react-icons/fa';

const NotFoundContent = () => {
  return (
    <div className="max-w-2xl mx-auto text-center px-4 pb-16">
      
      {/* Error Message */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
          Oops! Looks Like You're Lost
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Don't worry, even the best drivers take a wrong turn sometimes.
        </p>
      </div>

      {/* Helpful Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        {/* Suggestion 1: Go Home */}
        <div className="glass-card rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-300 group">
          <div className="w-14 h-14 bg-primary-500/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500/20 transition-colors">
            <FaHome className="text-primary-500 text-2xl" />
          </div>
          <h3 className="font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
            Back to Home
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Return to our homepage and start fresh
          </p>
          <Link 
            to="/" 
            className="inline-block w-full py-2.5 px-4 btn-primary rounded-xl font-bold text-sm uppercase tracking-[0.15em] hover:-translate-y-0.5"
          >
            Go Home
          </Link>
        </div>

        {/* Suggestion 2: Browse Cars */}
        <div className="glass-card rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-300 group">
          <div className="w-14 h-14 bg-primary-500/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500/20 transition-colors">
            <FaCar className="text-primary-500 text-2xl" />
          </div>
          <h3 className="font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
            Browse Fleet
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Explore our collection of luxury vehicles
          </p>
          <Link 
            to="/cars" 
            className="inline-block w-full py-2.5 px-4 bg-dark-100 border border-white/10 text-white rounded-xl font-semibold text-sm hover:bg-dark-50 hover:border-primary-500 transition-all duration-300"
          >
            View Cars
          </Link>
        </div>

        {/* Suggestion 3: Contact Support */}
        <div className="glass-card rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-300 group">
          <div className="w-14 h-14 bg-primary-500/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500/20 transition-colors">
            <FaHeadset className="text-primary-500 text-2xl" />
          </div>
          <h3 className="font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
            Need Help?
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Contact our support team for assistance
          </p>
          <Link 
            to="/contact" 
            className="inline-block w-full py-2.5 px-4 bg-dark-100 border border-white/10 text-white rounded-xl font-semibold text-sm hover:bg-dark-50 hover:border-primary-500 transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>

      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-3">Or try searching for what you need:</p>
        <div className="relative max-w-md mx-auto">
          <input 
            type="text" 
            placeholder="Search for cars, services..."
            className="w-full input-field pl-12 pr-4 !rounded-xl"
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Popular Links */}
      <div className="pt-8 border-t border-white/5">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Popular Pages</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
            Home
          </Link>
          <span className="text-dark-300">•</span>
          <Link to="/cars" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
            Our Fleet
          </Link>
          <span className="text-dark-300">•</span>
          <Link to="/about" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
            About Us
          </Link>
          <span className="text-dark-300">•</span>
          <Link to="/contact" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
            Contact
          </Link>
          <span className="text-dark-300">•</span>
          <Link to="/login" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
            Login
          </Link>
        </div>
      </div>

    </div>
  );
};

export default NotFoundContent;