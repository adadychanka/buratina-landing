import { defineRouting } from 'next-intl/routing';

/**
 * Internationalization routing configuration
 * Defines supported locales and URL structure
 */
export const routing = defineRouting({
  // Supported locales: English, Russian, Serbian
  locales: ['en', 'ru', 'sr'],

  // Default locale (English) - used as fallback
  defaultLocale: 'en',

  // URL prefix strategy: 'as-needed' means default locale (en) has no prefix
  // Other locales will have prefix: /ru/, /sr/
  localePrefix: 'as-needed',

  // Enable locale detection from Accept-Language header
  // This will automatically detect user's preferred language from browser
  localeDetection: true,
});
