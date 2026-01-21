'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { routing } from '@/i18n/routing';
import { useLocale } from 'next-intl';

/**
 * Language switcher component
 * Allows users to switch between supported locales (EN, RU, SR)
 */
export function LanguageSwitcher() {
  const locale = useLocale();

  const switchLocale = (newLocale: string) => {
    // Preserve current scroll position via URL param so we can restore it after reload
    const scrollY = window.scrollY;

    const url = new URL(window.location.href);
    const segments = url.pathname.split('/').filter(Boolean);

    // Find and replace locale segment
    const localeIndex = segments.findIndex((seg) =>
      routing.locales.includes(seg as 'en' | 'ru' | 'sr')
    );

    if (localeIndex !== -1) {
      segments[localeIndex] = newLocale;
    } else {
      // If no locale in path, prepend it
      segments.unshift(newLocale);
    }

    url.pathname = `/${segments.join('/')}`;
    url.searchParams.set('_scroll', String(scrollY));

    // Use full page reload to ensure translations are loaded correctly
    // Scroll position will be restored by ScrollRestorer on the next page
    window.location.href = url.toString();
  };

  const localeLabels: Record<string, string> = {
    en: 'EN',
    ru: 'RU',
    sr: 'SR',
  };

  return (
    <Select value={locale} onValueChange={switchLocale}>
      <SelectTrigger
        className="w-[80px]"
        aria-label="Change language"
        title="Change language"
      >
        <SelectValue placeholder={localeLabels[locale] || 'EN'} />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {localeLabels[loc]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
