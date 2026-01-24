---
description: Third-party library selection and integration guidelines
globs: ["package.json", "src/components/**/*.tsx"]
alwaysApply: false
---

# Third-Party Libraries

## Selection Criteria

Before adding a new library, evaluate:

1. **Maintenance**: Active development, recent updates
2. **Size**: Bundle size impact (use bundlephobia.com)
3. **Popularity**: GitHub stars, npm downloads
4. **Documentation**: Clear, comprehensive docs
5. **TypeScript Support**: Native types or @types package
6. **Dependencies**: Minimal dependencies preferred
7. **License**: Compatible with project (MIT, Apache, etc.)

## Current Libraries

### UI & Components
- **shadcn/ui**: Copy-paste components (not a dependency)
- **Tailwind CSS**: Utility-first styling
- **lucide-react**: Icon library

### Internationalization
- **next-intl**: i18n for Next.js
- **locale-based routing**: English, Russian, Serbian

### Forms & Validation
- **react-hook-form**: Form state management
- **zod**: Schema validation

### Email
- **@react-email/components**: Email templates
- **resend**: Email sending service

### Carousel
- **embla-carousel-react**: Lightweight, touch-friendly carousel
  - Size: ~7KB
  - Zero dependencies
  - Excellent mobile support
  - Active maintenance

## Adding New Libraries

### Process
1. **Research alternatives** (compare 3-4 options)
2. **Check bundle size** (use bundlephobia.com)
3. **Verify maintenance** (last commit, open issues)
4. **Test locally** before committing
5. **Document usage** in cursor rules if needed

### Example Decision: Carousel Library

**Options Considered:**
1. ✅ **embla-carousel-react** - Selected
   - Lightweight (~7KB)
   - Zero dependencies
   - Touch/swipe support
   - Active maintenance
   
2. ❌ **swiper** - Not selected
   - Heavier (~150KB+)
   - Many dependencies
   - More features than needed
   
3. ❌ **react-slick** - Not selected
   - jQuery dependency
   - Less maintained
   - Accessibility issues

## Integration Best Practices

### Client-Side Libraries
If library requires browser APIs:
```typescript
'use client'; // Mark component as client-side

import useEmblaCarousel from 'embla-carousel-react';

export function Carousel() {
  const [emblaRef] = useEmblaCarousel();
  // Implementation
}
```

### Server-Side Libraries
Prefer server components when possible:
```typescript
// No 'use client' directive
import { getTranslations } from 'next-intl/server';

export async function Section() {
  const t = await getTranslations();
  // Implementation
}
```

### Lazy Loading
For heavy libraries, consider lazy loading:
```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false, // Disable SSR if needed
});
```

## Library Updates

- Review and update dependencies quarterly
- Check for breaking changes before updating
- Test thoroughly after updates
- Update TypeScript types if needed
