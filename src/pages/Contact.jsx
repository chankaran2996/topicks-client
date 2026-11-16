import PageTransition from '../components/common/PageTransition';
import ContactHero from '../components/contact/ContactHero';
import ContactCards from '../components/contact/ContactCards';
import ContactForm from '../components/contact/ContactForm';
import StoreMap from '../components/contact/StoreMap';
import Faq from '../components/contact/Faq';

export default function Contact() {
  return (
    <PageTransition>
      <ContactHero />
      <ContactCards />
      <StoreMap />
      <ContactForm />
      <Faq />
    </PageTransition>
  );
}
