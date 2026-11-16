import { Fragment } from 'react';
import { motion } from 'framer-motion';

// Splits text into words that rise into view one after another.
export default function SplitText({ text, className = '', delay = 0, stagger = 0.06, as = 'span', animateOnMount = false }) {
  const Comp = motion[as] || motion.span;
  const words = text.split(' ');
  const trigger = animateOnMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.5 } };

  return (
    <Comp className={`split ${className}`} initial="hidden" {...trigger} transition={{ staggerChildren: stagger, delayChildren: delay }} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="split__mask" aria-hidden="true">
            <motion.span
              className="split__word"
              variants={{ hidden: { y: '115%', rotate: 6 }, show: { y: '0%', rotate: 0 } }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </Comp>
  );
}
