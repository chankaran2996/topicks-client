import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import TiltCard from '../common/TiltCard';
import { CATEGORIES } from '../../data/content';

export default function Categories() {
  return (
    <section className="section categories">
      <div className="container">
        <SectionHeading
          eyebrow="Shop by category"
          title="Find your"
          script="favourite"
          copy="From six-yard heirlooms to weekend co-ords — every rail in our store is picked with one woman in mind: you."
        />
        <div className="categories__grid">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.key}
              className={`categories__item categories__item--${i}`}
              initial={{ opacity: 0, y: 80, rotate: i % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="cat-card">
                <Link to={`/collections?c=${c.key}`} data-cursor="View">
                  <img src={c.image} alt={c.title} loading="lazy" />
                  <div className="cat-card__shade" />
                  <div className="cat-card__body">
                    <span className="cat-card__num">0{i + 1}</span>
                    <h3>{c.title}</h3>
                    <p>{c.note}</p>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
