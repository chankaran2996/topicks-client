import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { HiOutlineEye } from 'react-icons/hi';
import TiltCard from './TiltCard';
import { waLink } from '../../data/site';

export const formatINR = (n) => `₹${n.toLocaleString('en-IN')}`;

const ProductCard = forwardRef(function ProductCard({ product, index = 0, onQuickView }, ref) {
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  return (
    <motion.article
      ref={ref}
      layout
      className="product"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard className="product__media" max={8}>
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product__tag">{product.tag}</span>
        <span className="product__off">-{off}%</span>
        <div className="product__overlay">
          {onQuickView && (
            <button className="product__btn" onClick={() => onQuickView(product)} data-cursor="Peek">
              <HiOutlineEye /> Quick view
            </button>
          )}
          <a
            className="product__btn product__btn--wa"
            href={waLink(`Hi Topicks! I'm interested in "${product.name}" (${formatINR(product.price)}). Is it available?`)}
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp /> Enquire
          </a>
        </div>
      </TiltCard>
      <div className="product__info">
        <h3>{product.name}</h3>
        <div className="product__price">
          <b>{formatINR(product.price)}</b>
          <s>{formatINR(product.mrp)}</s>
        </div>
        <div className="product__swatches">
          {product.colors.map((c) => (
            <i key={c} style={{ background: c }} />
          ))}
        </div>
      </div>
    </motion.article>
  );
});

export default ProductCard;
