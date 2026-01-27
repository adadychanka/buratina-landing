/**
 * Organization Structured Data Component
 * Implements Schema.org Organization markup for brand identity
 * @see https://schema.org/Organization
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Buratina Bar',
    url: 'https://buratina-bar.com',
    logo: 'https://buratina-bar.com/icon.svg',
    description:
      'The most mystical bar in Belgrade. Experience unique atmosphere, creative cocktails, and host unforgettable events at Buratina Bar.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Svetogorska 46',
      addressLocality: 'Belgrade',
      addressRegion: 'Belgrade',
      postalCode: '11103',
      addressCountry: 'RS',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+381611096732',
      email: 'barburatina@gmail.com',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Serbian', 'Russian'],
    },
    sameAs: [
      'https://www.instagram.com/buratina_bar/',
      'https://www.facebook.com/buratinabar',
      'https://www.tiktok.com/@buratina_bar',
      'https://www.threads.net/@buratina_bar',
    ],
    foundingDate: '2023',
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Belgrade',
        addressCountry: 'RS',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data, schema is statically defined
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
