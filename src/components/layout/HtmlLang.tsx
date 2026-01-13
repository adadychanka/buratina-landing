'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

/**
 * Client component to update html lang attribute based on current locale
 * This is needed because html tag is in root layout (server component)
 */
export function HtmlLang() {
  const locale = useLocale();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}
