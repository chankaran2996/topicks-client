import PageTransition from '../components/common/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import LookbookHero from '../components/lookbook/LookbookHero';
import StackedLooks from '../components/lookbook/StackedLooks';
import ZoomGallery from '../components/lookbook/ZoomGallery';
import StyleTips from '../components/lookbook/StyleTips';

export default function Lookbook() {
  return (
    <PageTransition>
      <LookbookHero />
      <div className="section section--tight container">
        <SectionHeading eyebrow="This season’s edits" title="Five stories," script="one wardrobe" />
      </div>
      <StackedLooks />
      <ZoomGallery />
      <StyleTips />
    </PageTransition>
  );
}
