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
            <h3 className="text-2xl font-semibold font-serif mb-4 text-foreground">Event Formats</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('formats')}
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• Birthdays</li>
              <li>• Corporate events</li>
              <li>• Private parties</li>
              <li>• Concerts / DJ sets</li>
              <li>• Lectures</li>
              <li>• Photoshoots</li>
            </ul>
          </div>

          {/* Conditions */}
          <div>
            <h3 className="text-2xl font-semibold font-serif mb-4 text-foreground">Conditions</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {t('conditions')}
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Capacity: Up to 200 guests</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Minimum deposit required</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Event duration: Flexible</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Available equipment: Sound system, lighting</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Catering options: Partner catering or own food</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Special menu available</span>
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
