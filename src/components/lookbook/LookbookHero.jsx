import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import SplitText from '../common/SplitText';

const SilkCloth = lazy(() => import('../three/SilkCloth'));

export default function LookbookHero() {
  return (
    <section className="page-hero page-hero--silk">
      <div className="page-hero__scene">
        <Suspense fallback={null}>
          <SilkCloth />
        </Suspense>
      </div>
      <div className="container page-hero__content page-hero__content--center">
        <motion.span className="eyebrow eyebrow--light" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Lookbook · Festive 2026
        </motion.span>
        <h1>
          <SplitText text="Stories woven" animateOnMount delay={0.4} />
          <br />
          <em className="script">in silk & colour</em>
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}>
          Move your mouse across the silk — then scroll through the edits our stylists are loving this season.
        </motion.p>
      </div>
    </section>
  );
}
