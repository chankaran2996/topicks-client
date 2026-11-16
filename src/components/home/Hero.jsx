import { lazy, Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import SplitText from '../common/SplitText';
import MagneticButton from '../common/MagneticButton';
import { waLink } from '../../data/site';

const HeroScene = lazy(() => import('../three/HeroScene'));

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <section className="hero" ref={ref}>
      <div className="hero__bg" aria-hidden="true">
        <span className="blob blob--red" />
        <span className="blob blob--green" />
        <span className="blob blob--pink" />
      </div>

      <motion.div className="hero__scene" style={{ scale: sceneScale, y: sceneY }}>
        <Suspense fallback={<div className="scene-fallback" />}>
          <HeroScene />
        </Suspense>
      </motion.div>

      <motion.div className="container hero__content" style={{ y: textY, opacity: textOpacity }}>
        <motion.span className="eyebrow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4, duration: 0.8 }}>
          Sarjapura · Bengaluru · Since day one, for her
        </motion.span>

        <h1 className="hero__title">
          <SplitText text="Bloom in" animateOnMount delay={2.5} />
          <br />
          <SplitText text="every season" animateOnMount delay={2.7} className="hero__title-accent" />
        </h1>

        <motion.p className="hero__copy" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.1, duration: 0.9 }}>
          Sarees that tell stories, kurtis for every day, dresses made to twirl in. <strong>Topicks</strong> is your neighbourhood
          boutique for handpicked feminine fashion — fresh arrivals every week, honest prices, and styling help that feels like a friend.
        </motion.p>

        <motion.div className="hero__actions" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.3, duration: 0.9 }}>
          <MagneticButton as="link" to="/collections" className="btn btn--red" data-cursor="Shop">
            Explore Collections
          </MagneticButton>
          <MagneticButton as="a" href={waLink()} target="_blank" rel="noreferrer" className="btn btn--ghost">
            <FaWhatsapp /> Chat & Order
          </MagneticButton>
        </motion.div>

        <motion.ul className="hero__badges" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.6, duration: 1 }}>
          <li><b>New</b> arrivals weekly</li>
          <li><b>XS–3XL</b> sizes</li>
          <li><b>WhatsApp</b> ordering</li>
        </motion.ul>
      </motion.div>

      <motion.div className="hero__scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.8 }}>
        <span>Scroll</span>
        <motion.i animate={{ y: [0, 14, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }} />
      </motion.div>
    </section>
  );
}
