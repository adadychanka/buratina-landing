/**
 * Event Structured Data Component
 * Implements Schema.org Event markup for past events showcase
 * @see https://schema.org/Event
 */

type EventSchemaProps = {
  /** Event type/name (e.g., 'Birthday Party', 'Corporate Event') */
  name: string;
  /** Brief description of the event */
  description: string;
  /** Past event date (ISO 8601 format) */
  startDate?: string;
  /** Event end date (ISO 8601 format) */
  endDate?: string;
  /** Event type category */
  eventType?: 'SocialEvent' | 'BusinessEvent' | 'EducationEvent' | 'MusicEvent';
  /** Event images */
  images?: string[];
};

/**
 * Individual Event Schema Component
 * Use for each event on past-events page
 */
export function EventSchema({
  name,
  description,
  startDate,
  endDate,
  eventType = 'SocialEvent',
  images = [],
}: EventSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'BarOrPub',
      name: 'Buratina Bar',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Svetogorska 46',
        addressLocality: 'Belgrade',
        addressRegion: 'Belgrade',
        postalCode: '11103',
        addressCountry: 'RS',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Buratina Bar',
      url: 'https://buratina-bar.com',
    },
    ...(images.length > 0 && {
      image: images.map((img) => `https://buratina-bar.com${img}`),
    }),
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
 * Events Collection Schema
 * Use on pages that list multiple events (like past-events page)
 */
export function EventsCollectionSchema() {
  const events = [
    {
      name: 'Birthday Party Celebration',
      description: 'Intimate birthday celebration with custom decorations and personalized service',
      eventType: 'SocialEvent' as const,
    },
    {
      name: 'Corporate Team Building Event',
      description: 'Professional corporate gathering with networking opportunities',
      eventType: 'BusinessEvent' as const,
    },
    {
      name: 'Live Music Concert',
      description: 'Live music performance in mystical atmosphere',
      eventType: 'MusicEvent' as const,
    },
    {
      name: 'Private Party',
      description: 'Exclusive private event with full venue booking',
      eventType: 'SocialEvent' as const,
    },
    {
      name: 'Cultural Event',
      description: 'Cultural gathering celebrating art and creativity',
      eventType: 'EducationEvent' as const,
    },
    {
      name: 'Professional Photoshoot',
      description: 'Professional photo session in unique bar setting',
      eventType: 'SocialEvent' as const,
    },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: events.map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: event.name,
        description: event.description,
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'BarOrPub',
          name: 'Buratina Bar',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Svetogorska 46',
            addressLocality: 'Belgrade',
            postalCode: '11103',
            addressCountry: 'RS',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: 'Buratina Bar',
        },
      },
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
