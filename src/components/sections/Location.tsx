import { getTranslations } from 'next-intl/server';

/**
 * Location section - How to find us
 * Features address, opening hours, directions, and embedded map
 * Server component - no client-side interactivity needed
 */
export async function Location() {
  const t = await getTranslations('Location');

  // TODO: Replace with actual address and coordinates
  const address = 'Belgrade, Serbia';
  const coordinates = { lat: 44.7866, lng: 20.4489 }; // Example coordinates

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
          <div className="relative h-[400px] overflow-hidden rounded-lg border">
            {/* Placeholder for Google Maps */}
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 dark:bg-neutral-800">
              <div className="text-center">
                <p className="mb-2 text-neutral-400">{t('mapPlaceholder')}</p>
                <p className="text-neutral-500 text-sm">{t('mapIntegration')}</p>
                <p className="mt-2 text-neutral-500 text-xs">
                  Coordinates: {coordinates.lat}, {coordinates.lng}
                </p>
              </div>
            </div>
            {/* TODO: Add Google Maps or Leaflet component */}
          </div>
        </div>
      </div>
    </section>
  );
}
