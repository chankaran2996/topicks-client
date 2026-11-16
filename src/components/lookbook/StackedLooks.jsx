import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { LOOKS } from '../../data/content';
import { waLink } from '../../data/site';

function LookCard({ look, i, total, progress }) {
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.04]);
  const imgScale = useTransform(progress, [start, start + 1 / total], [1.25, 1]);

  return (
    <div className="look" style={{ top: `calc(12vh + ${i * 22}px)` }}>
      <motion.article className={`look__card look__card--${i % 3}`} style={{ scale }}>
        <div className="look__text">
          <span className="look__index">0{i + 1} / 0{total}</span>
          <span className="eyebrow">{look.season}</span>
          <h3>{look.title}</h3>
          <p>{look.copy}</p>
          <a className="btn btn--dark btn--sm" href={waLink(`Hi Topicks! I loved "${look.title}" from your lookbook. Can you share similar pieces?`)} target="_blank" rel="noreferrer">
            <FaWhatsapp /> Shop this look
          </a>
        </div>
        <div className="look__img">
          <motion.img src={look.image} alt={look.title} style={{ scale: imgScale }} loading="lazy" />
        </div>
      </motion.article>
    </div>
  );
}

// Cards pin and stack on top of each other as you scroll.
export default function StackedLooks() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <section className="looks" ref={ref}>
      {LOOKS.map((l, i) => (
        <LookCard key={l.title} look={l} i={i} total={LOOKS.length} progress={scrollYProgress} />
      ))}
    </section>
  );
}
