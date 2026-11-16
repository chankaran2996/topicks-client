import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { OCCASIONS } from '../../data/content';

// Vertical scroll drives a horizontal ride through occasion edits.
export default function OccasionScroller() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (el) setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 48));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref });
  const distRef = useRef(0);
  distRef.current = distance;
  const raw = useTransform(scrollYProgress, (v) => -distRef.current * Math.min(1, Math.max(0, (v - 0.05) / 0.9)));
  const x = useSpring(raw, { stiffness: 90, damping: 25 });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="occasions" ref={ref}>
      <div className="occasions__sticky">
        <div className="container occasions__head">
          <span className="eyebrow eyebrow--light">Dress for the moment</span>
          <h2>
            An outfit for <em className="script">every occasion</em>
          </h2>
        </div>
        <motion.div className="occasions__track" style={{ x }} ref={trackRef}>
          <div className="occasions__intro">
            <p>Pooja mornings, Monday meetings, Sunday brunches and Saturday nights — scroll to see how Topicks dresses each one.</p>
            <span className="occasions__arrow">→</span>
          </div>
          {OCCASIONS.map((o, i) => (
            <article className="occasion" key={o.title}>
              <div className="occasion__img">
                <img src={o.image} alt={o.title} loading="lazy" />
              </div>
              <div className="occasion__body">
                <span>0{i + 1}</span>
                <h3>{o.title}</h3>
                <p>{o.copy}</p>
              </div>
            </article>
          ))}
        </motion.div>
        <div className="container">
          <div className="occasions__progress">
            <motion.span style={{ scaleX: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}
