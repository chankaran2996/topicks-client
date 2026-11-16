import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import logoIcon from '../../assets/logo-icon.png';

const PARTS = [
  { key: 'figure', title: 'The dancing woman', copy: 'Arms raised, mid-twirl — she is free, joyful and unapologetically herself. That is how we want every customer to feel.', color: '#E3121B', pos: { top: '48%', left: '62%' } },
  { key: 'leaves', title: 'Five fresh leaves', copy: 'Growth, freshness and nature. New arrivals bloom on our rails every week, just like leaves in spring.', color: '#0B6B1F', pos: { top: '20%', left: '30%' } },
  { key: 'k', title: 'The hidden “K”', copy: 'Her pose forms the K of Topicks — the brand and the woman are one and the same.', color: '#1a1a1a', pos: { top: '72%', left: '52%' } },
];

export default function LogoMeaning() {
  const [active, setActive] = useState(0);
  return (
    <section className="section meaning">
      <div className="container meaning__grid">
        <motion.div className="meaning__logo" initial={{ opacity: 0, scale: 0.7, rotate: -20 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
          <motion.div className="meaning__ring" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 30, ease: 'linear' }} />
          <img src={logoIcon} alt="Topicks logo mark" />
          {PARTS.map((p, i) => (
            <button key={p.key} className={`hotspot ${active === i ? 'is-active' : ''}`} style={{ ...p.pos, '--c': p.color }} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} aria-label={p.title}>
              <span />
            </button>
          ))}
        </motion.div>
        <div>
          <SectionHeading align="left" eyebrow="Behind the mark" title="What our logo" script="means" />
          <div className="meaning__list">
            {PARTS.map((p, i) => (
              <motion.div key={p.key} className={`meaning__item ${active === i ? 'is-active' : ''}`} onMouseEnter={() => setActive(i)} animate={{ x: active === i ? 16 : 0 }} style={{ '--c': p.color }}>
                <h3>{p.title}</h3>
                <motion.p animate={{ opacity: active === i ? 1 : 0.55 }}>{p.copy}</motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
