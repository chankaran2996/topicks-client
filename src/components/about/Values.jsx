import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import TiltCard from '../common/TiltCard';

const VALUES = [
  { t: 'Quality first', c: 'We touch, test and check every fabric before it reaches you. Stitching, lining, colour-fastness — no shortcuts.', e: '01' },
  { t: 'Honest pricing', c: 'Boutique style without boutique mark-ups. Fair prices, transparent discounts, always.', e: '02' },
  { t: 'Inclusive sizing', c: 'XS to 3XL across most styles. Beautiful clothes should fit every beautiful body.', e: '03' },
  { t: 'Personal styling', c: 'Unsure what suits you? Our team helps pick colours, cuts and combinations — free, always.', e: '04' },
  { t: 'Local love', c: 'We are proud to be part of the Sarjapura community and to dress its daughters, mothers and brides.', e: '05' },
  { t: 'Always fresh', c: 'New drops every week, so there is always something you have not seen before.', e: '06' },
];

export default function Values() {
  return (
    <section className="section values">
      <div className="container">
        <SectionHeading eyebrow="What we stand for" title="Our" script="values" />
        <div className="values__grid">
          {VALUES.map((v, i) => (
            <motion.div key={v.t} initial={{ opacity: 0, y: 60, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: (i % 3) * 0.12, duration: 0.8 }}>
              <TiltCard className="value">
                <span className="value__n">{v.e}</span>
                <h3>{v.t}</h3>
                <p>{v.c}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
