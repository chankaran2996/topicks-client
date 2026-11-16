import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { waLink } from '../../data/site';

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={waLink()}
      target="_blank"
      rel="noreferrer"
      className="wa-float"
      aria-label="Chat with Topicks on WhatsApp"
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 2.8, type: 'spring', stiffness: 200, damping: 14 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
    >
      <span className="wa-float__pulse" />
      <FaWhatsapp />
      <span className="wa-float__tip">Chat with us</span>
    </motion.a>
  );
}
