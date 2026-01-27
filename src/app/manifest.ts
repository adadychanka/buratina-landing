import type { MetadataRoute } from 'next';

/**
 * Web App Manifest for PWA support
 * Enables "Add to Home Screen" functionality
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 * @see https://web.dev/add-manifest/
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Buratina Bar - The Most Mystical Bar in Belgrade',
    short_name: 'Buratina Bar',
    description:
      'Experience the mystical atmosphere of Buratina Bar in Belgrade. Book a table, host events, and enjoy our unique cocktails and menu.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1a1a',
    theme_color: '#1a1a1a',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['entertainment', 'food', 'lifestyle'],
    lang: 'en',
    dir: 'ltr',
  };
}
