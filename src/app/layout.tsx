import type { Metadata } from 'next';
import './globals.css';

/**
 * Root layout for Next.js App Router
 * Must contain <html> and <body> tags
 * Default locale is 'en' - actual locale is set by middleware and locale layout
 */
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
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
