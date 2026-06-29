// ============================================================================
// FILE: src/components/About/CompanyStory.jsx
// PURPOSE: Company history, mission, and values section
// ============================================================================

import React from 'react';
// 1. Importing exact SVG components allows for Webpack tree-shaking (optimal bundle size)
import { FaGem, FaHandshake, FaShieldAlt } from 'react-icons/fa';

// 2. Extracted Sub-Component to eliminate DRY violations in the Values Grid
const ValueCard = ({ icon: Icon, title, description }) => (
  <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[rgba(212,175,55,0.15)] rounded-xl p-8 hover:border-[#d4af37] transition-all duration-300 group">
    <div className="w-16 h-16 bg-[#d4af37]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#d4af37]/20 transition-colors">
      {/* 3. React Icons are used as standard React components */}
      <Icon className="text-[#d4af37] text-2xl" />
    </div>
    <h3 className="font-playfair text-2xl font-bold text-white mb-3">
      {title}
    </h3>
    <p className="text-gray-400 text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

const CompanyStory = () => {
  // 4. Data-driven rendering: If you need to add/remove a value later, 
  // you only change this array, not the JSX structure.
  const coreValues = [
    {
      icon: FaGem,
      title: "Uncompromising Quality",
      description: "Every vehicle in our fleet undergoes rigorous inspection and maintenance to ensure peak performance and pristine condition for every rental."
    },
    {
      icon: FaHandshake,
      title: "Personalized Service",
      description: "From concierge pickup to 24/7 roadside assistance, our dedicated team ensures your experience is seamless from start to finish."
    },
    {
      icon: FaShieldAlt,
      title: "Trust & Transparency",
      description: "No hidden fees, no surprises. We believe in honest pricing and clear communication, building lasting relationships with our valued clients."
    }
  ];

  return (
    <section className="py-20 px-4 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#d4af37] text-sm font-semibold uppercase tracking-[0.3em] mb-3">
            Who We Are
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            More Than Just Car Rental
          </h2>
          <div className="w-20 h-1 bg-[#d4af37] mx-auto"></div>
        </div>

        {/* Main Story Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Left - Image */}
          <div className="relative group">
            <div className="overflow-hidden rounded-xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1562145578-2f2329aef814?w=800&h=600&fit=crop" 
                alt="Luxury car showroom"
                className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[#d4af37] to-[#c9a227] text-[#0a0a0a] p-6 rounded-xl shadow-xl">
              <p className="text-4xl font-bold">4+</p>
              <p className="text-sm font-semibold">Years of Excellence</p>
            </div>
          </div>

          {/* Right - Text Content */}
          <div className="space-y-6">
            <h3 className="font-playfair text-3xl font-bold text-white">
              Born From a Passion for{' '}
              <span className="text-[#d4af37]">Perfection</span>
            </h3>
            
            <p className="text-gray-400 leading-relaxed">
              LUXE Cars was founded in 2020 by a team of automotive enthusiasts 
              who believed that renting a luxury car should be an experience, not just a transaction. 
              We set out to create a platform that matches discerning clients with 
              the world's most extraordinary vehicles.
            </p>

            <p className="text-gray-400 leading-relaxed">
              Today, we operate in over 50 cities worldwide, offering a curated fleet of 
              more than 500 premium vehicles ranging from exotic sports cars to elegant sedans. 
              Every car in our collection is meticulously maintained to ensure your journey 
              is nothing short of exceptional.
            </p>

            {/* Mission Statement */}
            <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] border-l-4 border-[#d4af37] p-6 rounded-r-lg mt-8">
              <p className="text-lg font-playfair text-white italic">
                "Our mission is simple: To make luxury accessible, 
                service impeccable, and every journey unforgettable."
              </p>
              <p className="text-[#d4af37] text-sm font-semibold mt-3">
                — Alexander Mitchell, Founder & CEO
              </p>
            </div>
          </div>
        </div>

        {/* Values Grid - Rendered dynamically */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CompanyStory;