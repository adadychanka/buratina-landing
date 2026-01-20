import { ScrollToButton } from '@/components/ui/scroll-to-button';
import { getTranslations } from 'next-intl/server';

/**
 * Events section - Information about events and conditions
 * Features description of event formats, conditions, and CTA button
 * Server component with client-side interactive button
 */
export async function Events() {
  const t = await getTranslations('Events');

  return (
    <section id="events" className="bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="mb-12 text-center font-bold font-serif text-4xl text-foreground md:text-5xl">
          {t('title')}
        </h2>

        <div className="mx-auto max-w-4xl space-y-12">
          {/* Event Formats */}
          <div>
            <h3 className="mb-4 font-semibold font-serif text-2xl text-foreground">
              {t('formatsTitle')}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">{t('formats')}</p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• {t('formatsList.birthday')}</li>
              <li>• {t('formatsList.corporate')}</li>
              <li>• {t('formatsList.privateParty')}</li>
              <li>• {t('formatsList.concert')}</li>
              <li>• {t('formatsList.lecture')}</li>
              <li>• {t('formatsList.photoshoot')}</li>
            </ul>
          </div>

          {/* Conditions */}
          <div>
            <h3 className="mb-4 font-semibold font-serif text-2xl text-foreground">
              {t('conditionsTitle')}
            </h3>
            <p className="mb-4 text-lg text-muted-foreground leading-relaxed">{t('conditions')}</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('conditionsList.capacity')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('conditionsList.deposit')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('conditionsList.duration')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('conditionsList.equipment')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('conditionsList.catering')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('conditionsList.specialMenu')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <ScrollToButton targetId="contact" size="lg">
            {t('cta')}
          </ScrollToButton>
        </div>
      </div>
    </section>
  );
}
