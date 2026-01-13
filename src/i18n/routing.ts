import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Supported locales: English, Russian, Serbian
  locales: ['en', 'ru', 'sr'],

  // Default locale (English) - used as fallback
  defaultLocale: 'en',

  // URL prefix strategy:
  // 'always' - always show prefix (/en/, /ru/, /sr/)
  // This simplifies redirects from `/` because we can always target `/${locale}`
  localePrefix: 'always',

  // Enable locale detection from Accept-Language header
  // This will automatically detect user's preferred language from browser
  localeDetection: true,
});
