import PageTransition from '../components/common/PageTransition';
import Marquee from '../components/common/Marquee';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import NewArrivals from '../components/home/NewArrivals';
import StoryParallax from '../components/home/StoryParallax';
import OccasionScroller from '../components/home/OccasionScroller';
import WhyTopicks from '../components/home/WhyTopicks';
import Stats from '../components/home/Stats';
import Testimonials from '../components/home/Testimonials';
import InstaWall from '../components/home/InstaWall';
import VisitCTA from '../components/home/VisitCTA';

const WORDS = ['Silk Sarees', 'Kurti Sets', 'Anarkalis', 'Party Dresses', 'Co-ords', 'Festive Wear', 'Office Wear', 'Accessories'];

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Marquee items={WORDS} />
      <Categories />
      <NewArrivals />
      <StoryParallax />
      <OccasionScroller />
      <WhyTopicks />
      <Stats />
      <Testimonials />
      <Marquee items={['Handpicked', 'Feminine', 'Fresh every week', 'Made for you']} baseVelocity={2} className="marquee--red" />
      <InstaWall />
      <VisitCTA />
    </PageTransition>
  );
}
