import { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ProductCard from '../common/ProductCard';
import ProductModal from '../common/ProductModal';
import MagneticButton from '../common/MagneticButton';
import { PRODUCTS } from '../../data/content';

const PICKS = [1, 5, 8, 6, 4, 7, 9, 12].map((id) => PRODUCTS.find((p) => p.id === id));

export default function NewArrivals() {
  const [active, setActive] = useState(null);
  return (
    <section className="section arrivals">
      <div className="container">
        <SectionHeading eyebrow="Just landed" title="New this" script="week" copy="Fresh pieces hit our rails every week. Here are the ones our customers can't stop asking about." />
        <div className="product-grid">
          {PICKS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onQuickView={setActive} />
          ))}
        </div>
        <div className="center mt-xl">
          <MagneticButton as="link" to="/collections" className="btn btn--dark">
            View the full collection →
          </MagneticButton>
        </div>
      </div>
      <ProductModal product={active} onClose={() => setActive(null)} />
    </section>
  );
}
