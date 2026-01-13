'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/**
 * Language switcher component
 * Allows users to switch between supported locales (EN, RU, SR)
 */
export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = (newLocale: string) => {
    // Replace locale in pathname
    const segments = pathname.split('/');
    const currentLocaleIndex = segments.findIndex((seg) =>
      routing.locales.includes(seg as 'en' | 'ru' | 'sr')
    );

    if (currentLocaleIndex !== -1) {
      segments[currentLocaleIndex] = newLocale;
    } else {
      // If no locale in path (default locale), prepend it
      segments.splice(1, 0, newLocale);
    }

    const newPath = segments.join('/');
    router.push(newPath);
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
