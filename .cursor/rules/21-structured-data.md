---
description: JSON-LD structured data implementation guidelines for SEO and AI search visibility
globs: ["src/components/structured-data/**/*.tsx"]
alwaysApply: false
---

# Structured Data (JSON-LD) Guidelines

## Overview

Structured data helps search engines and AI platforms understand your content. This project uses JSON-LD format (recommended by Google) embedded in React components.

**Why It Matters**: Structured data enables:
- Rich results in Google Search (star ratings, events, business cards)
- Better AI platform understanding (ChatGPT, Perplexity, Gemini)
- Enhanced knowledge graph presence
- Voice assistant compatibility

---

## Component Structure

### Location

**Directory**: `src/components/structured-data/`

**Naming Convention**: `[SchemaType]Schema.tsx`

### Basic Pattern

```tsx
/**
 * [SchemaType] Structured Data Component
 * Implements Schema.org [SchemaType] markup for SEO and AI platforms
 * @see https://schema.org/[SchemaType]
 */
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub', // or relevant type
    // ... schema properties
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

## Required Schemas

### 1. LocalBusiness Schema

**File**: `LocalBusinessSchema.tsx`

**Purpose**: Business information for local search and AI platforms

**Required Properties**:
```typescript
{
  '@context': 'https://schema.org',
  '@type': 'BarOrPub', // Most specific type
  name: string,
  description?: string,
  address: {
    '@type': 'PostalAddress',
    streetAddress: string,
    addressLocality: string,
    addressRegion?: string,
    postalCode: string,
    addressCountry: string, // ISO 3166-1 alpha-2
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: number,
    longitude: number,
  },
  telephone: string, // E.164 format: +381611096732
  email?: string,
  url: string,
  image?: string[],
  priceRange?: string, // e.g., "$$"
  openingHours?: string[], // e.g., ["Mo-Su 18:00-02:00"]
  servesCuisine?: string[],
  acceptsReservations?: boolean,
  menu?: string, // URL to menu
  sameAs?: string[], // Social media URLs
  aggregateRating?: {
    '@type': 'AggregateRating',
    ratingValue: number,
    reviewCount: number,
  },
}
```

**Integration**:
```tsx
// In src/app/[locale]/layout.tsx or page.tsx
import { LocalBusinessSchema } from '@/components/structured-data/LocalBusinessSchema';

export default function Layout() {
  return (
    <>
      <LocalBusinessSchema />
      {children}
    </>
  );
}
```

---

### 2. Organization Schema

**File**: `OrganizationSchema.tsx`

**Purpose**: Company/brand information

**Required Properties**:
```typescript
{
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: string,
  alternateName?: string,
  url: string,
  logo?: string,
  description?: string,
  email?: string,
  telephone?: string,
  address?: PostalAddress,
  sameAs?: string[], // Social profiles
  founder?: Person | Person[],
  foundingDate?: string, // ISO 8601 date
  foundingLocation?: Place,
}
```

---

### 3. WebSite Schema

**File**: `WebSiteSchema.tsx`

**Purpose**: Site structure and search action

**Required Properties**:
```typescript
{
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: string,
  alternateName?: string,
  url: string,
  description?: string,
  inLanguage?: string[], // e.g., ["en", "ru", "sr"]
  potentialAction?: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: string, // e.g., "https://example.com/search?q={search_term_string}"
    },
    'query-input': 'required name=search_term_string',
  },
}
```

**Note**: SearchAction is optional but helps with site links in search results.

---

### 4. Event Schema

**File**: `EventSchema.tsx`

**Purpose**: Event information for rich results

**Usage**: Individual event pages or event listings

**Required Properties**:
```typescript
{
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: string,
  description: string,
  startDate: string, // ISO 8601: "2026-01-27T19:00:00+01:00"
  endDate?: string,
  eventStatus: 'EventScheduled' | 'EventCancelled' | 'EventPostponed',
  eventAttendanceMode: 'OfflineEventAttendanceMode' | 'OnlineEventAttendanceMode' | 'MixedEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: string,
    address: PostalAddress,
  },
  image?: string[],
  organizer?: {
    '@type': 'Organization',
    name: string,
    url?: string,
  },
  performer?: Person | Organization,
  offers?: {
    '@type': 'Offer',
    url?: string,
    price?: string,
    priceCurrency?: string, // ISO 4217: "RSD"
    availability?: 'InStock' | 'SoldOut' | 'PreOrder',
    validFrom?: string, // ISO 8601 date
  },
}
```

**For Event Listings**:
```typescript
{
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: { /* Event schema */ },
    },
    // ... more events
  ],
}
```

---

### 5. BreadcrumbList Schema

**File**: `BreadcrumbSchema.tsx`

**Purpose**: Navigation hierarchy

**Usage**: Subpages (not homepage)

**Required Properties**:
```typescript
{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://example.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Past Events',
      item: 'https://example.com/past-events',
    },
  ],
}
```

**Example Implementation**:
```tsx
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

### 6. FAQPage Schema (Future)

**File**: `FAQPageSchema.tsx`

**Purpose**: FAQ content for featured snippets

**Required Properties**:
```typescript
{
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where is Buratina Bar located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Buratina Bar is located at Svetogorska 46, Belgrade 11103, Serbia.',
      },
    },
    // ... more Q&A pairs
  ],
}
```

---

## Best Practices

### 1. Type Selection

**Use most specific type available**:
```typescript
// Good - Specific
'@type': 'BarOrPub'

// Less Good - Generic
'@type': 'LocalBusiness'
```

**Schema.org Type Hierarchy**:
- Thing → Place → LocalBusiness → FoodEstablishment → BarOrPub ✅

### 2. Required vs Optional Fields

**Include required fields always**:
- `@context`: Always `https://schema.org`
- `@type`: Specific type from Schema.org
- Core identifying information (name, address for LocalBusiness)

**Add optional fields when available**:
- Images, ratings, reviews
- Opening hours, price range
- Social media links

### 3. Data Consistency

**Rule**: Schema data MUST match visible content

```tsx
// Bad - Mismatch
<h1>Buratina Bar Belgrade</h1>
<script type="application/ld+json">
  { "name": "Buratina" } // Missing "Bar Belgrade"
</script>

// Good - Consistent
<h1>Buratina Bar</h1>
<script type="application/ld+json">
  { "name": "Buratina Bar" } // Matches H1
</script>
```

### 4. URL Formats

**Use absolute URLs**:
```typescript
// Good
url: 'https://buratina-bar.com'
image: 'https://buratina-bar.com/images/bar.jpg'

// Bad
url: '/'
image: '/images/bar.jpg'
```

### 5. Date Formats

**Use ISO 8601**:
```typescript
// Good
startDate: '2026-01-27T19:00:00+01:00'
foundingDate: '2020-01-15'

// Bad
startDate: 'January 27, 2026 at 7pm'
foundingDate: '15/01/2020'
```

### 6. Telephone Format

**Use E.164 format** (country code + number):
```typescript
// Good
telephone: '+381611096732'

// Bad
telephone: '061 109 6732'
telephone: '(061) 109-6732'
```

---

## Validation

### Before Deployment

**1. Schema.org Validator**:
- URL: https://validator.schema.org/
- Paste your JSON-LD
- Fix all errors and warnings

**2. Google Rich Results Test**:
- URL: https://search.google.com/test/rich-results
- Enter your page URL
- Verify schema is detected

**3. Manual Check**:
```bash
# View page source
curl https://your-site.com | grep 'application/ld+json'
```

### After Deployment

**1. Google Search Console**:
- Check "Enhancements" section
- Monitor for schema errors
- Track rich result impressions

**2. Structured Data Report**:
- Search Console → Enhancements
- Review LocalBusiness, Event, FAQ types
- Fix any detected issues

---

## Common Errors to Avoid

### 1. Invalid JSON

```typescript
// Bad - Trailing comma
{
  name: 'Bar',
  url: 'https://example.com',  // ❌ Trailing comma
}

// Good
{
  name: 'Bar',
  url: 'https://example.com'
}
```

### 2. Missing Required Fields

```typescript
// Bad - Missing required fields
{
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Party', // ❌ Missing startDate, location
}

// Good
{
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Party',
  startDate: '2026-01-27T19:00:00+01:00',
  location: { /* ... */ },
}
```

### 3. Invalid Type Values

```typescript
// Bad - Custom values
{
  eventStatus: 'happening soon', // ❌ Not a valid enum value
}

// Good - Schema.org enum
{
  eventStatus: 'EventScheduled', // ✅ Valid value
}
```

### 4. Mixing String and Object

```typescript
// Bad - Inconsistent types
{
  location: 'Belgrade', // ❌ Should be Place object
}

// Good
{
  location: {
    '@type': 'Place',
    name: 'Buratina Bar',
    address: { /* ... */ },
  },
}
```

---

## Integration Patterns

### Single Page Schema

```tsx
// src/app/[locale]/page.tsx
import { LocalBusinessSchema } from '@/components/structured-data/LocalBusinessSchema';
import { OrganizationSchema } from '@/components/structured-data/OrganizationSchema';
import { WebSiteSchema } from '@/components/structured-data/WebSiteSchema';

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <OrganizationSchema />
      <WebSiteSchema />
      <main>{/* ... */}</main>
    </>
  );
}
```

### Dynamic Schema with Props

```tsx
// src/components/structured-data/EventSchema.tsx
export function EventSchema({ event }: { event: Event }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    startDate: event.date.toISOString(),
    location: {
      '@type': 'Place',
      name: 'Buratina Bar',
      address: { /* ... */ },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Conditional Schema

```tsx
// Only show on certain pages
export default function EventPage({ event }: Props) {
  return (
    <>
      {event && <EventSchema event={event} />}
      <article>{/* ... */}</article>
    </>
  );
}
```

---

## Testing Checklist

Before marking a schema component as complete:

- [ ] Validates on schema.org validator (0 errors)
- [ ] All required fields present
- [ ] Data matches visible page content
- [ ] URLs are absolute (not relative)
- [ ] Dates in ISO 8601 format
- [ ] Phone in E.164 format
- [ ] No trailing commas in JSON
- [ ] TypeScript types defined
- [ ] Component exported and integrated
- [ ] Tested in Google Rich Results Test
- [ ] Documented in code comments

---

## Resources

- **Schema.org Documentation**: https://schema.org/
- **Google Search Central**: https://developers.google.com/search/docs/appearance/structured-data
- **Schema Validator**: https://validator.schema.org/
- **Rich Results Test**: https://search.google.com/test/rich-results
- **JSON-LD Playground**: https://json-ld.org/playground/

---

## Quick Reference

**Schema Priority** (implement in order):
1. LocalBusiness (business info)
2. Organization (brand info)
3. WebSite (site structure)
4. BreadcrumbList (navigation)
5. Event (event pages)
6. FAQPage (FAQ section)

**Common Types**:
- `LocalBusiness` → `FoodEstablishment` → `BarOrPub`
- `Event` → `SocialEvent`, `BusinessEvent`, `PublicationEvent`
- `Place` → `LocalBusiness`, `TouristAttraction`
- `CreativeWork` → `Article`, `BlogPosting`, `Review`
