import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/**
 * Next.js configuration
 * Integrated with next-intl for internationalization
 */
const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
