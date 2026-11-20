import PageTransition from '../components/common/PageTransition';
import Marquee from '../components/common/Marquee';
import TailoringHero from '../components/tailoring/TailoringHero';
import TailoringServices from '../components/tailoring/TailoringServices';
import TailoringProcess from '../components/tailoring/TailoringProcess';
import Faq from '../components/contact/Faq';
import VisitCTA from '../components/home/VisitCTA';
import { TAILORING_FAQS } from '../data/content';

export default function Tailoring() {
  return (
    <PageTransition>
      <TailoringHero />
      <TailoringServices />
      <Marquee items={['Blouses', 'Salwar Sets', 'Lehengas', 'Alterations', 'Saree Fall & Pico', 'Custom Designs']} className="marquee--red" />
      <TailoringProcess />
      <Faq items={TAILORING_FAQS} eyebrow="Tailoring questions" />
      <VisitCTA />
    </PageTransition>
  );
}
