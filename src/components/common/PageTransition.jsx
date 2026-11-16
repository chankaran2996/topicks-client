import { motion } from 'framer-motion';

// Wraps each page: a red curtain sweeps across on route change.
export default function PageTransition({ children }) {
  return (
    <>
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.25, duration: 0.5 } }} exit={{ opacity: 0, transition: { duration: 0.3 } }}>
        {children}
      </motion.main>
      <motion.div
        className="curtain"
        initial={{ scaleY: 1, originY: 0 }}
        animate={{ scaleY: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
        exit={{ scaleY: 1, originY: 1, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }}
      />
    </>
  );
}
