import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';

const ROWS = [
  ['XS', '32', '26', '35'],
  ['S', '34', '28', '37'],
  ['M', '36', '30', '39'],
  ['L', '38', '32', '41'],
  ['XL', '40', '34', '43'],
  ['XXL', '42', '36', '45'],
  ['3XL', '44', '38', '47'],
];

export default function SizeGuide() {
  const [unit, setUnit] = useState('in');
  const conv = (v) => (unit === 'in' ? v : Math.round(Number(v) * 2.54));

  return (
    <section className="section sizeguide">
      <div className="container sizeguide__grid">
        <div>
          <SectionHeading align="left" eyebrow="Fit matters" title="Size" script="guide" copy="Body measurements for most Topicks kurtis, dresses and tops. Fits vary by style — our team will always help you find the right one." />
          <div className="unit-toggle" role="group" aria-label="Units">
            {['in', 'cm'].map((u) => (
              <button key={u} className={unit === u ? 'is-active' : ''} onClick={() => setUnit(u)}>
                {unit === u && <motion.span layoutId="unit-pill" className="unit-toggle__pill" />}
                <span>{u === 'in' ? 'Inches' : 'Centimetres'}</span>
              </button>
            ))}
          </div>
        </div>
        <motion.div className="sizeguide__table" initial={{ opacity: 0, rotateY: -20 }} whileInView={{ opacity: 1, rotateY: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <table>
            <thead>
              <tr><th>Size</th><th>Bust</th><th>Waist</th><th>Hip</th></tr>
            </thead>
            <tbody>
              {ROWS.map(([s, ...vals], i) => (
                <motion.tr key={s} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <td>{s}</td>
                  {vals.map((v, j) => (
                    <td key={j}>
                      <AnimatePresence mode="wait">
                        <motion.span key={unit} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
                          {conv(v)}
                        </motion.span>
                      </AnimatePresence>
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
