import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { HtmlLang } from '@/components/layout/HtmlLang';
import { ScrollRestorer } from '@/components/layout/ScrollRestorer';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

/**
 * Locale-specific layout
 * Validates locale and provides translations to all child components
 * Note: <html> and <body> are in root layout.tsx
 */
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

/**
 * Generate metadata for SEO
 * Supports multilingual metadata
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://buratina-bar.com';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePath}`;

  return {
    title: 'Buratina Bar - The Most Mystical Bar in Belgrade',
    description:
      'Experience the mystical atmosphere of Buratina Bar in Belgrade. Book a table, host events, and enjoy our unique cocktails and menu.',
    keywords: ['bar', 'Belgrade', 'cocktails', 'events', 'restaurant', 'nightlife', 'Serbia'],
    authors: [{ name: 'Buratina Bar' }],
    openGraph: {
      type: 'website',
      locale: locale,
      url: url,
      siteName: 'Buratina Bar',
      title: 'Buratina Bar - The Most Mystical Bar in Belgrade',
      description: 'Experience the mystical atmosphere of Buratina Bar in Belgrade.',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Buratina Bar',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Buratina Bar - The Most Mystical Bar in Belgrade',
      description: 'Experience the mystical atmosphere of Buratina Bar in Belgrade.',
      images: [`${baseUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}`,
        ru: `${baseUrl}/ru`,
        sr: `${baseUrl}/sr`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale - return 404 if invalid
  if (!routing.locales.includes(locale as 'en' | 'ru' | 'sr')) {
    notFound();
  }

  // Set request locale so getMessages() knows which locale to use
  setRequestLocale(locale);

  // Load messages for the locale - use direct import to ensure correct locale
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <HtmlLang />
      <div className="flex min-h-screen flex-col">
        <ScrollRestorer />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
