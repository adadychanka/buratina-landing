import { NextIntlClientProvider } from 'next-intl';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';

/**
 * Locale-specific layout
 * Validates locale and provides translations to all child components
 */
export const metadata: Metadata = {
  title: 'Buratina Bar',
  description: 'The most mystical bar in Belgrade',
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale - return 404 if invalid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Load messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
