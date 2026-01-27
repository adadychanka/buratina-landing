/**
 * WebSite Structured Data Component
 * Implements Schema.org WebSite markup with SearchAction for site search
 * @see https://schema.org/WebSite
 * @see https://schema.org/SearchAction
 */
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Buratina Bar',
    alternateName: 'Buratina',
    url: 'https://buratina-bar.com',
    description:
      'The most mystical bar in Belgrade. Book a table, host events, explore our unique cocktails and menu.',
    inLanguage: ['en', 'sr', 'ru'],
    // SearchAction enables Google Search to show a search box for your site
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://buratina-bar.com/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Buratina Bar',
      logo: {
        '@type': 'ImageObject',
        url: 'https://buratina-bar.com/icon.svg',
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
