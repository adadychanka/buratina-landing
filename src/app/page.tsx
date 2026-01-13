import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

/**
 * Root page - handles requests to `/` without an explicit locale.
 *
 * Behavior:
 * - Tries to detect user's language from the `Accept-Language` header.
 * - If it matches one of the supported locales (en, ru, sr), redirects to that locale:
 *   - `/en`, `/ru` or `/sr` (because `localePrefix: 'always'`).
 * - If detection fails or language is not supported, falls back to English (`/en`).
 */
export default function RootPage() {
  const headersList = headers();
  const acceptLanguage = headersList.get('accept-language');

  const detectedLocale = detectLocaleFromHeader(acceptLanguage);

  const supportedLocales = routing.locales as (typeof routing.locales)[number][];

  const finalLocale = supportedLocales.includes(detectedLocale as (typeof supportedLocales)[number])
    ? detectedLocale
    : routing.defaultLocale;

  redirect(`/${finalLocale}`);
}

/**
 * Very simple Accept-Language parser:
 * - Takes the first language tag before a comma
 * - Normalizes to primary language subtag (e.g. 'ru-RU' -> 'ru')
 */
function detectLocaleFromHeader(header: string | null): string {
  if (!header) return routing.defaultLocale;

  // Example header: "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7"
  const firstPart = header.split(',')[0]?.trim();
  if (!firstPart) return routing.defaultLocale;

  const primary = firstPart.split(';')[0]?.trim(); // remove any ;q=...
  const baseLang = primary.split('-')[0]?.toLowerCase(); // ru-RU -> ru

  if (baseLang === 'ru') return 'ru';
  if (baseLang === 'sr') return 'sr';
  if (baseLang === 'en') return 'en';

  return routing.defaultLocale;
}
