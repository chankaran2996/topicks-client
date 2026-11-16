import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import MagneticButton from '../common/MagneticButton';
import Reveal from '../common/Reveal';
import { STORE_IMAGES } from '../../data/content';
import logoIcon from '../../assets/logo-icon.png';

export default function StoryParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], ['18%', '-18%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['-10%', '25%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [-30, 60]);
  const clip = useTransform(scrollYProgress, [0.1, 0.45], ['inset(30% 20% 30% 20% round 300px)', 'inset(0% 0% 0% 0% round 300px 300px 24px 24px)']);

  return (
    <section className="section story" ref={ref}>
      <div className="container story__grid">
        <div className="story__visual">
          <motion.div className="story__main" style={{ clipPath: clip }}>
            <motion.img src={STORE_IMAGES.boutique} alt="Inside a boutique clothing rail" style={{ y: y1, scale: 1.25 }} />
          </motion.div>
          <motion.div className="story__float" style={{ y: y2 }}>
            <img src={STORE_IMAGES.neutrals} alt="Soft neutral garments on hangers" loading="lazy" />
          </motion.div>
          <motion.img src={logoIcon} alt="" className="story__badge" style={{ rotate }} />
        </div>

        <div className="story__text">
          <SectionHeading align="left" eyebrow="Our roots" title="Rooted in grace," script="growing with you" />
          <Reveal>
            <p>
              Look closely at our logo: a woman, arms flung wide in celebration, surrounded by fresh green leaves. That’s the feeling
              we want you to walk out with — <b>free, confident and blooming</b>.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Topicks — <em>top picks</em> — began with a simple promise: only stock what we would proudly wear ourselves. Every saree,
              kurti and dress is chosen by hand for its fabric, its fall, and how it makes you feel.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <MagneticButton as="link" to="/about" className="btn btn--ghost">Read our story</MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
