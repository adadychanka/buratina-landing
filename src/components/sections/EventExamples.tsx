'use client';

import { EventCard } from '@/components/sections/EventCard';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

/**
 * EventExamples section - Showcase of successful past events (homepage preview)
 * Features card-based layout with photos, descriptions, and highlights
 * Shows limited cards with link to full past events page
 * Uses reusable EventCard component with carousel support
 */
export function EventExamples() {
  const t = useTranslations('EventExamples');

  // Define events with their images
  // TODO: Replace with actual image paths when photos are available
  const events = [
    {
      key: 'birthday' as const,
      images: ['placeholder-1', 'placeholder-2', 'placeholder-3'], // 3 images for birthday
    },
    {
      key: 'corporate' as const,
      images: ['placeholder-1', 'placeholder-2'], // 2 images for corporate
    },
    {
      key: 'concert' as const,
      images: ['placeholder-1'], // Single image for concert
    },
    {
      key: 'privateParty' as const,
      images: ['placeholder-1', 'placeholder-2', 'placeholder-3', 'placeholder-4'], // 4 images
    },
  ];

  return (
    <section id="event-examples" className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 font-bold font-serif text-4xl text-foreground md:text-5xl">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        {/* Event Cards Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
          {events.map((event, index) => (
            <div key={event.key} className={index === 3 ? 'hidden md:block' : ''}>
              <EventCard cardKey={event.key} variant="default" images={event.images} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/past-events"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
