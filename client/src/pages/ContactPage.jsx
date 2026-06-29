// ============================================================================
// FILE: src/pages/ContactPage.jsx
// PURPOSE: Main Contact page - Combines all contact sections
// ============================================================================

import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ContactHero from '../components/Contact/ContactHero';
import ContactForm from '../components/Contact/ContactForm';
import ContactInfo from '../components/Contact/ContactInfo';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <ContactHero />
        
        {/* Main Content Grid - Form + Info */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Left Column - Contact Form */}
              <div>
                <ContactForm />
              </div>

              {/* Right Column - Contact Info & Map */}
              <div>
                <ContactInfo />
              </div>

            </div>
          </div>
        </section>

        {/* FAQ Section (Optional) */}
        <section className="py-16 px-4 bg-[#0a0a0a] border-t border-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 text-left">
              
              {/* FAQ 1 */}
              <details className="group bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[rgba(212,175,55,0.15)] rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-[rgba(212,175,55,0.05)] transition-colors">
                  <span className="font-semibold text-white pr-4">How do I make a reservation?</span>
                  <i className="fas fa-chevron-down text-[#d4af37] transform group-open:rotate-180 transition-transform"></i>
                </summary>
                <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">
                  Making a reservation is easy! Simply browse our fleet, select your desired car, 
                  choose your dates, and complete the booking process. You'll receive a confirmation 
                  email within minutes. You can also call us at +1 (800) 123-4567 for assistance.
                </div>
              </details>

              {/* FAQ 2 */}
              <details className="group bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[rgba(212,175,55,0.15)] rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-[rgba(212,175,55,0.05)] transition-colors">
                  <span className="font-semibold text-white pr-4">What's included in the rental price?</span>
                  <i className="fas fa-chevron-down text-[#d4af37] transform group-open:rotate-180 transition-transform"></i>
                </summary>
                <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">
                  Our rental prices include unlimited mileage, basic insurance coverage, 
                  24/7 roadside assistance, and a GPS navigation system. Premium insurance options 
                  and additional services are available for an extra fee.
                </div>
              </details>

              {/* FAQ 3 */}
              <details className="group bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[rgba(212,175,55,0.15)] rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-[rgba(212,175,55,0.05)] transition-colors">
                  <span className="font-semibold text-white pr-4">What's your cancellation policy?</span>
                  <i className="fas fa-chevron-down text-[#d4af37] transform group-open:rotate-180 transition-transform"></i>
                </summary>
                <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">
                  We offer free cancellation up to 24 hours before your pickup time. 
                  Cancellations made within 24 hours are subject to a 50% fee of the total amount. 
                  No-shows are non-refundable.
                </div>
              </details>

              {/* FAQ 4 */}
              <details className="group bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[rgba(212,175,55,0.15)] rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-[rgba(212,175,55,0.05)] transition-colors">
                  <span className="font-semibold text-white pr-4">Do I need a special license?</span>
                  <i className="fas fa-chevron-down text-[#d4af37] transform group-open:rotate-180 transition-transform"></i>
                </summary>
                <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">
                  A valid driver's license is required for all rentals. For exotic and luxury vehicles, 
                  you must be at least 25 years old with a clean driving record. International visitors 
                  may use their home country license along with a passport.
                </div>
              </details>

            </div>

          </div>
        </section>

      </main>

     
    </div>
  );
};

export default ContactPage;