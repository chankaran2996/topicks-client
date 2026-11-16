// Central business details for Topicks. Update here and the whole site follows.
export const SITE = {
  name: 'Topicks',
  tagline: 'A Feminine Clothing Store',
  phone: '8792195368',
  phoneDisplay: '+91 87921 95368',
  whatsapp: '918792195368',
  email: 'topicks.wk@gmail.com',
  instagram: 'https://www.instagram.com/topicks.wk?mdxt=bG16YWp4NTBzNnoz',
  instagramHandle: '@topicks.wk',
  facebook: 'https://www.facebook.com/share/1F2PqTYxkw/',
  mapLink: 'https://maps.app.goo.gl/uBoFk5DMp69u6ocj9?g_st=ac',
  mapEmbed:
    'https://www.google.com/maps?q=Topicks+-+A+Feminine+Clothing+Store,+Sarjapura+-+Bagalur+Road,+Sarjapura,+Bengaluru,+Karnataka+562125&output=embed',
  address: {
    line1: 'Sarjapura – Bagalur Road,',
    line2: 'Near SNR Variety Apartment, Sarjapura,',
    line3: 'Anekal Taluk, Bengaluru, Karnataka 562125',
  },
};

export const waLink = (message = 'Hi Topicks! I would like to know more about your collection.') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/collections', label: 'Collections' },
  { to: '/lookbook', label: 'Lookbook' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Visit Us' },
];

export const img = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
