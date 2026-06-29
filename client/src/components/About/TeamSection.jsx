// ============================================================================
// FILE: src/components/About/TeamSection.jsx
// PURPOSE: Team members showcase with Veloce Share Orange Theme
// ============================================================================

import React from 'react';
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Alexander Mitchell',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
      bio: 'Visionary leader with 15+ years in luxury automotive industry',
      socials: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Sarah Chen',
      role: 'Chief Operations Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      bio: 'Operations expert ensuring seamless customer experiences worldwide',
      socials: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Marcus Williams',
      role: 'Head of Fleet Management',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bio: 'Automotive specialist curating our exclusive vehicle collection',
      socials: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Elena Rodriguez',
      role: 'Customer Experience Director',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
      bio: 'Dedicated to making every client feel like a VIP',
      socials: { linkedin: '#', twitter: '#' }
    }
  ];

  return (
    <section className="py-20 px-4 bg-dark-DEFAULT relative overflow-hidden">
      
      {/* Background Glow Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary-500 text-sm font-semibold uppercase tracking-[0.3em] mb-3">
            The Team
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4 tracking-tight">
            Meet The Visionaries
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Behind every exceptional experience is an extraordinary team dedicated to exceeding your expectations.
          </p>
          <div className="w-20 h-1 bg-primary-500 mx-auto mt-6"></div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-dark-100 to-dark-200 border border-white/[0.06] rounded-2xl overflow-hidden hover:border-primary-500/30 transition-all duration-500"
            >
              
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-DEFAULT/90 via-dark-DEFAULT/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                  
                  {/* Social Links */}
                  <div className="flex gap-4 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    <a 
                      href={member.socials.linkedin} 
                      className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center text-white hover:bg-primary-500 transition-colors"
                    >
                      <FaLinkedinIn />
                    </a>
                    <a 
                      href={member.socials.twitter} 
                      className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-dark-DEFAULT transition-colors"
                    >
                      <FaTwitter />
                    </a>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-primary-400 text-sm font-bold uppercase tracking-wider mb-3">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>

            </div>
          ))}

        </div>

        {/* Join CTA */}
        <div className="mt-16 text-center glass-card rounded-2xl p-12">
          <h3 className="text-3xl font-display font-black text-white mb-4">
            Want to Join Our Team?
          </h3>
          <p className="text-gray-400 max-w-xl mx-auto mb-6 leading-relaxed">
            We're always looking for passionate individuals who share our vision of excellence. 
            Check out our open positions and become part of the Veloce Share family.
          </p>
          <a 
            href="/careers" 
            className="inline-block btn-primary px-10 py-3.5 rounded-xl text-sm font-bold uppercase tracking-[0.15em] hover:-translate-y-0.5"
          >
            View Open Positions
          </a>
        </div>

      </div>
    </section>
  );
};

export default TeamSection;