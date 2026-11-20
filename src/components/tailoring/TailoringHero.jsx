import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import SplitText from '../common/SplitText';
import MagneticButton from '../common/MagneticButton';
import { waLink } from '../../data/site';

const FloatingGems = lazy(() => import('../three/FloatingGems'));

export default function TailoringHero() {
  return (
    <section className="page-hero page-hero--light">
      <div className="page-hero__scene">
        <Suspense fallback={null}>
          <FloatingGems variant="about" />
        </Suspense>
      </div>
      <div className="container page-hero__content">
        <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Tailoring · Stitching · Alterations
        </motion.span>
        <h1 className="dark">
          <SplitText text="Stitched to" animateOnMount delay={0.4} />
          <br />
          <em className="script">fit only you</em>
        </h1>
        <motion.p className="dark" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}>
          From designer blouses to festive lehengas and quick alterations, our in-house tailors make every piece fit just right.
        </motion.p>
        <motion.div className="tailoring-hero__actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}>
          <MagneticButton as="a" href={waLink('Hi Topicks! I would like to know about your tailoring service.')} target="_blank" rel="noreferrer" className="btn btn--red">
            <FaWhatsapp /> Ask on WhatsApp
          </MagneticButton>
          <Link to="/contact?interest=Tailoring" className="btn btn--light">Send an enquiry</Link>
        </motion.div>
      </div>
    </section>
  );
}
