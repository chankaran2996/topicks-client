import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GALLERY, STORE_IMAGES } from '../../data/content';

const PICS = [
  { src: STORE_IMAGES.prints, cls: 'z0', s: [1, 4] },
  { src: GALLERY[0], cls: 'z1', s: [1, 5] },
  { src: GALLERY[1], cls: 'z2', s: [1, 6] },
  { src: GALLERY[2], cls: 'z3', s: [1, 5] },
  { src: GALLERY[3], cls: 'z4', s: [1, 6] },
  { src: GALLERY[4], cls: 'z5', s: [1, 8] },
  { src: GALLERY[5], cls: 'z6', s: [1, 9] },
];

function ZoomPic({ pic, progress }) {
  const scale = useTransform(progress, [0, 1], pic.s);
  return (
    <motion.div className={`zoom__el zoom__el--${pic.cls}`} style={{ scale }}>
      <div className="zoom__img">
        <img src={pic.src} alt="Topicks lookbook" loading="lazy" />
      </div>
    </motion.div>
  );
}

// Scroll zoom: the centre image grows to fill the screen while the rest fly outward.
export default function ZoomGallery() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const textOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.55, 0.8], [40, 0]);

  return (
    <section className="zoom" ref={ref}>
      <div className="zoom__sticky">
        {PICS.map((p) => (
          <ZoomPic key={p.cls} pic={p} progress={scrollYProgress} />
        ))}
        <motion.div className="zoom__caption" style={{ opacity: textOpacity, y: textY }}>
          <h2>Prints, patterns <em className="script">& personality</em></h2>
          <p>Every rail at Topicks is a palette. Come play.</p>
        </motion.div>
      </div>
    </section>
  );
}
