import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion.create(Link);

// A button/link that is gently pulled toward the mouse pointer.
export default function MagneticButton({ as = 'button', strength = 0.35, children, className = '', ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 15, mass: 0.4 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = as === 'link' ? MotionLink : as === 'a' ? motion.a : motion.button;

  return (
    <Comp
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.94 }}
      {...rest}
    >
      <span className="magnetic__inner">{children}</span>
    </Comp>
  );
}
