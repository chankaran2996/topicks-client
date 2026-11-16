import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import { TESTIMONIALS } from '../../data/content';

export default function Testimonials() {
  const [[index, dir], setState] = useState([0, 1]);
  const [paused, setPaused] = useState(false);
  const n = TESTIMONIALS.length;

  const go = (d) => setState(([i]) => [(i + d + n) % n, d]);

  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => go(1), 5500);
    return () => clearInterval(t);
  }, [paused]);

  const t = TESTIMONIALS[index];

  return (
    <section className="section testimonials" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container">
        <SectionHeading eyebrow="Kind words" title="Loved by" script="our women" />
        <div className="testimonials__stage">
          <span className="testimonials__quote" aria-hidden="true">“</span>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={index}
              custom={dir}
              className="testimonials__card"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1);
                else if (info.offset.x > 80) go(-1);
              }}
              initial={{ opacity: 0, x: dir * 120, rotate: dir * 4 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: dir * -120, rotate: dir * -4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              data-cursor="Drag"
            >
              <div className="stars">★★★★★</div>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <span className="avatar">{t.name[0]}</span>
                <span>
                  <b>{t.name}</b>
                  <small>{t.place}</small>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <div className="testimonials__nav">
            <button onClick={() => go(-1)} aria-label="Previous">←</button>
            <div className="dots">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} className={i === index ? 'is-active' : ''} onClick={() => setState([i, i > index ? 1 : -1])} aria-label={`Review ${i + 1}`} />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
