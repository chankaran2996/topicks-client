import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { STATS } from '../../data/content';

function Counter({ value, suffix, decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, value, { duration: 2.2, ease: [0.22, 1, 0.36, 1], onUpdate: setDisplay });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {decimals ? display.toFixed(decimals) : Math.round(display).toLocaleString('en-IN')}
      <sup>{suffix}</sup>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="stats">
      <div className="container stats__grid">
        {STATS.map((s) => (
          <div className="stats__item" key={s.label}>
            <Counter {...s} />
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
