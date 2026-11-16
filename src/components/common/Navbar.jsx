import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';
import logoIcon from '../../assets/logo-icon.png';
import { NAV_LINKS, SITE, waLink } from '../../data/site';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const { pathname } = useLocation();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 300 && !open);
    setScrolled(latest > 40);
  });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
        animate={{ y: hidden ? '-180%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link to="/" className="nav__brand" aria-label="Topicks home">
          <motion.img src={logoIcon} alt="" whileHover={{ rotate: 18, scale: 1.08 }} transition={{ type: 'spring', stiffness: 260 }} />
          <span className="nav__word">Topicks</span>
        </Link>

        <nav className="nav__links" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}>
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && <motion.span layoutId="nav-underline" className="nav__underline" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <MagneticButton as="a" href={waLink()} target="_blank" rel="noreferrer" className="btn btn--red btn--sm nav__cta">
            <FaWhatsapp /> Order on WhatsApp
          </MagneticButton>
          <button className={`burger ${open ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul>
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
                >
                  <NavLink to={l.to} end>
                    <small>0{i + 1}</small>
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <motion.div className="mobile-menu__foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
              <div className="mobile-menu__social">
                <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
                <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                <a href={waLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
