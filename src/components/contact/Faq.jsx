import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import { FAQS } from '../../data/content';

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq">
      <div className="container faq__wrap">
        <SectionHeading eyebrow="Good to know" title="Frequently" script="asked" />
        <div className="accordion">
          {FAQS.map((f, i) => (
            <div className={`accordion__item ${open === i ? 'is-open' : ''}`} key={f.q}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span className="accordion__num">Q{i + 1}</span>
                {f.q}
                <motion.span className="accordion__icon" animate={{ rotate: open === i ? 45 : 0 }}>+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                    <p>{f.a}</p>
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
