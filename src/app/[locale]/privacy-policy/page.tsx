import { getTranslations } from 'next-intl/server';

export default async function PrivacyPolicyPage() {
  const t = await getTranslations('PrivacyPolicy');
  const paragraphs = t.raw('paragraphs') as string[];

  return (
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
  );
}
