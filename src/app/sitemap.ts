import { routing } from '@/i18n/routing';
import type { MetadataRoute } from 'next';

/**
 * Generate sitemap.xml for SEO
 * Includes all locales and main pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://buratina-bar.com';

  const routes = ['', '/past-events', '/privacy-policy'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale
  routing.locales.forEach((locale) => {
    routes.forEach((route) => {
      const url = locale === 'en' ? `${baseUrl}${route}` : `${baseUrl}/${locale}${route}`;

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [
              loc,
              loc === 'en' ? `${baseUrl}${route}` : `${baseUrl}/${loc}${route}`,
            ])
          ),
        },
      });
    });
  });

  return sitemapEntries;
}
