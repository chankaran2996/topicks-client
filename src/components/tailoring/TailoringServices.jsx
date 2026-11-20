import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import TiltCard from '../common/TiltCard';
import { TAILORING_SERVICES } from '../../data/content';

export default function TailoringServices() {
  return (
    <section className="section values">
      <div className="container">
        <SectionHeading eyebrow="What we stitch" title="Our tailoring" script="services" copy="Bring your own fabric or pick one in store. We handle everything from simple fittings to bridal pieces." />
        <div className="values__grid">
          {TAILORING_SERVICES.map((s, i) => (
            <motion.div key={s.t} initial={{ opacity: 0, y: 60, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: (i % 3) * 0.12, duration: 0.8 }}>
              <TiltCard className="value">
                <span className="value__n">{s.e}</span>
                <h3>{s.t}</h3>
                <p>{s.c}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
