import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Buratina Bar',
  description: 'The most mystical bar in Belgrade',
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
