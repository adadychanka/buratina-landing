import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/**
 * Next.js configuration
 * Integrated with next-intl for internationalization
 * Configured for react-pdf compatibility
 */
const nextConfig = {
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
