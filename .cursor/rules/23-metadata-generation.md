---
description: Consistent metadata generation patterns for pages and layouts
globs: ["src/app/**/layout.tsx", "src/app/**/page.tsx"]
alwaysApply: true
---

# Metadata Generation Patterns

## Overview

This rule ensures consistent, SEO-optimized metadata across all pages using Next.js App Router's `generateMetadata` function and `Metadata` type.

## Core Principles

1. **Always use `generateMetadata`** for page-specific metadata
2. **Export typed `Metadata` objects** for consistent structure
3. **Support all locales** (en, sr, ru)
4. **Include freshness signals** (publication/modification dates)
5. **Provide complete OpenGraph data** for social sharing
6. **Add canonical URLs and alternates** for SEO

## Root Layout Metadata

### Pattern: Static Metadata with Locale Support

**File:** `src/app/[locale]/layout.tsx`

```typescript
import type { Metadata, Viewport } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

// 1. Export viewport configuration separately
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F5F5' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
};

// 2. Generate dynamic metadata with i18n
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Layout' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://buratina-bar.com';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePath}`;
  
  // Update this date when making significant content changes
  const lastModified = new Date('2026-01-27');

  return {
    // Basic metadata
    metadataBase: new URL(baseUrl),
    title: {
      default: t('title'),
      template: `%s | ${t('siteName')}`,
    },
    description: t('description'),
    keywords: t('keywords'),

    // Authors
    authors: [{ name: 'Buratina Bar', url: baseUrl }],

    // Icons
    icons: {
      icon: '/icon.svg',
      apple: '/apple-icon.png',
    },

    // Manifest
    manifest: '/manifest.webmanifest',

    // OpenGraph
    openGraph: {
      type: 'website',
      locale: locale === 'sr' ? 'sr_RS' : locale === 'ru' ? 'ru_RU' : 'en_US',
      url,
      siteName: t('siteName'),
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${baseUrl}/og-image.jpg`],
    },

    // Canonical and alternates
    alternates: {
      canonical: url,
      languages: {
        en: baseUrl,
        sr: `${baseUrl}/sr`,
        ru: `${baseUrl}/ru`,
      },
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Additional meta tags
    other: {
      // Freshness signals for AI crawlers
      'article:modified_time': lastModified.toISOString(),
      'og:updated_time': lastModified.toISOString(),
      
      // Apple Web App
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-mobile-web-app-title': 'Buratina Bar',
    },

    // Apple Web App
    appleWebApp: {
      capable: true,
      title: 'Buratina Bar',
      statusBarStyle: 'black-translucent',
    },
  };
}
```

### Required Translation Keys (Layout.json)

```json
{
  "Layout": {
    "title": "Buratina Bar - The Most Mystical Bar in Belgrade",
    "siteName": "Buratina Bar",
    "description": "Experience Belgrade's most enchanting bar with mystical atmosphere, craft cocktails, and unforgettable events. Book your visit to Buratina Bar today.",
    "keywords": "Buratina Bar, Belgrade bar, mystical bar, craft cocktails, events venue, private parties, Belgrade nightlife",
    "ogImageAlt": "Buratina Bar - Mystical atmosphere and craft cocktails in Belgrade"
  }
}
```

## Page Metadata

### Pattern: Dynamic Page-Specific Metadata

**File:** `src/app/[locale]/[page]/page.tsx`

```typescript
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'PageName' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://buratina-bar.com';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const pagePath = '/page-slug'; // Update with actual page path
  const url = `${baseUrl}${localePath}${pagePath}`;

  return {
    title: t('title'),
    description: t('description'),
    
    // Alternates for this specific page
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}${pagePath}`,
        sr: `${baseUrl}/sr${pagePath}`,
        ru: `${baseUrl}/ru${pagePath}`,
      },
    },

    // OpenGraph for social sharing
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      siteName: 'Buratina Bar',
      locale: locale === 'sr' ? 'sr_RS' : locale === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t('ogImageAlt', { defaultValue: 'Buratina Bar' }),
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },

    // Robots configuration
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function PageName({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  // Page component implementation
  return (
    <div>
      {/* Page content */}
    </div>
  );
}
```

### Required Translation Keys (PageName.json)

```json
{
  "PageName": {
    "title": "Page Title - Buratina Bar",
    "description": "Detailed page description for SEO and social sharing (150-160 characters recommended).",
    "ogImageAlt": "Descriptive alt text for OpenGraph image"
  }
}
```

## Special Cases

### 1. Blog/Article Pages

For content pages with publication dates:

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ... standard metadata ...

  const publishedTime = new Date('2026-01-27T10:00:00Z');
  const modifiedTime = new Date('2026-01-27T15:30:00Z');

  return {
    // ... other metadata ...
    
    openGraph: {
      // ... other openGraph ...
      type: 'article',
      publishedTime: publishedTime.toISOString(),
      modifiedTime: modifiedTime.toISOString(),
      authors: ['Buratina Bar'],
      section: 'Events', // or 'News', 'Blog', etc.
      tags: ['tag1', 'tag2'],
    },

    other: {
      'article:published_time': publishedTime.toISOString(),
      'article:modified_time': modifiedTime.toISOString(),
      'article:author': 'Buratina Bar',
    },
  };
}
```

### 2. Event Pages

For event-specific pages:

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ... standard metadata ...

  const eventDate = new Date('2026-02-14T20:00:00Z');

  return {
    // ... other metadata ...
    
    openGraph: {
      // ... other openGraph ...
      type: 'event',
    },

    other: {
      'event:start_time': eventDate.toISOString(),
      'event:location': 'Buratina Bar, Belgrade, Serbia',
    },
  };
}
```

### 3. No-Index Pages

For pages that shouldn't be indexed (e.g., thank-you pages, admin pages):

```typescript
export const metadata: Metadata = {
  title: 'Thank You',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};
```

## Metadata Checklist

Before deploying new pages, verify:

### Required Fields
- [ ] `title` - Unique, descriptive, includes brand name
- [ ] `description` - 150-160 characters, compelling, includes keywords
- [ ] `alternates.canonical` - Correct URL for this page
- [ ] `alternates.languages` - All three locales (en, sr, ru)
- [ ] `openGraph.url` - Matches canonical URL
- [ ] `openGraph.locale` - Correct locale code
- [ ] `openGraph.images` - Valid OG image (1200x630px)

### Translation Keys
- [ ] Added to `en.json`
- [ ] Added to `sr.json`
- [ ] Added to `ru.json`
- [ ] Natural phrasing in each language (not literal translation)

### SEO Best Practices
- [ ] Title is 50-60 characters
- [ ] Description is 150-160 characters
- [ ] Keywords naturally included in title and description
- [ ] Unique title and description (not duplicated from other pages)
- [ ] Business name included in title

### Social Sharing
- [ ] OpenGraph title (can differ from page title)
- [ ] OpenGraph description (can differ from meta description)
- [ ] OpenGraph image exists and is optimized
- [ ] Twitter Card configured
- [ ] Image alt text provided

### Technical
- [ ] `setRequestLocale(locale)` called before translations
- [ ] Environment variable fallback for base URL
- [ ] Locale path logic handles default locale (en) correctly
- [ ] TypeScript types imported (`Metadata`, `Viewport`)

## Common Mistakes to Avoid

### ❌ Mistake 1: Missing `setRequestLocale`
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  // ❌ Missing setRequestLocale
  const t = await getTranslations({ locale, namespace: 'Page' });
  // ...
}
```

**Fix:**
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale); // ✅ Call before getTranslations
  const t = await getTranslations({ locale, namespace: 'Page' });
  // ...
}
```

### ❌ Mistake 2: Hardcoded URLs
```typescript
alternates: {
  canonical: 'https://buratina-bar.com/events', // ❌ Hardcoded
  languages: {
    en: 'https://buratina-bar.com/events',
    sr: 'https://buratina-bar.com/sr/events',
  },
}
```

**Fix:**
```typescript
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://buratina-bar.com';
const localePath = locale === 'en' ? '' : `/${locale}`;
const url = `${baseUrl}${localePath}/events`;

alternates: {
  canonical: url, // ✅ Dynamic
  languages: {
    en: `${baseUrl}/events`,
    sr: `${baseUrl}/sr/events`,
    ru: `${baseUrl}/ru/events`,
  },
}
```

### ❌ Mistake 3: Missing Translation in Some Locales
```json
// en.json ✅
{ "Page": { "title": "Events", "description": "View our events" } }

// sr.json ❌
{ "Page": { "title": "Događaji" } } // Missing description!

// ru.json ❌
{ "Page": {} } // Missing everything!
```

**Fix:** Always add all keys to all locale files.

### ❌ Mistake 4: Wrong OpenGraph Locale Format
```typescript
openGraph: {
  locale: 'sr', // ❌ Wrong format
  locale: 'ru', // ❌ Wrong format
}
```

**Fix:**
```typescript
openGraph: {
  locale: locale === 'sr' ? 'sr_RS' : locale === 'ru' ? 'ru_RU' : 'en_US', // ✅ Correct
}
```

## Testing Metadata

### Manual Testing
1. **View page source** - Verify meta tags appear in `<head>`
2. **Social media debuggers:**
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/
3. **Google Rich Results Test:** https://search.google.com/test/rich-results
4. **Check all locales:** Test /en, /sr, /ru versions

### Automated Testing
```bash
# Check for pages missing generateMetadata
find src/app -name "page.tsx" -exec grep -L "generateMetadata" {} \;

# Check for hardcoded URLs in metadata
grep -r "https://buratina-bar.com" src/app --include="*.tsx"

# Verify setRequestLocale usage
grep -B5 "getTranslations" src/app/**/page.tsx | grep -L "setRequestLocale"
```

## Performance Considerations

### Static Generation
- Metadata is generated at build time for static pages
- Use static values when possible for better performance
- Dynamic data should be minimal and cached

### Environment Variables
Always use `process.env.NEXT_PUBLIC_SITE_URL` for:
- Base URLs
- Canonical URLs
- OpenGraph URLs
- Sitemap URLs

Set in `.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=https://buratina-bar.com
```

## Related Rules

- See `03-internationalization.md` for i18n patterns
- See `09-seo.md` for comprehensive SEO guidelines
- See `21-structured-data.md` for JSON-LD schemas
- See `22-image-alt-text-i18n.md` for image metadata
