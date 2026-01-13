'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

/**
 * Events section - Information about events and conditions
 * Features description of event formats, conditions, and CTA button
 */
export function Events() {
  const t = useTranslations('Events');

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="events" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold font-serif text-center mb-12 text-foreground">
          {t('title')}
        </h2>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Event Formats */}
          <div>
            <h3 className="text-2xl font-semibold font-serif mb-4 text-foreground">
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
            <h3 className="text-2xl font-semibold font-serif mb-4 text-foreground">
              {t('conditionsTitle')}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">{t('conditions')}</p>
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
        <div className="text-center mt-12">
          <Button size="lg" onClick={scrollToContact}>
            {t('cta')}
          </Button>
        </div>
      </div>
    </section>
  );
}
