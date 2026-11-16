import { useEffect } from 'react';
import { motion } from 'framer-motion';
import logoIcon from '../../assets/logo-icon.png';

export default function Preloader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2300);
    return () => clearTimeout(t);
  }, [onDone]);

  const letters = 'TOPICKS'.split('');

  return (
    <motion.div
      className="preloader"
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
    >
      <motion.img
        src={logoIcon}
        alt=""
        className="preloader__logo"
        initial={{ scale: 0.4, rotate: -40, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="preloader__word">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <motion.p
        className="preloader__tag"
        initial={{ opacity: 0, letterSpacing: '0.1em' }}
        animate={{ opacity: 1, letterSpacing: '0.4em' }}
        transition={{ delay: 1.1, duration: 1 }}
      >
        A FEMININE CLOTHING STORE
      </motion.p>
      <motion.div className="preloader__bar" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2, ease: 'easeInOut' }} />
    </motion.div>
  );
}
