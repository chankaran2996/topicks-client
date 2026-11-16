import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import { SITE, waLink } from '../../data/site';

const LINKS = [
  { href: SITE.instagram, label: 'Instagram', Icon: FaInstagram },
  { href: SITE.facebook, label: 'Facebook', Icon: FaFacebookF },
  { href: waLink(), label: 'WhatsApp', Icon: FaWhatsapp },
  { href: `mailto:${SITE.email}`, label: 'Email', Icon: HiOutlineMail },
  { href: `tel:${SITE.phone}`, label: 'Call', Icon: HiOutlinePhone },
];

export default function SocialLinks({ className = '' }) {
  return (
    <div className={`social ${className}`}>
      {LINKS.map(({ href, label, Icon }) => (
        <motion.a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel="noreferrer"
          aria-label={label}
          whileHover={{ y: -5, rotate: -8 }}
          transition={{ type: 'spring', stiffness: 400, damping: 12 }}
        >
          <Icon />
        </motion.a>
      ))}
    </div>
  );
}
