---
description: SEO/GEO/AEO optimization - Traditional search, AI search, and answer engines (2026 standards)
globs: ["src/app/**/layout.tsx", "src/app/**/page.tsx", "src/app/sitemap.ts", "src/app/robots.ts", "src/components/sections/**/*.tsx", "src/components/structured-data/**/*.tsx"]
alwaysApply: false
---

# SEO/GEO/AEO Optimization Guide

## Critical Context (2026)

**Why AI Optimization Matters**: By 2028, Gartner predicts 50%+ of search traffic will shift from traditional search engines to AI platforms (ChatGPT, Perplexity, Gemini, Claude). This project implements GEO (Generative Engine Optimization) alongside traditional SEO.

**Implementation Status**: Phase 0 (Critical AI Optimization) completed. See `docs/GA4_AI_TRACKING_SETUP.md` for tracking setup.

---

## 1. AI Crawler Configuration (CRITICAL)

### Robots.txt Rules

**File**: `src/app/robots.ts`

**Requirements**:
- ✅ Allow AI search bots: `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Gemini-Bot`, `DeepSeekBot`, `AndiBot`, `ExaBot`, `PhindBot`, `YouBot`
- ✅ Block AI training bots: `GPTBot`, `CCBot`, `Google-Extended`, `anthropic-ai`, `Omgilibot`
- ✅ Allow traditional search: `Googlebot`, `Bingbot`, `Yandex`

**Example**:
```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow AI search engines (for visibility)
      { userAgent: ['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot'], allow: '/' },
      // Block AI training (protect content)
      { userAgent: ['GPTBot', 'CCBot', 'Google-Extended'], disallow: '/' },
      // Allow traditional search
      { userAgent: ['Googlebot', 'Bingbot'], allow: '/' },
      // Default rules
      { userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] },
    ],
  };
}
```

---

## 2. Performance for AI Crawlers (CRITICAL)

### Speed Requirements

**AI crawler timeouts**: 1-5 seconds. Slow sites get excluded from AI responses.

**Next.js Configuration** (`next.config.mjs`):
```javascript
const nextConfig = {
  compress: true, // Enable gzip compression
  images: {
    formats: ['image/avif', 'image/webp'], // Modern formats
    minimumCacheTTL: 31536000, // 1 year cache
  },
  experimental: {
    optimizeCss: true, // Optimize CSS delivery
  },
};
```

### Server-Side Rendering (SSR)

**Rule**: All content-heavy components MUST be Server Components

**Why**: AI crawlers struggle with JavaScript. Content must be in initial HTML.

**Verification**:
```bash
# Check for "use client" in section components
grep -r "use client" src/components/sections/
# Should return nothing (or only interactive UI components)
```

**Good**:
```tsx
// Server Component - AI can read immediately
export async function About() {
  const t = await getTranslations('About');
  return <section>{t('content')}</section>;
}
```

**Bad**:
```tsx
'use client'; // Avoid for content-heavy components
export function About() {
  const [content, setContent] = useState('');
  useEffect(() => { /* fetch content */ }, []);
  return <section>{content}</section>;
}
```

---

## 3. Freshness Signals (CRITICAL)

### Publication Dates

**Rule**: ALL pages MUST include publication/modification dates

**Implementation** (in `generateMetadata`):
```typescript
export async function generateMetadata(): Promise<Metadata> {
  const lastModified = new Date('2026-01-27'); // Update when content changes
  
  return {
    // ... other metadata
    other: {
      'article:modified_time': lastModified.toISOString(),
      'og:updated_time': lastModified.toISOString(),
    },
  };
}
```

**Update Trigger**: Change the date when:
- Content is updated
- New features are added
- Business information changes (hours, menu, prices)

---

## 4. Metadata Best Practices

### Page Metadata

**File**: All `layout.tsx` and `page.tsx` files

**Required Fields**:
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: 'Specific Page Title - Brand Name',
    description: 'Clear 150-160 character description with key terms',
    keywords: ['primary', 'secondary', 'tertiary', 'local', 'terms'],
    authors: [{ name: 'Business Name' }],
    
    // OpenGraph (social sharing + AI platforms)
    openGraph: {
      type: 'website', // or 'article' for content pages
      locale: locale,
      url: `${baseUrl}${path}`,
      siteName: 'Brand Name',
      title: 'Page Title',
      description: 'Social-optimized description',
      images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630 }],
    },
    
    // Twitter Cards
    twitter: {
      card: 'summary_large_image',
      title: 'Page Title',
      description: 'Twitter-optimized description',
      images: [`${baseUrl}/og-image.jpg`],
    },
    
    // Canonical + Language Alternates
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: { en: `${baseUrl}/en`, ru: `${baseUrl}/ru`, sr: `${baseUrl}/sr` },
    },
    
    // Crawling Instructions
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Freshness Signals (REQUIRED for AI)
    other: {
      'article:modified_time': new Date().toISOString(),
      'og:updated_time': new Date().toISOString(),
    },
  };
}
```

---

## 5. Content Structure for AI Extraction

### Answer-First Format

**Rule**: Lead with direct answers, then expand

**Why**: AI extracts the first clear answer. Buried answers = no citations.

**Good Example**:
```tsx
<section>
  <h2>What events can Buratina Bar host?</h2>
  <p>
    Buratina Bar hosts birthdays, corporate events, private parties, concerts, 
    cultural events, and photoshoots for groups of 20-100 people in Belgrade.
  </p>
  
  <h3>Event Details</h3>
  <p>[Expanded information about each event type...]</p>
</section>
```

**Bad Example**:
```tsx
<section>
  <h2>Events at Buratina Bar</h2>
  <p>Welcome to our events section...</p>
  <p>We have a long history of hosting great events...</p>
  <p>[Answer buried 3 paragraphs down]</p>
</section>
```

### Heading Hierarchy

**Rule**: One H1 per page, proper nesting

```tsx
// Good
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>

// Bad - Multiple H1s
<h1>Hero Title</h1>
<h1>About Title</h1>

// Bad - Skipping levels
<h2>Section</h2>
<h4>Subsection</h4> // Skipped h3
```

---

## 6. Image Optimization

### Alt Text Rules

**Rule**: Descriptive alt text for AI understanding

**Good**:
```tsx
<Image 
  src="/hero.jpg" 
  alt="Buratina Bar interior showcasing mystical atmospheric lighting and wooden decor" 
/>
```

**Bad**:
```tsx
<Image src="/hero.jpg" alt="Hero" />
<Image src="/hero.jpg" alt="" />
<Image src="/hero.jpg" alt={t('title')} /> // Generic translation
```

### Image Configuration

**File**: `next.config.mjs`

```javascript
images: {
  formats: ['image/avif', 'image/webp'], // Modern formats first
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256],
  minimumCacheTTL: 31536000, // 1 year
}
```

### Loading Strategy

```tsx
// Above-the-fold: Priority load
<Image src="/hero.jpg" priority />

// Below-the-fold: Lazy load
<Image src="/gallery.jpg" loading="lazy" />
```

---

## 7. Structured Data (JSON-LD)

### Required Schemas

**Location**: `src/components/structured-data/`

**Implementation Pattern**:
```tsx
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    name: 'Buratina Bar',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Svetogorska 46',
      addressLocality: 'Belgrade',
      postalCode: '11103',
      addressCountry: 'RS',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.8127834,
      longitude: 20.4699155,
    },
    telephone: '+381611096732',
    email: 'barburatina@gmail.com',
    url: 'https://buratina-bar.com',
    openingHours: ['Mo-Su 18:00-02:00'],
    sameAs: [
      'https://instagram.com/buratina_bar',
      'https://facebook.com/buratinabar',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

**Required Schemas**:
- ✅ `LocalBusinessSchema` - Business information
- ✅ `OrganizationSchema` - Company details
- ✅ `WebSiteSchema` - Site structure
- ✅ `EventSchema` - Event listings
- ✅ `BreadcrumbSchema` - Navigation paths
- 🔄 `FAQPageSchema` - Q&A content (future)

---

## 8. Semantic HTML

### Use Proper Elements

```tsx
// Good - Semantic
<main>
  <article>
    <header><h1>Title</h1></header>
    <section><h2>Section</h2></section>
  </article>
</main>

// Bad - Divitis
<div>
  <div>
    <div><h1>Title</h1></div>
    <div><h2>Section</h2></div>
  </div>
</div>
```

### ARIA Labels

**When to use**:
- Interactive elements without visible text
- Complex widgets
- Form validation messages

**Example**:
```tsx
<button aria-label="Close menu">
  <XIcon />
</button>
```

---

## 9. Sitemap Configuration

**File**: `src/app/sitemap.ts`

**Requirements**:
- Include all public pages
- All locales represented
- Language alternates configured
- Proper priority and changeFrequency

**Example**:
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/past-events', '/privacy-policy'];
  const locales = ['en', 'ru', 'sr'];
  
  return routes.flatMap(route =>
    locales.map(locale => ({
      url: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: route === '/' ? 1.0 : 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}${route}`,
          ru: `${baseUrl}/ru${route}`,
          sr: `${baseUrl}/sr${route}`,
        },
      },
    }))
  );
}
```

---

## 10. Multilingual SEO

### Hreflang Implementation

**Current**: Handled automatically by `next-intl` and sitemap

**Verification**:
```tsx
// In metadata
alternates: {
  canonical: url,
  languages: {
    en: `${baseUrl}`,
    ru: `${baseUrl}/ru`,
    sr: `${baseUrl}/sr`,
  },
}
```

### Content Parity

**Rule**: All locales must have equivalent content depth

- Translate all key business information
- Maintain same heading structure
- Equivalent image alt text in each language
- Same structured data (translated)

---

## 11. GA4 AI Tracking

**Documentation**: `docs/GA4_AI_TRACKING_SETUP.md`

**Expected Referral Sources**:
- `chat.openai.com` (ChatGPT)
- `perplexity.ai` (Perplexity)
- `gemini.google.com` (Gemini)
- `claude.ai` (Claude)
- `you.com` (You.com)
- `andisearch.com` (Andi)

**Monthly KPIs to Track**:
- AI referral sessions
- AI conversion rate
- Top AI source
- AI vs traditional search ratio

---

## 12. Testing & Validation

### Pre-Deployment Checklist

```bash
# Type check
npm run type-check

# Lint check
npm run lint

# Build check
npm run build

# Manual checks (after deployment)
# 1. View source - verify content in HTML
# 2. Andi Search test: andisearch.com
# 3. Schema validator: schema.org validator
# 4. PageSpeed Insights
```

### AI Visibility Testing (Monthly)

**Test Queries**:
1. ChatGPT: "Best bars in Belgrade"
2. Perplexity: "Event venues in Belgrade"
3. Gemini: "Bars near Svetogorska Belgrade"
4. Claude: "Mystical bars in Belgrade Serbia"

**Track**: Mention rate, position, accuracy

---

## 13. Content Guidelines

### Do's

✅ Lead with clear, direct answers
✅ Use question-based headings
✅ Include location in content naturally
✅ Update lastModified dates when content changes
✅ Write for humans first, AI second
✅ Keep content on single pages (avoid "Read More")

### Don'ts

❌ Hide content behind JavaScript toggles
❌ Use generic alt text (e.g., "image", "photo")
❌ Bury answers below marketing fluff
❌ Use multiple H1 tags per page
❌ Forget to update publication dates
❌ Block AI search bots in robots.txt

---

## 14. Performance Targets

**Goals** (for AI crawler compatibility):
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

**Why**: AI crawlers timeout at 1-5 seconds

---

## 15. Security Headers

**Implementation** (in `next.config.mjs`):
```javascript
headers: async () => [{
  source: '/(.*)',
  headers: [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-XSS-Protection', value: '1; mode=block' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  ],
}]
```

---

## Resources

- **Plan**: `.cursor/plans/seo_geo_aeo_optimization_*.plan.md`
- **GA4 Setup**: `docs/GA4_AI_TRACKING_SETUP.md`
- **Research**: 
  - [LocalMighty AI SEO Guide 2026](https://www.localmighty.com/blog/ai-seo-checklist-aeo-geo-llm-optimization/)
  - [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
  - [Schema.org Documentation](https://schema.org/)

---

## Quick Reference

**Phase 0 (Completed)**:
- ✅ AI crawler configuration
- ✅ Publication dates
- ✅ Speed optimization
- ✅ SSR verification
- ✅ Bot protection check
- ✅ GA4 tracking setup

**Next Phases**:
- Phase 1: Favicons, OG images, viewport config
- Phase 2: Structured data schemas
- Phase 3: Content optimization, security headers
