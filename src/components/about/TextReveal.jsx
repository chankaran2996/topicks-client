import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TEXT =
  'We started Topicks because shopping for yourself should feel joyful, not overwhelming. So we do the searching — through fabrics, fits and fresh trends — and bring only the best to our rails. What you find here is not just stock. It is our top picks, for you.';

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const color = useTransform(progress, range, ['#1a1a1a', '#E3121B']);
  return (
    <span className="reveal-text__word">
      <motion.span style={{ opacity, color: children.startsWith('Topicks') || children.startsWith('top') || children.startsWith('picks') ? color : undefined }}>
        {children}
      </motion.span>{' '}
    </span>
  );
}

// Each word lights up in sequence as the paragraph scrolls through the viewport.
export default function TextReveal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] });
  const words = TEXT.split(' ');
  return (
    <section className="section reveal-text" ref={ref}>
      <div className="container">
        <p>
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}
