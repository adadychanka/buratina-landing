import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { BreadcrumbSchema, breadcrumbs } from '@/components/structured-data/BreadcrumbSchema';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PrivacyPolicy' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://buratina-bar.com';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePath}/privacy-policy`;

  return {
    title: t('title'),
    description: t('description'),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/privacy-policy`,
        sr: `${baseUrl}/sr/privacy-policy`,
        ru: `${baseUrl}/ru/privacy-policy`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: url,
      siteName: 'Buratina Bar',
      locale: locale,
      type: 'website',
    },
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('PrivacyPolicy');
  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <BreadcrumbSchema items={breadcrumbs.privacyPolicy(locale)} />

      <section className="bg-background py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="mb-4 font-bold font-serif text-4xl text-foreground md:text-5xl">
          {t('title')}
        </h1>
        <p className="mb-8 text-muted-foreground text-sm">{t('lastUpdated')}</p>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
