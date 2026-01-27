import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/**
 * Next.js configuration
 * Integrated with next-intl for internationalization
 * Configured for react-pdf compatibility
 * Optimized for AI crawler timeouts (1-5 seconds) and GEO
 */
const nextConfig = {
  // Enable gzip compression for faster load times
  compress: true,

  // Image optimization for performance and AI crawlers
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year cache
  },

  // Optimize CSS for faster initial page loads
  experimental: {
    optimizeCss: true,
  },

  webpack: (config) => {
    // Exclude pdfjs-dist from server-side bundle
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
      fs: false,
    };

    return config;
  },
};

export default withNextIntl(nextConfig);
