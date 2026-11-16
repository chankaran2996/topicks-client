import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import MagneticButton from '../common/MagneticButton';
import SplitText from '../common/SplitText';
import { STORE_IMAGES } from '../../data/content';
import { SITE, waLink } from '../../data/site';

export default function VisitCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.78, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [80, 28]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.4, 1]);

  return (
    <section className="visit" ref={ref}>
      <motion.div className="visit__frame" style={{ scale, borderRadius: radius }}>
        <motion.img src={STORE_IMAGES.store} alt="Clothing store interior" style={{ scale: imgScale }} loading="lazy" />
        <div className="visit__shade" />
        <div className="visit__content">
          <span className="eyebrow eyebrow--light">Come say hello</span>
          <h2>
            <SplitText text="Your next favourite outfit is waiting" />
          </h2>
          <p>
            <HiOutlineLocationMarker /> {SITE.address.line1} {SITE.address.line2} Bengaluru
          </p>
          <div className="visit__actions">
            <MagneticButton as="a" href={SITE.mapLink} target="_blank" rel="noreferrer" className="btn btn--light">
              Get directions
            </MagneticButton>
            <MagneticButton as="a" href={waLink()} target="_blank" rel="noreferrer" className="btn btn--red">
              <FaWhatsapp /> WhatsApp us
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
