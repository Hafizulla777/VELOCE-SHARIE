import { motion } from 'framer-motion';
import { FaCar, FaUserShield, FaCalendarAlt, FaMagic } from 'react-icons/fa';
import { staggerContainer, fadeUp, scaleUp } from '../animations/variants';

const features = [
  {
    icon: <FaCar />,
    title: 'Exotic Luxury Cars',
    desc: "Access an exclusive collection of the world's most prestigious automobiles, meticulously maintained for peak performance.",
  },
  {
    icon: <FaUserShield />,
    title: 'Trusted Owners',
    desc: 'Connect with verified, top-rated owners. Every vehicle is inspected and insured for complete peace of mind.',
  },
  {
    icon: <FaCalendarAlt />,
    title: 'Flexible Rentals',
    desc: 'Book by the hour, day, or week. Tailored packages designed to fit seamlessly into your lifestyle and schedule.',
  },
  {
    icon: <FaMagic />,
    title: 'Seamless Experience',
    desc: 'From booking to handover, our platform delivers a frictionless experience with concierge-level support.',
  },
];

const WhyChoose = () => {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block text-primary-500 text-sm font-bold uppercase tracking-[0.3em] mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            The Veloce{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
              Advantage
            </span>
          </h2>
          <p className="text-white/50 text-lg mt-6">
            We redefine luxury mobility with uncompromising standards and exceptional service.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={scaleUp}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-md hover:border-primary-500/40 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 border border-primary-500/30 text-primary-500 flex items-center justify-center text-xl mb-6 group-hover:from-primary-500 group-hover:to-primary-600 group-hover:text-white transition-all duration-500"
              >
                {feature.icon}
              </motion.div>

              <h3 className="relative text-xl font-bold text-white mb-3 tracking-wide">{feature.title}</h3>
              <p className="relative text-white/50 leading-relaxed text-sm">{feature.desc}</p>

              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-primary-500 to-primary-400 group-hover:w-full transition-all duration-500"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;