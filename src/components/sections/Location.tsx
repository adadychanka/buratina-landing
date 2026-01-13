import { useTranslations } from 'next-intl';

/**
 * Location section - How to find us
 * Features address, opening hours, directions, and embedded map
 */
export function Location() {
  const t = useTranslations('Location');

  // TODO: Replace with actual address and coordinates
  const address = 'Belgrade, Serbia';
  const coordinates = { lat: 44.7866, lng: 20.4489 }; // Example coordinates

  return (
    <section id="location" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          {t('title')}
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Left Column - Information */}
          <div className="space-y-8">
            {/* Address */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">{t('address')}</h3>
              <p className="text-lg text-muted-foreground">{address}</p>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">{t('hours')}</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Monday - Thursday: 18:00 - 02:00</p>
                <p>Friday - Saturday: 18:00 - 03:00</p>
                <p>Sunday: 18:00 - 01:00</p>
              </div>
            </div>

            {/* Directions */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">{t('directions')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                Detailed directions on how to reach the bar will be provided here.
                {/* TODO: Add actual directions text */}
              </p>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="relative h-[400px] rounded-lg overflow-hidden border">
            {/* Placeholder for Google Maps */}
            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
              <div className="text-center">
                <p className="text-neutral-400 mb-2">Map will be embedded here</p>
                <p className="text-sm text-neutral-500">
                  Google Maps or Leaflet integration
                </p>
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
