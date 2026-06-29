import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaMapMarkedAlt, FaExternalLinkAlt, FaCar, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Our Office',
      lines: [
        '1234 Luxury Avenue, Suite 500',
        'Los Angeles, CA 90001',
        'United States'
      ],
      color: 'text-red-400',
      bg: 'bg-red-500/10'
    },
    {
      icon: FaPhoneAlt,
      title: 'Call Us',
      lines: [
        '+1 (800) 123-4567 (Toll Free)',
        '+1 (310) 555-0123 (Local)',
        'Mon-Sun: 24/7 Available'
      ],
      color: 'text-green-400',
      bg: 'bg-green-500/10'
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      lines: [
        'hello@luxecars.com (General)',
        'support@luxecars.com (Support)',
        'partnerships@luxecars.com (Business)'
      ],
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    {
      icon: FaClock,
      title: 'Business Hours',
      lines: [
        'Monday - Friday: 9AM - 8PM',
        'Saturday: 10AM - 6PM',
        'Sunday: 11AM - 5PM'
      ],
      color: 'text-[#d4af37]',
      bg: 'bg-[#d4af37]/10'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {contactDetails.map((detail, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[rgba(212,175,55,0.15)] rounded-xl p-6 hover:border-[#d4af37] transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${detail.bg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <detail.icon className={`${detail.color} text-xl`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2 group-hover:text-[#d4af37] transition-colors">
                  {detail.title}
                </h3>
                {detail.lines.map((line, lineIndex) => (
                  <p key={lineIndex} className="text-sm text-gray-400 mb-1">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Google Map Embed */}
      <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[rgba(212,175,55,0.15)] rounded-xl overflow-hidden">
        
        {/* Map Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaMapMarkedAlt className="text-[#d4af37]" />
            <span className="font-semibold text-white">Our Location</span>
          </div>
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-[#d4af37] hover:text-[#f4e4bc] transition-colors flex items-center gap-1"
          >
            Open in Maps
            <FaExternalLinkAlt className="text-xs" />
          </a>
        </div>

        {/* Map Container */}
        <div className="relative h-[350px] overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.715575!2d-118.24532000000002!3d34.052234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos+Angeles%2C+CA!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="LUXE Cars Location"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          ></iframe>

          {/* Overlay Info Card */}
          <div className="absolute bottom-4 left-4 bg-[#0a0a0a]/90 backdrop-blur-sm border border-[rgba(212,175,55,0.3)] rounded-lg p-4 max-w-xs shadow-xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center flex-shrink-0">
                <FaCar className="text-[#0a0a0a]" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">LUXE Cars HQ</p>
                <p className="text-xs text-gray-400">1234 Luxury Ave, Los Angeles</p>
                <a 
                  href="https://maps.google.com/?q=Los+Angeles,+CA" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#d4af37] mt-1 inline-block hover:underline"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Social Media Links */}
      <div className="bg-gradient-to-r from-[rgba(212,175,55,0.1)] via-transparent to-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] rounded-xl p-6 text-center">
        <p className="text-white font-semibold mb-4">Follow Us on Social Media</p>
        <div className="flex justify-center gap-4">
          
          <a 
            href="#" 
            className="w-12 h-12 bg-[#141414] border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#0a0a0a] hover:border-[#d4af37] transition-all duration-300"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>

          <a 
            href="#" 
            className="w-12 h-12 bg-[#141414] border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#0a0a0a] hover:border-[#d4af37] transition-all duration-300"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>

          <a 
            href="#" 
            className="w-12 h-12 bg-[#141414] border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#0a0a0a] hover:border-[#d4af37] transition-all duration-300"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a 
            href="#" 
            className="w-12 h-12 bg-[#141414] border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#0a0a0a] hover:border-[#d4af37] transition-all duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>

          <a 
            href="#" 
            className="w-12 h-12 bg-[#141414] border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#0a0a0a] hover:border-[#d4af37] transition-all duration-300"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>

        </div>
      </div>

    </div>
  );
};

export default ContactInfo;