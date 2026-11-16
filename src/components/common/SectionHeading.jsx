import { motion } from 'framer-motion';
import SplitText from './SplitText';

export default function SectionHeading({ eyebrow, title, script, copy, align = 'center', light = false }) {
  return (
    <div className={`section-heading section-heading--${align} ${light ? 'section-heading--light' : ''}`}>
      {eyebrow && (
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.35em' }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {eyebrow}
        </motion.span>
      )}
      <h2 className="section-heading__title">
        <SplitText text={title} />
        {script && (
          <motion.em
            className="script"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {script}
          </motion.em>
        )}
      </h2>
      {copy && (
        <motion.p
          className="section-heading__copy"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {copy}
        </motion.p>
      )}
    </div>
  );
}
