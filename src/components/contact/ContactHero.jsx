import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import SplitText from '../common/SplitText';

const FloatingGems = lazy(() => import('../three/FloatingGems'));

export default function ContactHero() {
  return (
    <section className="page-hero page-hero--light page-hero--short">
      <div className="page-hero__scene">
        <Suspense fallback={null}>
          <FloatingGems variant="contact" />
        </Suspense>
      </div>
      <div className="container page-hero__content">
        <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Visit · Call · WhatsApp
        </motion.span>
        <h1 className="dark">
          <SplitText text="Let’s get" animateOnMount delay={0.4} />
          <br />
          <em className="script">you dressed</em>
        </h1>
        <motion.p className="dark" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}>
          Questions about a piece, sizes, tailoring or store timings? We usually reply on WhatsApp within minutes.
        </motion.p>
      </div>
    </section>
  );
}
