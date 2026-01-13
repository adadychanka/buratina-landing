import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

/**
 * Next.js middleware for internationalization routing
 * Handles locale detection and URL rewriting
 *
 * Features:
 * - Detects locale from Accept-Language header
 * - Falls back to default locale (en) if no match
 * - Rewrites URLs to include locale prefix when needed
 */
export default createMiddleware(routing);

/**
 * Middleware configuration
 * Matches all paths except:
 * - API routes (/api)
 * - Next.js internal paths (_next, _vercel)
 * - Files with extensions (favicon.ico, etc.)
 */
export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
