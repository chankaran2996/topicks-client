import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplitText from '../common/SplitText';
import { STORE_IMAGES } from '../../data/content';

export default function CollectionsHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.3]);

  return (
    <section className="page-hero page-hero--image" ref={ref}>
      <motion.img className="page-hero__img" src={STORE_IMAGES.rack} alt="" style={{ y, scale }} />
      <div className="page-hero__shade" />
      <div className="container page-hero__content">
        <motion.span className="eyebrow eyebrow--light" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          The Topicks collection
        </motion.span>
        <h1>
          <SplitText text="Handpicked," animateOnMount delay={0.4} />
          <br />
          <em className="script">just for you</em>
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}>
          Browse a glimpse of what’s on our rails right now. Love something? Tap enquire and we’ll send photos, sizes and a video on WhatsApp.
        </motion.p>
      </div>
    </section>
  );
}
