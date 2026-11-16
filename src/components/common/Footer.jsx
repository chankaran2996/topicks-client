import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoFull from '../../assets/logo-full.png';
import { NAV_LINKS, SITE, waLink } from '../../data/site';
import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__big" aria-hidden="true">
        <motion.span initial={{ y: '60%' }} whileInView={{ y: '0%' }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
          Topicks
        </motion.span>
      </div>

      <div className="container footer__grid">
        <div className="footer__brand">
          <img src={logoFull} alt="Topicks logo" />
          <p>Handpicked fashion for the woman who blooms in every season. Sarees, kurtis, dresses and more — curated with love in Sarjapura, Bengaluru.</p>
          <SocialLinks />
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Shop</h4>
          <ul>
            <li><Link to="/collections?c=sarees">Sarees</Link></li>
            <li><Link to="/collections?c=kurtis">Kurtis & Sets</Link></li>
            <li><Link to="/collections?c=western">Dresses</Link></li>
            <li><Link to="/collections?c=coords">Co-ords</Link></li>
            <li><Link to="/collections?c=accessories">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4>Visit</h4>
          <address>
            {SITE.address.line1}<br />
            {SITE.address.line2}<br />
            {SITE.address.line3}
          </address>
          <ul className="footer__contact">
            <li><a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a href={waLink()} target="_blank" rel="noreferrer">WhatsApp us</a></li>
            <li><a href={SITE.mapLink} target="_blank" rel="noreferrer">Get directions →</a></li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Topicks — A Feminine Clothing Store. All rights reserved.</span>
        <span>Made with ♥ for every woman.</span>
      </div>
    </footer>
  );
}
