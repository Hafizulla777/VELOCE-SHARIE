// ============================================================================
// FILE: src/components/About/AboutHero.jsx
// PURPOSE: Hero section for about page - Company introduction
// ============================================================================

import React from 'react';

const AboutHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(212,175,55,0.1) 35px,
            rgba(212,175,55,0.1) 70px
          )`
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Small Label */}
        <p className="text-[#d4af37] text-sm font-semibold uppercase tracking-[0.3em] mb-4 animate-pulse">
          Our Story
        </p>

        {/* Main Heading */}
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Redefining{' '}
          <span className="gradient-gold">Luxury</span>
          {' '}Travel
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Since 2020, we've been crafting extraordinary automotive experiences 
          for those who demand nothing but the best.
        </p>

        {/* Decorative Line */}
        <div className="mt-8 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
        </div>

        {/* Stats Preview */}
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <p className="text-3xl font-bold text-[#d4af37]">500+</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Luxury Cars</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#d4af37]">10K+</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Happy Clients</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#d4af37]">50+</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Cities</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="fas fa-chevron-down text-[#d4af37] text-2xl"></i>
      </div>
    </section>
  );
};

export default AboutHero;