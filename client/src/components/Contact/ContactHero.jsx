import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactHero = () => {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
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
        <p className="text-[#d4af37] text-sm font-semibold uppercase tracking-[0.3em] mb-4 animate-pulse">
          Get In Touch
        </p>

        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          We'd Love to{' '}
          <span className="gradient-gold">Hear</span>
          {' '}From You
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
          Have a question or want to make a reservation? 
          Our team is here to help you 24/7.
        </p>

        {/* Quick Contact Info */}
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#d4af37]/10 rounded-full flex items-center justify-center">
              <FaPhone className="text-[#d4af37]" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Call Us</p>
              <p className="text-white font-semibold">+1 (800) 123-4567</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#d4af37]/10 rounded-full flex items-center justify-center">
              <FaEnvelope className="text-[#d4af37]" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Email Us</p>
              <p className="text-white font-semibold">hello@luxecars.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#d4af37]/10 rounded-full flex items-center justify-center">
              <FaMapMarkerAlt className="text-[#d4af37]" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Visit Us</p>
              <p className="text-white font-semibold">Los Angeles, CA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;