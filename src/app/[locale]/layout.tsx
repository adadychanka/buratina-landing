import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HtmlLang } from '@/components/layout/HtmlLang';

/**
 * Locale-specific layout
 * Validates locale and provides translations to all child components
 * Note: <html> and <body> are in root layout.tsx
 */
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale - return 404 if invalid
  if (!routing.locales.includes(locale as 'en' | 'ru' | 'sr')) {
    notFound();
  }

  // Load messages for the locale
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlLang />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
