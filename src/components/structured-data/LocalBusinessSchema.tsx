/**
 * LocalBusiness Structured Data Component
 * Implements Schema.org BarOrPub markup for SEO and AI platforms
 * @see https://schema.org/BarOrPub
 * @see https://schema.org/LocalBusiness
 */
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    name: 'Buratina Bar',
    description:
      'The most mystical bar in Belgrade. Experience unique atmosphere, creative cocktails, and host unforgettable events.',
    url: 'https://buratina-bar.com',
    telephone: '+381611096732',
    email: 'barburatina@gmail.com',
    priceRange: '$$',
    servesCuisine: ['Cocktails', 'Drinks'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Svetogorska 46',
      addressLocality: 'Belgrade',
      addressRegion: 'Belgrade',
      postalCode: '11103',
      addressCountry: 'RS',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.8127834,
      longitude: 20.4699155,
    },
    openingHours: [
      'Mo 18:00-02:00',
      'Tu 18:00-02:00',
      'We 18:00-02:00',
      'Th 18:00-02:00',
      'Fr 18:00-02:00',
      'Sa 18:00-02:00',
      'Su 18:00-02:00',
    ],
    sameAs: [
      'https://www.instagram.com/buratina_bar/',
      'https://www.facebook.com/buratinabar',
      'https://www.tiktok.com/@buratina_bar',
      'https://www.threads.net/@buratina_bar',
    ],
    image: [
      'https://buratina-bar.com/images/hero/hero-banner-2560.jpg',
      'https://buratina-bar.com/images/about/IMG_5165.JPG',
      'https://buratina-bar.com/images/about/IMG_5214.JPG',
    ],
    acceptsReservations: true,
    menu: 'https://buratina-bar.com/menu/menu.en.pdf',
    // Add aggregate rating when reviews are available
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: 4.8,
    //   reviewCount: 127,
    // },
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data, schema is statically defined
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
