import { motion } from 'framer-motion';

const brands = [
  'PORSCHE', 'TESLA', 'BMW', 'MERCEDES-BENZ',
  'AUDI', 'LUCID', 'RIVIAN', 'FERRARI',
  'LAMBORGHINI', 'BENTLEY',
];

const BrandSlider = () => {
  return (
    <section className="py-16 border-y border-white/5 bg-gradient-to-b from-black to-dark-200 overflow-hidden">
      <div className="container mx-auto px-6 mb-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-xs font-semibold uppercase tracking-[0.4em] text-white/40"
        >
          Trusted by luxury brands worldwide
        </motion.p>
      </div>
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="mx-10 text-2xl md:text-4xl font-black text-white/15 hover:text-primary-500 transition-colors duration-500 cursor-default tracking-tight"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;