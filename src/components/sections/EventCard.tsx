'use client';

import { ImageCarousel } from '@/components/ui/image-carousel';
import { useTranslations } from 'next-intl';

type EventCardProps = {
  cardKey: 'birthday' | 'corporate' | 'concert' | 'privateParty' | 'cultural' | 'photoshoot';
  variant?: 'default' | 'compact';
  images?: string[]; // Array of image paths/placeholders
};

/**
 * Reusable event card component
 * Displays event information with image carousel, title, description, and highlights
 * Can be rendered in different variants (default for homepage, compact for grid views)
 * Supports multiple images via carousel
 */
export function EventCard({ cardKey, variant = 'default', images = [] }: EventCardProps) {
  const t = useTranslations('EventExamples');

  const titleSize = variant === 'compact' ? 'text-xl' : 'text-2xl';
  const descriptionSize = variant === 'compact' ? 'text-sm' : 'text-base';
  const highlightTitleSize = variant === 'compact' ? 'text-xs' : 'text-sm';
  const highlightItemSize = variant === 'compact' ? 'text-xs' : 'text-sm';
  const highlightGrid =
    variant === 'compact' ? 'space-y-2' : 'grid grid-cols-1 gap-2 sm:grid-cols-2';

  // Default to single placeholder if no images provided
  const eventImages = images.length > 0 ? images : ['placeholder'];

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-md transition-all hover:border-primary/50 hover:shadow-xl">
      {/* Featured Image Carousel */}
      <div className="relative">
        <ImageCarousel images={eventImages} alt={t(`cards.${cardKey}.eventType`)} />
        {/* Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="rounded-full bg-primary/90 px-4 py-1.5 font-medium text-primary-foreground text-xs backdrop-blur-sm">
            {t(`cards.${cardKey}.eventType`)}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Title and Meta */}
        <div className="mb-4">
          <h3
            className={`mb-2 font-bold font-serif text-foreground transition-colors group-hover:text-primary ${titleSize}`}
          >
            {t(`cards.${cardKey}.title`)}
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
            <span className="flex items-center gap-1">
              <span className="text-primary">📅</span>
              {t(`cards.${cardKey}.date`)}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-primary">👥</span>
              {t(`cards.${cardKey}.guests`)}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className={`mb-4 flex-1 text-muted-foreground leading-relaxed ${descriptionSize}`}>
          {t(`cards.${cardKey}.description`)}
        </p>

        {/* Highlights */}
        <div className="border-border border-t pt-4">
          <h4
            className={`mb-3 font-semibold text-foreground uppercase tracking-wide ${highlightTitleSize}`}
          >
            Highlights
          </h4>
          <ul className={highlightGrid}>
            {[0, 1, 2, 3].map((i) => {
              const highlightKey = `cards.${cardKey}.highlights.${i}`;
              try {
                const highlight = t(highlightKey);
                return (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0 text-primary text-xs">✓</span>
                    <span className={`text-muted-foreground ${highlightItemSize}`}>
                      {highlight}
                    </span>
                  </li>
                );
              } catch {
                return null;
              }
            })}
          </ul>
        </div>
      </div>
    </article>
  );
}
