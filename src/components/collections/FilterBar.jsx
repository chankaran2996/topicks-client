import { motion } from 'framer-motion';
import { HiOutlineSearch } from 'react-icons/hi';

export default function FilterBar({ filters, active, onChange, sort, onSort, query, onQuery, count }) {
  return (
    <div className="filterbar">
      <div className="filterbar__tabs" role="tablist">
        {filters.map((f) => (
          <button key={f.key} role="tab" aria-selected={active === f.key} className={active === f.key ? 'is-active' : ''} onClick={() => onChange(f.key)}>
            {active === f.key && <motion.span layoutId="filter-pill" className="filterbar__pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
            <span>{f.label}</span>
          </button>
        ))}
      </div>
      <div className="filterbar__tools">
        <label className="filterbar__search">
          <HiOutlineSearch />
          <input value={query} onChange={(e) => onQuery(e.target.value)} placeholder="Search styles…" aria-label="Search styles" />
        </label>
        <select value={sort} onChange={(e) => onSort(e.target.value)} aria-label="Sort products">
          <option value="featured">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="off">Biggest discount</option>
        </select>
        <span className="filterbar__count">{count} styles</span>
      </div>
    </div>
  );
}
