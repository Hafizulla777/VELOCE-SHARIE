export const easeOut = [0.22, 1, 0.36, 1];
export const easeInOut = [0.65, 0, 0.35, 1];

export const staggerContainer = (stagger = 0.1, delay = 0.2) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeOut } },
};

export const blurReveal = {
  hidden: { opacity: 0, filter: 'blur(20px)', y: 30 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 1, ease: easeOut } },
};