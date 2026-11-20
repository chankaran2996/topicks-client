import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';
import MagneticButton from '../common/MagneticButton';
import { TAILORING_STEPS } from '../../data/content';
import { waLink } from '../../data/site';

export default function TailoringProcess() {
  return (
    <section className="section steps">
      <div className="container">
        <SectionHeading eyebrow="Simple & personal" title="How it" script="works" />
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
          {TAILORING_STEPS.map((s, i) => (
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
        <div className="center mt-xl tailoring-cta">
          <MagneticButton as="a" href={waLink('Hi Topicks! I would like to get something stitched. Here is my design:')} target="_blank" rel="noreferrer" className="btn btn--red">
            <FaWhatsapp /> Start a tailoring order
          </MagneticButton>
          <Link to="/contact?interest=Tailoring" className="btn btn--light">Send an enquiry</Link>
        </div>
      </div>
    </section>
  );
}
