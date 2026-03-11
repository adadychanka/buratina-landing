import { ScrollToButton } from '@/components/ui/scroll-to-button';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

/**
 * Events section - Private event hosting information
 * Features key facts, CTAs, and event formats
 * Server component with client-side interactive button
 */
export async function Events() {
  const t = await getTranslations('Events');

  const eventFormats = [
    'birthday',
    'corporate',
    'privateParty',
    'concert',
    'lecture',
    'photoshoot',
  ] as const;

  const keyFactsBullet = ['capacity', 'formats', 'offer'] as const;

  return (
    <section id="events" className="bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Hero Introduction */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="mb-4 font-bold font-serif text-4xl text-foreground md:text-5xl">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t('subtitle')}</p>
        </div>

        {/* Key Facts */}
        <div className="mx-auto mb-10 max-w-3xl">
          <h3 className="mb-8 text-center font-semibold font-serif text-3xl text-foreground">
            {t('keyFactsTitle')}
          </h3>
          <div className="flex flex-col gap-6">
            {keyFactsBullet.map((key) => (
              <div
                key={key}
                className="rounded-lg border border-[#592926] bg-[rgba(62,42,30,0.3)] p-6"
              >
                <h4 className="mb-3 font-semibold text-foreground">{t(`keyFacts.${key}.title`)}</h4>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground text-sm leading-relaxed">
                  {(t.raw(`keyFacts.${key}.items`) as string[]).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            {/* How to Book card — paragraph instead of bullet list */}
            <div className="rounded-lg border border-[#592926] bg-[rgba(62,42,30,0.3)] p-6">
              <h4 className="mb-3 font-semibold text-foreground">{t('keyFacts.booking.title')}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('keyFacts.booking.description')}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mb-20 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
          <ScrollToButton targetId="contact" size="lg">
            {t('cta')}
          </ScrollToButton>
          <Link
            href="/past-events"
            className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-[#93251f] bg-transparent px-8 py-3 font-medium text-[#93251f] transition-all hover:bg-[#93251f] hover:text-foreground"
          >
            {t('viewPastEvents')}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Event Formats Grid */}
        <div className="mx-auto max-w-6xl">
          <h3 className="mb-8 text-center font-semibold font-serif text-3xl text-foreground">
            {t('formatsTitle')}
          </h3>
          <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
            {t('formatsDescription')}
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {eventFormats.map((format) => (
              <div
                key={format}
                className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <h4 className="mb-3 font-semibold font-serif text-foreground text-xl transition-colors group-hover:text-primary">
                  {t(`formats.${format}.title`)}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`formats.${format}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
