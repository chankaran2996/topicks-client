import { img } from './site';

// NOTE: Product names, prices and testimonials are sample content.
// Replace them with the store's real catalogue and customer reviews.

export const CATEGORIES = [
  { key: 'sarees', title: 'Sarees', note: 'Silk, cotton & festive drapes', image: img('1617627143750-d86bc21e42bb') },
  { key: 'kurtis', title: 'Kurtis & Sets', note: 'Everyday ethnic comfort', image: img('1597983073493-88cd35cf93b0') },
  { key: 'ethnic', title: 'Anarkalis & Gowns', note: 'Flowing festive silhouettes', image: img('1583391733956-3750e0ff4e8b') },
  { key: 'western', title: 'Dresses', note: 'Brunch, office & date-night', image: img('1572804013309-59a88b7e92f1') },
  { key: 'coords', title: 'Co-ords & Tops', note: 'Easy, matched, modern', image: img('1515886657613-9f3515b0c78f') },
  { key: 'accessories', title: 'Accessories', note: 'The finishing touch', image: img('1492707892479-7bc8d5a4ee93') },
];

export const PRODUCTS = [
  { id: 1, name: 'Kanchi Rose Silk Saree', category: 'sarees', price: 4499, mrp: 5999, tag: 'Bestseller', image: img('1617627143750-d86bc21e42bb'), colors: ['#C2185B', '#D4A017'] },
  { id: 2, name: 'Royal Plum Banarasi Drape', category: 'sarees', price: 3899, mrp: 4999, tag: 'Festive', image: img('1610030469983-98e550d6193c'), colors: ['#4A148C', '#C9A227'] },
  { id: 3, name: 'Floral Bloom Organza Saree', category: 'sarees', price: 2799, mrp: 3499, tag: 'New', image: img('1622122201714-77da0ca8e5d2'), colors: ['#E91E63', '#1B1B1B'] },
  { id: 4, name: 'Emerald Printed Kurti Set', category: 'kurtis', price: 1599, mrp: 1999, tag: 'New', image: img('1597983073493-88cd35cf93b0'), colors: ['#0B6B1F', '#E3121B'] },
  { id: 5, name: 'Ivory Chikan Anarkali', category: 'ethnic', price: 2999, mrp: 3799, tag: 'Trending', image: img('1583391733956-3750e0ff4e8b'), colors: ['#F5F0E6', '#BFA77A'] },
  { id: 6, name: 'Scarlet Swirl Maxi Gown', category: 'ethnic', price: 3299, mrp: 4199, tag: 'Party', image: img('1595777457583-95e059d581b8'), colors: ['#E3121B'] },
  { id: 7, name: 'Sage Wrap Midi Dress', category: 'western', price: 1899, mrp: 2399, tag: 'New', image: img('1609357605129-26f69add5d6e'), colors: ['#2E7D6B'] },
  { id: 8, name: 'Cherry Polka Fit & Flare', category: 'western', price: 1499, mrp: 1899, tag: 'Bestseller', image: img('1572804013309-59a88b7e92f1'), colors: ['#C62828'] },
  { id: 9, name: 'Wine Velvet Off-Shoulder', category: 'western', price: 2199, mrp: 2799, tag: 'Party', image: img('1566174053879-31528523f8ae'), colors: ['#6A1B4D'] },
  { id: 10, name: 'Midnight Lace Cut-out Dress', category: 'western', price: 2499, mrp: 3199, tag: 'Limited', image: img('1551803091-e20673f15770'), colors: ['#283593'] },
  { id: 11, name: 'Mulberry Corduroy Shirt Dress', category: 'western', price: 1799, mrp: 2299, tag: 'Office', image: img('1585487000160-6ebcfceb0d03'), colors: ['#7B1F3A'] },
  { id: 12, name: 'Sunshine Lounge Co-ord', category: 'coords', price: 1399, mrp: 1799, tag: 'Comfy', image: img('1515886657613-9f3515b0c78f'), colors: ['#F2B705'] },
  { id: 13, name: 'Blush Tapered Trousers', category: 'coords', price: 1199, mrp: 1499, tag: 'Office', image: img('1594633312681-425c7b97ccd1'), colors: ['#E8B4A8'] },
  { id: 14, name: 'Pearl Linen Shirt Dress', category: 'coords', price: 1699, mrp: 2099, tag: 'New', image: img('1617019114583-affb34d1b3cd'), colors: ['#F6F1E7'] },
  { id: 15, name: 'Garden Floral Wrap Dress', category: 'western', price: 1999, mrp: 2499, tag: 'Trending', image: img('1496747611176-843222e1e57c'), colors: ['#F3E5D8', '#C2185B'] },
  { id: 16, name: 'Everyday Essentials Kit', category: 'accessories', price: 899, mrp: 1199, tag: 'Gift', image: img('1492707892479-7bc8d5a4ee93'), colors: ['#1B1B1B', '#D4A017'] },
];

export const OCCASIONS = [
  { title: 'Festive & Pooja', copy: 'Rich silks, temple borders and jewel tones for every celebration in the calendar.', image: img('1610030469983-98e550d6193c', 700) },
  { title: 'Office Ready', copy: 'Breathable kurtis, crisp shirt dresses and tailored trousers that work as hard as you do.', image: img('1585487000160-6ebcfceb0d03', 700) },
  { title: 'Weekend Brunch', copy: 'Flowy midis, florals and co-ords made for slow mornings and long conversations.', image: img('1496747611176-843222e1e57c', 700) },
  { title: 'Party Nights', copy: 'Velvet, lace and statement reds that turn heads from the first step in.', image: img('1595777457583-95e059d581b8', 700) },
];

export const FEATURES = [
  { icon: 'leaf', title: 'Handpicked Every Week', copy: 'Each piece is personally selected for fabric, fit and finish — nothing makes the rail by accident.' },
  { icon: 'heart', title: 'Made for Every Body', copy: 'Sizes from XS to 3XL with honest guidance, so you shop for yourself, not a size chart.' },
  { icon: 'tag', title: 'Boutique Look, Fair Price', copy: 'Designer feel without the designer markup. Elegance should be everyday, not occasional.' },
  { icon: 'chat', title: 'Shop on WhatsApp', copy: 'See something you love? Message us for photos, sizes and videos before you visit.' },
];

export const STATS = [
  { value: 1200, suffix: '+', label: 'Styles curated' },
  { value: 5000, suffix: '+', label: 'Happy customers' },
  { value: 40, suffix: '+', label: 'New arrivals every month' },
  { value: 4.9, suffix: '★', label: 'Average love rating', decimals: 1 },
];

export const TESTIMONIALS = [
  { name: 'Priya S.', place: 'Sarjapura', quote: 'Found the perfect silk saree for my sister’s wedding. The staff helped me pick the blouse colour too — felt like shopping with a friend!' },
  { name: 'Ananya R.', place: 'Dommasandra', quote: 'My go-to for office kurtis. Great fabric, fits beautifully and the prices are so reasonable. I always leave with one extra piece!' },
  { name: 'Divya M.', place: 'Electronic City', quote: 'I messaged on WhatsApp, got photos within minutes and picked it up the same evening. Loved the service.' },
  { name: 'Shalini K.', place: 'Bellandur', quote: 'The collection keeps changing every time I visit. The co-ord sets and dresses are so trendy, you won’t find them everywhere.' },
  { name: 'Meghana P.', place: 'Attibele', quote: 'Bought an anarkali for Diwali and got so many compliments. Topicks is now my festive shopping stop.' },
];

export const LOOKS = [
  { title: 'The Heirloom Edit', season: 'Festive 2026', image: img('1617627143750-d86bc21e42bb', 1100), copy: 'Kanjivaram-inspired silks with gold zari, styled with temple jewellery for the season of lights.' },
  { title: 'Garden Party', season: 'Summer Story', image: img('1609357605129-26f69add5d6e', 1100), copy: 'Breezy greens and soft florals inspired by the leaves of our logo — growth, freshness and joy.' },
  { title: 'Scarlet Hour', season: 'Evening Wear', image: img('1595777457583-95e059d581b8', 1100), copy: 'Our signature red, in flowing gowns made to twirl in. Confidence, in colour form.' },
  { title: 'Modern Muse', season: 'Workwear', image: img('1617019114583-affb34d1b3cd', 1100), copy: 'Clean linen, relaxed tailoring and neutral palettes for the woman who runs the room.' },
  { title: 'Ivory Grace', season: 'Ethnic Classics', image: img('1583391733956-3750e0ff4e8b', 1100), copy: 'Chikankari anarkalis and soft dupattas — timeless pieces that pass between generations.' },
];

export const GALLERY = [
  img('1581044777550-4cfa60707c03', 700),
  img('1610030469983-98e550d6193c', 700),
  img('1566174053879-31528523f8ae', 700),
  img('1622122201714-77da0ca8e5d2', 700),
  img('1539109136881-3be0616acf4b', 700),
  img('1612336307429-8a898d10e223', 700),
  img('1597983073493-88cd35cf93b0', 700),
  img('1551803091-e20673f15770', 700),
];

export const STORE_IMAGES = {
  rack: img('1490481651871-ab68de25d43d', 1400),
  store: img('1567401893414-76b7b1e5a7a5', 1400),
  boutique: img('1445205170230-053b83016050', 1400),
  neutrals: img('1558769132-cb1aea458c5e', 1200),
  prints: img('1520006403909-838d6b92c22e', 1200),
  shopper: img('1483985988355-763728e1935b', 1000),
};

export const FAQS = [
  { q: 'What are your store timings?', a: 'We are open all days, 10:00 AM – 9:30 PM. Festive season timings may extend — drop us a WhatsApp to confirm.' },
  { q: 'Can I order on WhatsApp?', a: 'Yes! Message us on 87921 95368 with the product name or a screenshot. We share photos, videos and sizes, and help you reserve it for pickup.' },
  { q: 'Do you offer tailoring and alterations?', a: 'Yes! We stitch blouses, salwar sets, lehengas and custom designs, and do alterations on any garment. See our Tailoring page or pick “Tailoring” in the enquiry form.' },
  { q: 'What sizes do you stock?', a: 'Most styles are available from XS to 3XL. Size availability varies by design, so check with us for a specific piece.' },
  { q: 'What is your exchange policy?', a: 'Unused items with tags can be exchanged within 7 days with the bill. Sale items may be final — just ask at billing.' },
];

// ---------- Tailoring ----------
export const TAILORING_SERVICES = [
  { t: 'Blouse stitching', c: 'Designer and simple blouses: princess cut, boat neck, padded, back-open and more, matched to your saree.', e: '01' },
  { t: 'Salwar & churidar sets', c: 'Kurtis, salwars, churidars and palazzo sets stitched to your exact measurements.', e: '02' },
  { t: 'Lehengas & gowns', c: 'Festive lehengas, anarkalis and gowns, with lining, cancan and finishing done right.', e: '03' },
  { t: 'Alterations', c: 'Take-ins, let-outs, length changes and refits for store-bought or old favourites.', e: '04' },
  { t: 'Saree fall & pico', c: 'Neat fall stitching, pico edging and pre-pleating so your saree is ready to drape.', e: '05' },
  { t: 'Custom designs', c: 'Bring a picture or an idea. We help with fabric, cut and detailing to make it yours.', e: '06' },
];

export const TAILORING_STEPS = [
  { n: '01', t: 'Share your idea', c: 'Send a design photo or describe what you want on WhatsApp, or walk into the store.' },
  { n: '02', t: 'Get measured', c: 'We take measurements in-store, or you can share a well-fitting garment for reference.' },
  { n: '03', t: 'We stitch', c: 'Our tailors cut and stitch with care. We confirm the delivery date upfront.' },
  { n: '04', t: 'Trial & pickup', c: 'Try it on in-store. Any small fitting touch-ups are done before you take it home.' },
];

export const TAILORING_FAQS = [
  { q: 'How long does stitching take?', a: 'Most blouses and kurti sets are ready in 5–7 days. Bridal and festive orders may take longer, so message us early during wedding and festive seasons.' },
  { q: 'Can I bring my own fabric?', a: 'Yes. Bring your own fabric, or pick from what we have in store and we will stitch it for you.' },
  { q: 'Do I need to visit for measurements?', a: 'Visiting is best for a perfect fit. If you cannot, share a garment that fits you well and we will take measurements from it.' },
  { q: 'How much does it cost?', a: 'Pricing depends on the design, lining and detailing. Send us the design on WhatsApp and we will share a quote.' },
  { q: 'Do you alter clothes not bought at Topicks?', a: 'Yes, we take alteration work for any garment, not just ones bought from our store.' },
];
