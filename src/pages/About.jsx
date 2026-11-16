import PageTransition from '../components/common/PageTransition';
import Marquee from '../components/common/Marquee';
import AboutHero from '../components/about/AboutHero';
import TextReveal from '../components/about/TextReveal';
import LogoMeaning from '../components/about/LogoMeaning';
import Journey from '../components/about/Journey';
import Values from '../components/about/Values';
import Stats from '../components/home/Stats';

export default function About() {
  return (
    <PageTransition>
      <AboutHero />
      <TextReveal />
      <LogoMeaning />
      <Marquee items={['Quality', 'Honesty', 'Inclusivity', 'Joy', 'Community']} className="marquee--red" />
      <Journey />
      <Stats />
      <Values />
    </PageTransition>
  );
}
