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
    <section id="location" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold font-serif text-center mb-12 text-foreground">
          {t('title')}
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Left Column - Information */}
          <div className="space-y-8">
            {/* Address */}
            <div>
              <h3 className="text-2xl font-semibold font-serif mb-4 text-foreground">
                {t('address')}
              </h3>
              <p className="text-lg text-muted-foreground">{address}</p>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className="text-2xl font-semibold font-serif mb-4 text-foreground">
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
              <h3 className="text-2xl font-semibold font-serif mb-4 text-foreground">
                {t('directions')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('directionsText')}
                {/* TODO: Add actual directions text */}
              </p>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="relative h-[400px] rounded-lg overflow-hidden border">
            {/* Placeholder for Google Maps */}
            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
              <div className="text-center">
                <p className="text-neutral-400 mb-2">{t('mapPlaceholder')}</p>
                <p className="text-sm text-neutral-500">{t('mapIntegration')}</p>
                <p className="text-xs text-neutral-500 mt-2">
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
