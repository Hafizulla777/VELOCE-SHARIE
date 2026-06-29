// ============================================================================
// FILE: src/pages/AboutPage.jsx
// PURPOSE: Main About page - Combines all about sections
// ============================================================================

import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import AboutHero from '../components/About/AboutHero';
import CompanyStory from '../components/About/CompanyStory';
import TeamSection from '../components/About/TeamSection';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <AboutHero />
        
        {/* Company Story & Values */}
        <CompanyStory />
        
        {/* Team Section */}
        <TeamSection />
        
        {/* Additional Stats Section (Optional) */}
        <section className="py-16 px-4 bg-[#0a0a0a] border-t border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              
              <div>
                <p className="text-4xl font-bold text-[#d4af37] mb-2">500+</p>
                <p className="text-gray-400 text-sm uppercase tracking-wider">Premium Vehicles</p>
              </div>
              
              <div>
                <p className="text-4xl font-bold text-[#d4af37] mb-2">10,000+</p>
                <p className="text-gray-400 text-sm uppercase tracking-wider">Happy Customers</p>
              </div>
              
              <div>
                <p className="text-4xl font-bold text-[#d4af37] mb-2">50+</p>
                <p className="text-gray-400 text-sm uppercase tracking-wider">Cities Worldwide</p>
              </div>
              
              <div>
                <p className="text-4xl font-bold text-[#d4af37] mb-2">4.9★</p>
                <p className="text-gray-400 text-sm uppercase tracking-wider">Average Rating</p>
              </div>

            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default AboutPage;