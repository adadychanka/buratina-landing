---
description: Guidelines for creating and organizing pages in the Next.js app
globs: ["src/app/**/*.tsx", "src/app/**/page.tsx"]
alwaysApply: false
---

# Page Structure and Routing

## Directory Structure

```
src/app/
├── [locale]/              # Localized pages
│   ├── page.tsx          # Homepage (/)
│   ├── past-events/
│   │   └── page.tsx      # Past events page (/past-events)
│   ├── privacy-policy/
│   │   └── page.tsx      # Privacy policy (/privacy-policy)
│   ├── layout.tsx        # Locale-specific layout
│   └── not-found.tsx     # 404 page
├── api/                   # API routes
│   └── contact/
│       └── route.ts      # Contact form API
├── layout.tsx            # Root layout
├── page.tsx              # Root redirect
└── robots.ts             # SEO robots.txt
```

## Creating New Pages

### 1. Localized Pages (User-Facing)

Create under `src/app/[locale]/`:

```typescript
// src/app/[locale]/new-page/page.tsx
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'NewPage' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function NewPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations('NewPage');

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <h1>{t('title')}</h1>
        {/* Page content */}
      </div>
    </main>
  );
}
```

### 2. Add Translations

Add to all language files:

```json
// src/messages/en.json
{
  "NewPage": {
    "title": "Page Title",
    "description": "Page description"
  }
}
```

### 3. Add to Navigation (if needed)

```typescript
// src/components/layout/Header.tsx
const navItems = [
  // ...
  { key: 'newPage', href: '/new-page', label: t('newPage'), isAnchor: false },
];
```

### 4. Update Sitemap

```typescript
// src/app/sitemap.ts
const routes = ['', '/past-events', '/privacy-policy', '/new-page'];
```

## Page Types

### Homepage (Single Page Application)
- Location: `src/app/[locale]/page.tsx`
- Contains multiple sections (Hero, About, Menu, Events, etc.)
- Uses anchor navigation (#about, #menu, etc.)

### Dedicated Pages
- Location: `src/app/[locale]/[page-name]/page.tsx`
- Full page experience
- Example: Past Events, Privacy Policy

### API Routes
- Location: `src/app/api/[route]/route.ts`
- Server-side endpoints
- Example: Contact form submission

## Navigation Patterns

### Internal Links (i18n-aware)
```typescript
import { Link } from '@/i18n/navigation';

<Link href="/past-events">Past Events</Link>
```

### Anchor Links (same page)
```typescript
import { scrollToSection } from '@/lib/utils/scroll';

<button onClick={() => scrollToSection('about', 80)}>About</button>
```

### External Links
```typescript
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External Link
</a>
```

## SEO Best Practices

### Metadata
Always provide metadata for pages:
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: 'Page Title | Buratina Bar',
    description: 'Page description for SEO',
    openGraph: {
      title: 'Page Title',
      description: 'Page description',
      images: ['/images/og-image.jpg'],
    },
  };
}
```

### Sitemap
Update sitemap when adding pages:
- Add route to `routes` array
- Generates URLs for all locales automatically
- Includes alternate language links

### Robots.txt
Configured in `src/app/robots.ts`

## Common Patterns

### Back to Home Link
```typescript
<Link href="/#section-id">← Back to Home</Link>
```

### Loading States
```typescript
export default function Loading() {
  return <Skeleton />;
}
```

### Error Handling
```typescript
export default function Error({ error }: { error: Error }) {
  return <ErrorPage message={error.message} />;
}
```
