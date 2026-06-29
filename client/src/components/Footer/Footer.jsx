import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaCar, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn,
  FaArrowRight, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope,
} from 'react-icons/fa';
import { staggerContainer, fadeUp } from '../animations/variants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const columns = [
    { title: 'Company',  links: ['About Us', 'Fleet Overview', 'Travel Stories', 'Careers', 'Press'] },
    { title: 'Support',  links: ['Help Center', 'Terms of Service', 'Privacy Policy', 'Contact', 'FAQ'] },
    { title: 'Resources', links: ['Blog', 'Owner Guide', 'Insurance', 'Safety', 'Mobile App'] },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-dark-200 to-black border-t border-white/5 overflow-hidden">
      {/* Top Accent Line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary-500/40 to-transparent"></div>

      {/* Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-10 py-20 relative z-10">
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="bg-gradient-to-br from-primary-400 to-primary-600 p-2.5 rounded-xl">
                <FaCar className="text-white text-base" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Veloce<span className="text-primary-500">Share</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              Redefining luxury mobility. We connect discerning drivers with trusted owners of the world's finest automobiles.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-white/50">
                <FaMapMarkerAlt className="text-primary-500 text-xs" />
                <span>1 Luxury Avenue, Beverly Hills, CA 90210</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <FaPhone className="text-primary-500 text-xs" />
                <span>+1 (800) 555-VELOCE</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <FaEnvelope className="text-primary-500 text-xs" />
                <span>hello@veloceshare.com</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-primary-500 hover:border-primary-500 transition-all duration-300 text-sm"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {columns.map((col) => (
            <motion.div key={col.title} variants={fadeUp}>
              <h4 className="text-[10px] font-bold mb-6 uppercase tracking-[0.3em] text-primary-500">
                {col.title}
              </h4>
              <ul className="space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-white/60 hover:text-primary-500 transition-colors inline-flex items-center gap-2 group font-medium"
                    >
                      <span className="w-0 group-hover:w-2 h-[1px] bg-primary-500 transition-all duration-300"></span>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 p-8 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.05] to-transparent backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
              Stay in the <span className="text-primary-500">Fast Lane</span>
            </h3>
            <p className="text-white/50 text-sm">
              Subscribe for exclusive offers, new arrivals, and luxury automotive insights.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white/5 border border-white/10 rounded-full text-white px-6 py-3.5 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all placeholder-white/30 text-sm min-w-[280px]"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold px-8 py-3.5 rounded-full hover:from-primary-600 hover:to-primary-500 transition-all uppercase tracking-[0.15em] text-xs shadow-lg shadow-primary-500/30 inline-flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              Subscribe
              <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-medium">
            © {currentYear} Veloce Share Inc. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link to="#" className="text-[11px] uppercase tracking-[0.15em] text-white/40 hover:text-primary-500 transition-colors font-medium">
              Privacy
            </Link>
            <Link to="#" className="text-[11px] uppercase tracking-[0.15em] text-white/40 hover:text-primary-500 transition-colors font-medium">
              Terms
            </Link>
            <Link to="#" className="text-[11px] uppercase tracking-[0.15em] text-white/40 hover:text-primary-500 transition-colors font-medium">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;