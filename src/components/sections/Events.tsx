import { ScrollToButton } from '@/components/ui/scroll-to-button';
import { getTranslations } from 'next-intl/server';

/**
 * Events section - Comprehensive information about event hosting
 * Features event formats, equipment, facilities, activities, and booking conditions
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

  const equipment = ['sound', 'lighting', 'space', 'technical', 'bar', 'atmosphere'] as const;

  const conditions = [
    'capacity',
    'deposit',
    'duration',
    'catering',
    'planning',
    'booking',
  ] as const;

  return (
    <section id="events" className="bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Hero Introduction */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 font-bold font-serif text-4xl text-foreground md:text-5xl">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t('subtitle')}</p>
        </div>

        {/* Event Formats Grid */}
        <div className="mx-auto mb-20 max-w-6xl">
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

        {/* Equipment & Facilities */}
        <div className="mx-auto mb-20 max-w-6xl">
          <h3 className="mb-10 text-center font-semibold font-serif text-3xl text-foreground">
            {t('equipmentTitle')}
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {equipment.map((item) => (
              <div key={item} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="font-bold text-lg text-primary">✓</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="mb-2 font-semibold text-foreground text-lg">
                    {t(`equipment.${item}.title`)}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(`equipment.${item}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conditions & Booking Info */}
        <div className="mx-auto mb-12 max-w-5xl">
          <h3 className="mb-10 text-center font-semibold font-serif text-3xl text-foreground">
            {t('conditionsTitle')}
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {conditions.map((condition) => (
              <div key={condition} className="rounded-lg border border-border bg-muted/30 p-6">
                <h4 className="mb-3 font-semibold text-foreground">
                  {t(`conditions.${condition}.title`)}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`conditions.${condition}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <ScrollToButton targetId="contact" size="lg">
            {t('cta')}
          </ScrollToButton>
        </div>
      </div>
    </section>
  );
}
