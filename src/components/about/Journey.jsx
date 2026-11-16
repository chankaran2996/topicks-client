import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';

const STEPS = [
  { t: 'Scouting', c: 'We travel to weaving clusters and trusted suppliers looking for fabrics, prints and craft worth bringing home.' },
  { t: 'Handpicking', c: 'Only a fraction of what we see makes it. Every piece is checked for finish, fall and real-life wearability.' },
  { t: 'Styling', c: 'We plan looks, pair dupattas and blouses, and build edits for festivals, office and everyday.' },
  { t: 'Your moment', c: 'You walk in, try on, twirl — and leave with something that feels like it was made for you.' },
];

// A vertical timeline whose line draws itself as you scroll.
export default function Journey() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section className="section journey" ref={ref}>
      <div className="container">
        <SectionHeading eyebrow="From loom to you" title="The journey of a" script="Topicks piece" />
        <div className="journey__list">
          <div className="journey__line"><motion.span style={{ scaleY }} /></div>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.t}
              className={`journey__item ${i % 2 ? 'journey__item--right' : ''}`}
              initial={{ opacity: 0, x: i % 2 ? 80 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="journey__dot" />
              <div className="journey__card">
                <span className="journey__n">Step 0{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.c}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
