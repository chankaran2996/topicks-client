import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';
import MagneticButton from '../common/MagneticButton';
import { GALLERY } from '../../data/content';
import { SITE } from '../../data/site';

export default function InstaWall() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const up = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const down = useTransform(scrollYProgress, [0, 1], [-80, 120]);

  const cols = [GALLERY.slice(0, 2), GALLERY.slice(2, 4), GALLERY.slice(4, 6), GALLERY.slice(6, 8)];

  return (
    <section className="section insta" ref={ref}>
      <div className="container">
        <SectionHeading eyebrow={SITE.instagramHandle} title="Follow the" script="fashion diary" copy="Daily drops, styling reels and behind-the-scenes from our store. Tag us to be featured!" />
        <div className="insta__grid">
          {cols.map((col, ci) => (
            <motion.div className="insta__col" key={ci} style={{ y: ci % 2 ? down : up }}>
              {col.map((src, i) => (
                <a key={i} href={SITE.instagram} target="_blank" rel="noreferrer" className="insta__item" data-cursor="Follow">
                  <img src={src} alt="Topicks style inspiration" loading="lazy" />
                  <span className="insta__hover"><FaInstagram /></span>
                </a>
              ))}
            </motion.div>
          ))}
        </div>
        <div className="center mt-xl">
          <MagneticButton as="a" href={SITE.instagram} target="_blank" rel="noreferrer" className="btn btn--gradient">
            <FaInstagram /> Follow {SITE.instagramHandle}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
