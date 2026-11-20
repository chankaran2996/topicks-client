import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';
import { SITE, waLink } from '../../data/site';
import { useLenis } from '../common/SmoothScroll';

const INTERESTS = ['Sarees', 'Kurtis & Sets', 'Dresses', 'Co-ords', 'Tailoring', 'Bridal / Bulk', 'Something else'];

const PLACEHOLDERS = {
  Tailoring: 'What to stitch or alter — design, fabric, needed by…',
};

// No backend needed: the form composes a WhatsApp message (or email) for the store.
export default function ContactForm() {
  const [params] = useSearchParams();
  const preset = INTERESTS.includes(params.get('interest')) ? params.get('interest') : 'Sarees';
  const [form, setForm] = useState({ name: '', phone: '', interest: preset, message: '' });
  const [sent, setSent] = useState(false);
  const lenis = useLenis();

  // Arriving from a link like /contact?interest=Tailoring: preselect it and scroll to the form
  // (after the page transition and the scroll-to-top reset have run).
  useEffect(() => {
    if (!params.get('interest')) return undefined;
    setForm((f) => ({ ...f, interest: preset }));
    const t = setTimeout(() => {
      const el = document.getElementById('enquiry');
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { offset: -90 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }, 900);
    return () => clearTimeout(t);
  }, [params, preset, lenis]);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const text = `Hi Topicks! I'm ${form.name || 'a customer'}${form.phone ? ` (${form.phone})` : ''}.\nInterested in: ${form.interest}\n${form.message}`;

  const submit = (e) => {
    e.preventDefault();
    window.open(waLink(text), '_blank', 'noopener');
    setSent(true);
  };

  return (
    <section className="section contact-form" id="enquiry">
      <div className="container contact-form__grid">
        <div>
          <SectionHeading align="left" eyebrow="Drop a message" title="Tell us what" script="you’re looking for" copy="Fill this in and we’ll open WhatsApp with your message ready to send. Prefer email? Use the link below the form." />
          <ul className="contact-form__hours">
            <li><span>Mon – Sun</span><b>10:00 AM – 9:30 PM</b></li>
            <li><span>Festive season</span><b>Extended hours</b></li>
            <li><span>WhatsApp replies</span><b>Usually within minutes</b></li>
          </ul>
        </div>

        <motion.form className="form" onSubmit={submit} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="form__row">
            <label className="field">
              <input required value={form.name} onChange={update('name')} placeholder=" " />
              <span>Your name</span>
            </label>
            <label className="field">
              <input type="tel" value={form.phone} onChange={update('phone')} placeholder=" " pattern="[0-9+\s-]{10,15}" />
              <span>Phone (optional)</span>
            </label>
          </div>
          <div className="chips" role="radiogroup" aria-label="Interested in">
            {INTERESTS.map((i) => (
              <button type="button" key={i} role="radio" aria-checked={form.interest === i} className={form.interest === i ? 'is-active' : ''} onClick={() => setForm((f) => ({ ...f, interest: i }))}>
                {i}
              </button>
            ))}
          </div>
          <label className="field">
            <textarea rows={4} value={form.message} onChange={update('message')} placeholder=" " />
            <span>{PLACEHOLDERS[form.interest] || 'Your message — colour, size, occasion…'}</span>
          </label>
          <motion.button className="btn btn--red btn--block" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit">
            <FaWhatsapp /> Send on WhatsApp
          </motion.button>
          <a className="form__alt" href={`mailto:${SITE.email}?subject=${encodeURIComponent('Enquiry from website')}&body=${encodeURIComponent(text)}`}>
            or send as email to {SITE.email}
          </a>
          <AnimatePresence>
            {sent && (
              <motion.p className="form__sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                💐 WhatsApp opened — just hit send! We’ll get back to you shortly.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}
