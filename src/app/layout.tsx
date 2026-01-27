import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

/**
 * Root layout for Next.js App Router
 * Must contain <html> and <body> tags
 * Default locale is 'en' - actual locale is set by middleware and locale layout
 */

// Theatrical serif font for headings
const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

// Clean sans-serif font for body text
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

/**
 * Viewport configuration for responsive design and PWA
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F5F5' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
};

/**
 * Basic metadata for root layout
 * More detailed metadata is in locale-specific layout
 */
export const metadata: Metadata = {
  title: 'Buratina Bar',
  description: 'The most mystical bar in Belgrade',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfairDisplay.variable} ${inter.variable}`}
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
