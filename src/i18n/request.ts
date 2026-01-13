import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

/**
 * Request-scoped configuration for next-intl
 * Provides locale and messages to Server Components
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // Get locale from URL or headers
  let locale = await requestLocale;

  // Validate locale - fallback to default if invalid
  if (!locale || !routing.locales.includes(locale as 'en' | 'ru' | 'sr')) {
    locale = routing.defaultLocale;
  }

  // Dynamically import messages for the locale
  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
