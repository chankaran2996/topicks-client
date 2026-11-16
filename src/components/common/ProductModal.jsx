import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';
import { waLink } from '../../data/site';
import { formatINR } from './ProductCard';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

export default function ProductModal({ product, onClose }) {
  const [size, setSize] = useState('M');

  useEffect(() => {
    if (!product) return undefined;
    setSize('M');
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} data-lenis-prevent>
          <motion.div
            className="modal__panel"
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            initial={{ y: 80, scale: 0.92, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 60, scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal__close" onClick={onClose} aria-label="Close"><HiX /></button>
            <motion.img src={product.image} alt={product.name} initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1 }} />
            <div className="modal__body">
              <span className="eyebrow">{product.tag}</span>
              <h3>{product.name}</h3>
              <div className="product__price product__price--lg">
                <b>{formatINR(product.price)}</b>
                <s>{formatINR(product.mrp)}</s>
              </div>
              <p>
                Handpicked for its fabric and finish. Visit our Sarjapura store to try it on, or message us on WhatsApp for more
                photos, a quick video, and to reserve your size.
              </p>
              <h4>Select size</h4>
              <div className="sizes">
                {SIZES.map((s) => (
                  <button key={s} className={s === size ? 'is-active' : ''} onClick={() => setSize(s)}>
                    {s}
                    {s === size && <motion.span layoutId="size-pill" className="sizes__pill" />}
                  </button>
                ))}
              </div>
              <a
                className="btn btn--red btn--block"
                href={waLink(`Hi Topicks! I'd like to order "${product.name}" in size ${size} (${formatINR(product.price)}). Please confirm availability.`)}
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp /> Order size {size} on WhatsApp
              </a>
              <ul className="modal__perks">
                <li>✓ Try-on available in store</li>
                <li>✓ 7-day exchange with tags</li>
                <li>✓ Reserve on WhatsApp, pay at pickup</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
