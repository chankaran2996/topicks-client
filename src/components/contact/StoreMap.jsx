import { motion } from 'framer-motion';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import MagneticButton from '../common/MagneticButton';
import { SITE } from '../../data/site';

export default function StoreMap() {
  return (
    <section className="section store-map">
      <div className="container">
        <motion.div className="store-map__frame" initial={{ opacity: 0, clipPath: 'inset(10% 10% 10% 10% round 40px)' }} whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 28px)' }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
          <iframe title="Topicks store location" src={SITE.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          <motion.div className="store-map__card" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.8 }}>
            <span className="store-map__pin"><HiOutlineLocationMarker /></span>
            <h3>Topicks Store</h3>
            <p>
              {SITE.address.line1}<br />
              {SITE.address.line2}<br />
              {SITE.address.line3}
            </p>
            <MagneticButton as="a" href={SITE.mapLink} target="_blank" rel="noreferrer" className="btn btn--red btn--sm">
              Open in Google Maps
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
