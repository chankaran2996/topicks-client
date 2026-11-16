import PageTransition from '../components/common/PageTransition';
import Marquee from '../components/common/Marquee';
import CollectionsHero from '../components/collections/CollectionsHero';
import ProductGrid from '../components/collections/ProductGrid';
import HowToOrder from '../components/collections/HowToOrder';
import SizeGuide from '../components/collections/SizeGuide';

export default function Collections() {
  return (
    <PageTransition>
      <CollectionsHero />
      <ProductGrid />
      <Marquee items={['Reserve on WhatsApp', 'Try in store', '7-day exchange', 'XS – 3XL']} className="marquee--red" />
      <HowToOrder />
      <SizeGuide />
    </PageTransition>
  );
}
