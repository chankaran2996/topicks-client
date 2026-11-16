import { motion } from 'framer-motion';

const variants = {
  up: { hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -70 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 70 }, show: { opacity: 1, x: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
};

// Scroll-triggered entrance animation wrapper.
export default function Reveal({ children, from = 'up', delay = 0, duration = 0.9, className = '', as = 'div', amount = 0.25 }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      variants={variants[from]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}
