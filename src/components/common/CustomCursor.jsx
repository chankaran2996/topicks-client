import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Two-layer cursor: a precise dot plus a springy ring that grows over interactive elements.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState('');
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    setEnabled(fine);
    if (!fine) return undefined;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target.closest?.('a, button, [data-cursor], input, textarea, select');
      setHovering(Boolean(target));
      setLabel(target?.getAttribute?.('data-cursor') || '');
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 86 : hovering ? 56 : 34;

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} animate={{ scale: pressed ? 0.5 : hovering ? 0 : 1 }} />
      <motion.div
        className={`cursor-ring ${label ? 'cursor-ring--label' : ''}`}
        style={{ x: ringX, y: ringY }}
        animate={{ width: size, height: size, scale: pressed ? 0.85 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {label && <span>{label}</span>}
      </motion.div>
    </>
  );
}
