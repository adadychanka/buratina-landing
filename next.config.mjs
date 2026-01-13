import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/**
 * Next.js configuration
 * Integrated with next-intl for internationalization
 */
const nextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
