import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import SplitText from '../common/SplitText';

const FloatingGems = lazy(() => import('../three/FloatingGems'));

export default function AboutHero() {
  return (
    <section className="page-hero page-hero--light">
      <div className="page-hero__scene">
        <Suspense fallback={null}>
          <FloatingGems variant="about" />
        </Suspense>
      </div>
      <div className="container page-hero__content">
        <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Our story
        </motion.span>
        <h1 className="dark">
          <SplitText text="Top picks," animateOnMount delay={0.4} />
          <br />
          <em className="script">with a whole lot of heart</em>
        </h1>
        <motion.p className="dark" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}>
          A neighbourhood boutique in Sarjapura built on one belief — every woman deserves clothes that make her feel celebrated.
        </motion.p>
      </div>
    </section>
  );
}
