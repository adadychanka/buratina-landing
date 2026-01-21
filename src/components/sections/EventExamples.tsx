import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

/**
 * EventExamples section - Gallery of past events
 * Features photos/videos from previous events with optional descriptions
 * Server component - hover effects work via CSS
 */
export async function EventExamples() {
  const t = await getTranslations('EventExamples');

  // TODO: Replace with actual images
  const eventImages = [
    { src: '/images/events/1.jpg', alt: 'Event 1', descriptionKey: 'birthday' },
    { src: '/images/events/2.jpg', alt: 'Event 2', descriptionKey: 'corporate' },
    { src: '/images/events/3.jpg', alt: 'Event 3', descriptionKey: 'concert' },
    { src: '/images/events/4.jpg', alt: 'Event 4', descriptionKey: 'privateParty' },
  ];

  return (
    <section id="event-examples" className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="mb-12 text-center font-bold font-serif text-4xl text-foreground md:text-5xl">
          {t('title')}
        </h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {eventImages.map((image) => (
            <div key={image.src} className="group relative aspect-[4/3] overflow-hidden rounded-lg">
              {/* Placeholder for images */}
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                <span className="text-neutral-700 text-sm dark:text-neutral-200">
                  {image.alt}
                </span>
              </div>
              {/* TODO: Replace with actual Image component when images are available */}
              {/* <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                loading="lazy"
              /> */}

              {/* Description overlay */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="font-medium text-sm text-white">
                  {t(`descriptions.${image.descriptionKey}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
