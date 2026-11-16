import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';

const TIPS = [
  { t: 'Drape like a pro', c: 'Pin pleats at the shoulder before you tuck — a silk saree falls better when the pallu is set first. Pair with a contrast blouse for a modern twist.' },
  { t: 'One hero piece', c: 'Let one element do the talking. A statement dupatta? Keep the kurti solid. Bold earrings? Skip the necklace.' },
  { t: 'Red is a neutral', c: 'Our signature red pairs with gold, ivory, emerald and even denim. When in doubt, wear red — it photographs beautifully.' },
  { t: 'Office to evening', c: 'Swap flats for block heels, add a metallic clutch and open one more button. Your shirt dress just went to dinner.' },
  { t: 'Layer with linen', c: 'Bengaluru weather changes by the hour — a light linen overshirt over a slip dress keeps you ready for both.' },
];

export default function StyleTips() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section tips">
      <div className="container tips__grid">
        <SectionHeading align="left" eyebrow="From our stylists" title="Little secrets," script="big impact" copy="Simple tips our in-store team shares every day. Ask them anything when you visit!" />
        <div className="accordion">
          {TIPS.map((tip, i) => (
            <div className={`accordion__item ${open === i ? 'is-open' : ''}`} key={tip.t}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span className="accordion__num">0{i + 1}</span>
                {tip.t}
                <motion.span className="accordion__icon" animate={{ rotate: open === i ? 45 : 0 }}>+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                    <p>{tip.c}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
