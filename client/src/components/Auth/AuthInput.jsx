import { motion } from 'framer-motion';

const AuthInput = ({ icon, type, placeholder, value, onChange, name, required }) => {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary-500 transition-colors z-10">
        {icon}
      </div>
      <motion.input
        whileFocus={{ scale: 1.01 }}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="input-field pl-12 py-4 text-base"
      />
      {/* Focus Glow Border */}
      <div className="absolute inset-0 rounded-xl border border-transparent group-focus-within:border-primary-500/30 pointer-events-none transition-all duration-300"></div>
    </div>
  );
};

export default AuthInput;