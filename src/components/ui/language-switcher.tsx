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
    // Get current full pathname with locale
    const currentPath = window.location.pathname;
    const segments = currentPath.split('/').filter(Boolean);

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

    // Use full page reload to ensure translations are loaded correctly
    // This is necessary because Next.js App Router doesn't always reload
    // server components when locale changes via client-side navigation
    const newPath = `/${segments.join('/')}${window.location.search}`;
    window.location.href = newPath;
  };

  const localeLabels: Record<string, string> = {
    en: 'EN',
    ru: 'RU',
    sr: 'SR',
  };

  return (
    <Select value={locale} onValueChange={switchLocale}>
      <SelectTrigger className="w-[80px]">
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
