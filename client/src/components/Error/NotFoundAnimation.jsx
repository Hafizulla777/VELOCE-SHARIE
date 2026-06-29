// ============================================================================
// FILE: src/components/Error/NotFoundAnimation.jsx
// PURPOSE: Animated 404 visual effect - Floating particles & glitch effect
// ============================================================================

import React, { useEffect, useState } from 'react';

const NotFoundAnimation = () => {
  const [particles, setParticles] = useState([]);

  // Generate random floating particles on mount
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.1
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      ></div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Main 404 Text */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          
          {/* Large 404 Number */}
          <h1 
            className="font-playfair text-[180px] md:text-[240px] font-bold leading-none select-none"
            style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 25%, #d4af37 50%, #8b7355 75%, #d4af37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 60px rgba(212,175,55,0.3)',
              animation: 'glow 3s ease-in-out infinite alternate'
            }}
          >
            404
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg mt-[-40px] tracking-widest uppercase">
            Page Not Found
          </p>

        </div>
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-[#d4af37]"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`
          }}
        ></div>
      ))}

      {/* CSS for animations */}
      <style>{`
        @keyframes glow {
          from {
            filter: drop-shadow(0 0 20px rgba(212,175,55,0.4));
            transform: scale(1);
          }
          to {
            filter: drop-shadow(0 0 40px rgba(212,175,55,0.6));
            transform: scale(1.02);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-30px) translateX(15px);
          }
          50% {
            transform: translateY(-15px) translateX(-10px);
          }
          75% {
            transform: translateY(-35px) translateX(5px);
          }
        }
      `}</style>

    </div>
  );
};

export default NotFoundAnimation;