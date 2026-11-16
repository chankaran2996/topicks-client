import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';
import MagneticButton from '../common/MagneticButton';
import { waLink } from '../../data/site';

const STEPS = [
  { n: '01', t: 'Pick your favourite', c: 'Browse here or on our Instagram and screenshot what catches your eye.' },
  { n: '02', t: 'Message on WhatsApp', c: 'Send it to 87921 95368. We reply with extra photos, a video and available sizes.' },
  { n: '03', t: 'Reserve your size', c: 'We hold the piece for you — no advance hassle for in-store pickup.' },
  { n: '04', t: 'Try, love, take home', c: 'Drop by the Sarjapura store, try it on and walk out blooming.' },
];

export default function HowToOrder() {
  return (
    <section className="section steps">
      <div className="container">
        <SectionHeading eyebrow="Easy as a message" title="How to order" script="from home" />
        <div className="steps__row">
          <motion.svg className="steps__line" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d="M0 20 C 125 0, 250 40, 375 20 S 625 0, 750 20 S 900 40, 1000 20"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </motion.svg>
          {STEPS.map((s, i) => (
            <motion.div
              className="step"
              key={s.n}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.3 + i * 0.3, duration: 0.7 }}
            >
              <motion.span className="step__n" whileHover={{ scale: 1.15, rotate: -8 }}>{s.n}</motion.span>
              <h3>{s.t}</h3>
              <p>{s.c}</p>
            </motion.div>
          ))}
        </div>
        <div className="center mt-xl">
          <MagneticButton as="a" href={waLink('Hi Topicks! I would like to order. Please share the latest collection.')} target="_blank" rel="noreferrer" className="btn btn--red">
            <FaWhatsapp /> Start your order
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
