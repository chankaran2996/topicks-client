import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from 'framer-motion';

// Infinite marquee whose speed and direction react to scroll velocity.
export default function Marquee({ items, baseVelocity = -2, className = '' }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) dir.current = -1;
    else if (factor.get() > 0) dir.current = 1;
    move += dir.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  const row = [...items, ...items];

  return (
    <div className={`marquee ${className}`}>
      <motion.div className="marquee__track" style={{ x }}>
        {[0, 1].map((k) => (
          <div className="marquee__group" key={k} aria-hidden={k === 1}>
            {row.map((t, i) => (
              <span className="marquee__item" key={`${k}-${i}`}>
                {t}
                <svg viewBox="0 0 24 24" className="marquee__leaf" aria-hidden="true">
                  <path d="M12 2C6 6 4 12 6 18c2 3 6 4 6 4s4-1 6-4c2-6 0-12-6-16Z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
