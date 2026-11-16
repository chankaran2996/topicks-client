import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from './SmoothScroll';

// Resets scroll after the page-exit animation finishes.
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const t = setTimeout(() => {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    }, 420);
    return () => clearTimeout(t);
  }, [pathname, lenis]);

  return null;
}
