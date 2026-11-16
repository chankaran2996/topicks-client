import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import FilterBar from './FilterBar';
import ProductCard from '../common/ProductCard';
import ProductModal from '../common/ProductModal';
import { CATEGORIES, PRODUCTS } from '../../data/content';

const FILTERS = [{ key: 'all', label: 'All' }, ...CATEGORIES.map((c) => ({ key: c.key, label: c.title }))];

export default function ProductGrid() {
  const [params, setParams] = useSearchParams();
  const active = params.get('c') || 'all';
  const [sort, setSort] = useState('featured');
  const [query, setQuery] = useState('');
  const [quick, setQuick] = useState(null);

  const list = useMemo(() => {
    let out = PRODUCTS.filter((p) => (active === 'all' || p.category === active) && p.name.toLowerCase().includes(query.toLowerCase()));
    if (sort === 'low') out = [...out].sort((a, b) => a.price - b.price);
    if (sort === 'high') out = [...out].sort((a, b) => b.price - a.price);
    if (sort === 'off') out = [...out].sort((a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp);
    return out;
  }, [active, sort, query]);

  const setActive = (key) => setParams(key === 'all' ? {} : { c: key }, { replace: true, preventScrollReset: true });

  return (
    <section className="section shop">
      <div className="container">
        <FilterBar filters={FILTERS} active={active} onChange={setActive} sort={sort} onSort={setSort} query={query} onQuery={setQuery} count={list.length} />
        <motion.div layout className="product-grid">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onQuickView={setQuick} />
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && (
          <motion.p className="shop__empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Nothing matches that search yet — message us on WhatsApp and we’ll find it for you!
          </motion.p>
        )}
        <p className="shop__note">Showing a selection of our in-store collection. New stock arrives every week — visit or WhatsApp us for the latest.</p>
      </div>
      <ProductModal product={quick} onClose={() => setQuick(null)} />
    </section>
  );
}
