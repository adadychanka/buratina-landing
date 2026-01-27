import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

/**
 * Location section - How to find us
 * Features address, opening hours, directions, and embedded map
 * Server component - no client-side interactivity needed
 */
export async function Location() {
  const t = await getTranslations('Location');

  // Buratina Bar entrance address and coordinates
  const address = 'Svetogorska 46, 11103 Beograd, Serbia';
  const coordinates = { lat: 44.8127834, lng: 20.4699155 };

  return (
    <section id="location" className="bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="mb-12 text-center font-bold font-serif text-4xl text-foreground md:text-5xl">
          {t('title')}
        </h2>

        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          {/* Left Column - Information */}
          <div className="space-y-8">
            {/* Address */}
            <div>
              <h3 className="mb-4 font-semibold font-serif text-2xl text-foreground">
                {t('address')}
              </h3>
              <p className="text-lg text-muted-foreground">{address}</p>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className="mb-4 font-semibold font-serif text-2xl text-foreground">
                {t('hours')}
              </h3>
              <div className="space-y-2 text-muted-foreground">
                <p>{t('hoursList.closed')}</p>
                <p>{t('hoursList.weekday')}</p>
                <p>{t('hoursList.weekend')}</p>
                <p>{t('hoursList.sunday')}</p>
              </div>
            </div>

            {/* Directions */}
            <div>
              <h3 className="mb-4 font-semibold font-serif text-2xl text-foreground">
                {t('directions')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('directionsText')}
                {/* TODO: Add actual directions text */}
              </p>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="space-y-4">
            <div className="relative h-[400px] overflow-hidden rounded-lg border">
              <iframe
                title={t('title')}
                src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&hl=en&z=17&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
            <div className="space-y-1 text-center text-muted-foreground text-xs">
              <p>
                Coordinates: {coordinates.lat}, {coordinates.lng}
              </p>
              <p>
                <Link
                  href="https://maps.app.goo.gl/Z3yH99uPy9MUYEnR8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  {t('mapPlaceholder')}
                </Link>
              </p>
              <p>{t('mapIntegration')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
