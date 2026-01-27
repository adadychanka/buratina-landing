import { getTranslations } from 'next-intl/server';

/**
 * FAQ Section with FAQPage Structured Data
 * Displays frequently asked questions in answer-first format for AI platforms
 * Includes JSON-LD schema for rich snippets in search results
 */
export async function FAQ() {
  const t = await getTranslations('FAQ');

  const faqs = [
    'hours',
    'reservation',
    'events',
    'capacity',
    'dress',
    'parking',
    'payment',
    'menu',
  ] as const;

  // Prepare FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((key) => ({
      '@type': 'Question',
      name: t(`questions.${key}.question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`questions.${key}.answer`),
      },
    })),
  };

  return (
    <>
      {/* FAQPage Structured Data */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data, schema is statically defined
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section id="faq" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 font-bold font-serif text-4xl text-foreground md:text-5xl">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
          </div>

          {/* FAQ Items - Answer-first format for AI */}
          <div className="mx-auto max-w-4xl space-y-6">
            {faqs.map((key) => (
              <div key={key} className="rounded-lg border border-border bg-card p-6">
                {/* Answer first (optimized for AI) */}
                <p className="mb-3 text-base text-foreground leading-relaxed">
                  <strong className="font-semibold">
                    {t(`questions.${key}.answer`).split('.')[0]}.
                  </strong>
                  {t(`questions.${key}.answer`).split('.').slice(1).join('.')}
                </p>

                {/* Question (for context) */}
                <p className="font-medium text-muted-foreground text-sm">
                  Q: {t(`questions.${key}.question`)}
                </p>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              {t('contactText')}{' '}
              <a
                href="tel:+381611096732"
                className="font-semibold text-primary hover:underline"
              >
                +381 61 1096732
              </a>{' '}
              or{' '}
              <a
                href="mailto:barburatina@gmail.com"
                className="font-semibold text-primary hover:underline"
              >
                barburatina@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
