import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, fadeUp } from '../animations/variants';
import { useCountUp } from '../../hooks/useCountUp';

const stats = [
  { suffix: 'K+', value: 10,  label: 'Luxury Customers' },
  { suffix: 'K+', value: 2.5, label: 'Premium Cars', decimals: 1 },
  { suffix: 'K+', value: 5,   label: 'Trusted Owners' },
  { suffix: '%', value: 98,   label: 'Customer Satisfaction' },
];

const StatItem = ({ stat, start }) => {
  const multiplier = stat.decimals ? 10 : 1;
  const count = useCountUp(stat.value * multiplier, 2000, start);
  const display = stat.decimals ? (count / multiplier).toFixed(1) : count;

  return (
    <motion.div
      variants={fadeUp}
      className="relative p-8 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-md hover:border-primary-500/30 transition-all duration-500 group overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <h3 className="relative text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent mb-3">
        {display}
        <span className="text-primary-500">{stat.suffix}</span>
      </h3>
      <p className="relative text-xs uppercase tracking-[0.25em] text-white/50 font-semibold">{stat.label}</p>
    </motion.div>
  );
};

const Stats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-32 bg-dark-200 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/5 rounded-full blur-[120px]"></div>
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} start={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;