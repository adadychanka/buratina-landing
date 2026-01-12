import type { Metadata } from 'next';
import './globals.css';

/**
 * Root layout for Next.js App Router
 * This layout is minimal - locale-specific layout is in [locale]/layout.tsx
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
  return children;
}
