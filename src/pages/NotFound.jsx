import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import MagneticButton from '../components/common/MagneticButton';
import logoIcon from '../assets/logo-icon.png';

export default function NotFound() {
  return (
    <PageTransition>
      <section className="notfound">
        <motion.img src={logoIcon} alt="" animate={{ rotate: [0, -12, 12, 0], y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 3 }} />
        <h1>404</h1>
        <p>Oops — this page wandered off to try something on.</p>
        <MagneticButton as="link" to="/" className="btn btn--red">Back to home</MagneticButton>
      </section>
    </PageTransition>
  );
}
