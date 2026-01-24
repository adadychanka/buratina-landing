import { EventCard } from '@/components/sections/EventCard';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'EventExamples' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

/**
 * Past Events page - Full showcase of all successful events
 * Displays all 6 event case studies with complete details
 * Uses reusable EventCard component in compact variant with carousel support
 */
export default async function PastEventsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('EventExamples');

  // Define all events with their images
  // TODO: Replace with actual image paths when photos are available
  const events = [
    {
      key: 'birthday' as const,
      images: ['placeholder-1', 'placeholder-2', 'placeholder-3'],
    },
    {
      key: 'corporate' as const,
      images: ['placeholder-1', 'placeholder-2'],
    },
    {
      key: 'concert' as const,
      images: ['placeholder-1', 'placeholder-2', 'placeholder-3', 'placeholder-4'],
    },
    {
      key: 'privateParty' as const,
      images: ['placeholder-1', 'placeholder-2'],
    },
    {
      key: 'cultural' as const,
      images: ['placeholder-1', 'placeholder-2', 'placeholder-3'],
    },
    {
      key: 'photoshoot' as const,
      images: ['placeholder-1'],
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        {/* Page Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="mb-4 font-bold font-serif text-4xl text-foreground md:text-5xl">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{t('subtitle')}</p>
        </div>

        {/* Event Cards Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event.key}
              cardKey={event.key}
              variant="compact"
              images={event.images}
            />
          ))}
        </div>

        {/* Back to Home */}
        <div className="mt-16 text-center">
          <Link
            href="/#event-examples"
            className="inline-flex items-center justify-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <span>←</span>
            <span>{t('backToHome')}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
