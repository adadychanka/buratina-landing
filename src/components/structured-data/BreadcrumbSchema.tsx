/**
 * BreadcrumbList Structured Data Component
 * Implements Schema.org BreadcrumbList markup for navigation hierarchy
 * @see https://schema.org/BreadcrumbList
 */

type BreadcrumbItem = {
  /** Display name of the breadcrumb */
  name: string;
  /** URL of the breadcrumb (absolute URL) */
  url: string;
};

type BreadcrumbSchemaProps = {
  /** Array of breadcrumb items in order from home to current page */
  items: BreadcrumbItem[];
};

/**
 * Generates BreadcrumbList structured data
 * Helps search engines understand site hierarchy
 *
 * @example
 * <BreadcrumbSchema
 *   items={[
 *     { name: 'Home', url: 'https://buratina-bar.com' },
 *     { name: 'Past Events', url: 'https://buratina-bar.com/past-events' }
 *   ]}
 * />
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data, schema is statically defined
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Pre-built breadcrumb schemas for common pages
 */
export const breadcrumbs = {
  pastEvents: (locale: string) => {
    const baseUrl = 'https://buratina-bar.com';
    const localePath = locale === 'en' ? '' : `/${locale}`;

    return [
      { name: 'Home', url: `${baseUrl}${localePath}` },
      { name: 'Past Events', url: `${baseUrl}${localePath}/past-events` },
    ];
  },

  privacyPolicy: (locale: string) => {
    const baseUrl = 'https://buratina-bar.com';
    const localePath = locale === 'en' ? '' : `/${locale}`;

    return [
      { name: 'Home', url: `${baseUrl}${localePath}` },
      { name: 'Privacy Policy', url: `${baseUrl}${localePath}/privacy-policy` },
    ];
  },
};
