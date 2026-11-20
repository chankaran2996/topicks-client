import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { GiSewingMachine } from 'react-icons/gi';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import TiltCard from '../common/TiltCard';
import { SITE, waLink } from '../../data/site';

const CARDS = [
  { Icon: FaWhatsapp, title: 'WhatsApp', value: SITE.phoneDisplay, href: waLink(), note: 'Fastest way to order', cls: 'wa' },
  { Icon: HiOutlinePhone, title: 'Call us', value: SITE.phoneDisplay, href: `tel:${SITE.phone}`, note: '10 AM – 9:30 PM', cls: 'call' },
  { Icon: HiOutlineMail, title: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, note: 'Bulk & bridal enquiries', cls: 'mail' },
  { Icon: FaInstagram, title: 'Instagram', value: SITE.instagramHandle, href: SITE.instagram, note: 'Daily drops & reels', cls: 'ig' },
  { Icon: FaFacebookF, title: 'Facebook', value: 'Topicks', href: SITE.facebook, note: 'Offers & updates', cls: 'fb' },
  { Icon: HiOutlineLocationMarker, title: 'Store', value: 'Sarjapura, Bengaluru', href: SITE.mapLink, note: 'Near SNR Variety Apartment', cls: 'map' },
  { Icon: GiSewingMachine, title: 'Tailoring', value: 'Stitching & alterations', href: '/tailoring', note: 'Blouses, salwar sets, lehengas & custom designs →', cls: 'tailor' },
];

export default function ContactCards() {
  return (
    <section className="section contact-cards">
      <div className="container contact-cards__grid">
        {CARDS.map(({ Icon, title, value, href, note, cls }, i) => (
          <motion.div key={title} className={cls === 'tailor' ? 'contact-cards__wide' : undefined} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.7 }}>
            <TiltCard className={`ccard ccard--${cls}`}>
              {href.startsWith('/') ? (
                <Link to={href}>
                  <span className="ccard__icon"><Icon /></span>
                  <span className="ccard__title">{title}</span>
                  <b>{value}</b>
                  <small>{note}</small>
                </Link>
              ) : (
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  <span className="ccard__icon"><Icon /></span>
                  <span className="ccard__title">{title}</span>
                  <b>{value}</b>
                  <small>{note}</small>
                </a>
              )}
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
