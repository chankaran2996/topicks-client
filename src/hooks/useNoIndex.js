import { useEffect } from 'react';

// Asks search engines not to index the current page (used on private pages).
export default function useNoIndex(title) {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    const prevTitle = document.title;
    if (title) document.title = title;
    return () => {
      meta.remove();
      document.title = prevTitle;
    };
  }, [title]);
}
