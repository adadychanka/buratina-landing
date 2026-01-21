'use client';

import { useEffect } from 'react';

/**
 * Restores scroll position when the page is reloaded with a ?_scroll=Y param.
 * Used for preserving scroll between locale switches that trigger full reloads.
 */
export function ScrollRestorer() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const url = new URL(window.location.href);
      const scrollParam = url.searchParams.get('_scroll');

      if (!scrollParam) return;

      const scrollY = Number.parseInt(scrollParam, 10);
      if (!Number.isFinite(scrollY) || scrollY < 0) {
        url.searchParams.delete('_scroll');
        window.history.replaceState({}, '', url.toString());
        return;
      }

      window.scrollTo({
        top: scrollY,
        behavior: 'smooth',
      });

      url.searchParams.delete('_scroll');
      window.history.replaceState({}, '', url.toString());
    } catch {
      // If URL parsing fails for any reason, silently ignore
    }
  }, []);

  return null;
}
