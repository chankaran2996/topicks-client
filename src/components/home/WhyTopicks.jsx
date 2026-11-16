import { motion } from 'framer-motion';
import { HiOutlineHeart, HiOutlineTag, HiOutlineChatAlt2 } from 'react-icons/hi';
import { PiLeafLight } from 'react-icons/pi';
import SectionHeading from '../common/SectionHeading';
import TiltCard from '../common/TiltCard';
import { FEATURES } from '../../data/content';

const ICONS = { leaf: PiLeafLight, heart: HiOutlineHeart, tag: HiOutlineTag, chat: HiOutlineChatAlt2 };

export default function WhyTopicks() {
  return (
    <section className="section why">
      <div className="container">
        <SectionHeading eyebrow="Why women love us" title="The Topicks" script="promise" />
        <div className="why__grid">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 70, rotateX: -40 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformPerspective: 800 }}
              >
                <TiltCard className="why__card">
                  <motion.div className="why__icon" whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }}>
                    <Icon />
                  </motion.div>
                  <h3>{f.title}</h3>
                  <p>{f.copy}</p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
