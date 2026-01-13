'use client';

import { useRouter, usePathname } from 'next/navigation';
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

  // Extract locale from pathname to ensure it updates when URL changes
  // Since localePrefix is 'always', locale is always the first segment after root
  const getLocaleFromPathname = (): string => {
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];
    
    if (firstSegment && routing.locales.includes(firstSegment as 'en' | 'ru' | 'sr')) {
      return firstSegment;
    }
    
    return routing.defaultLocale;
  };

  const locale = getLocaleFromPathname();

  const switchLocale = (newLocale: string) => {
    // Replace locale in pathname
    const segments = pathname.split('/').filter(Boolean);
    const currentLocaleIndex = segments.findIndex((seg) =>
      routing.locales.includes(seg as 'en' | 'ru' | 'sr')
    );

    if (currentLocaleIndex !== -1) {
      segments[currentLocaleIndex] = newLocale;
    } else {
      // If no locale in path (default locale), prepend it
      segments.unshift(newLocale);
    }

    const newPath = '/' + segments.join('/');
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
