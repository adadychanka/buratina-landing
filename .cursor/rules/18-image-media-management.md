---
description: Image and media handling guidelines for events and carousel implementation
globs: ["src/components/sections/Event*.tsx", "src/components/ui/image-carousel.tsx", "public/images/**"]
alwaysApply: false
---

# Image and Media Management

## Event Images

### Directory Structure
```
public/images/events/
├── birthday-1.jpg
├── birthday-2.jpg
├── birthday-3.jpg
├── corporate-1.jpg
├── corporate-2.jpg
└── ...
```

### Naming Convention
- Format: `{eventType}-{number}.{ext}`
- Example: `birthday-1.jpg`, `corporate-2.jpg`
- Event types: `birthday`, `corporate`, `concert`, `privateParty`, `cultural`, `photoshoot`

### Image Specifications
- **Aspect Ratio**: 16:10 (1600x1000px recommended)
- **Format**: JPG (preferred) or PNG
- **File Size**: < 500KB per image (optimize with ImageOptim, TinyPNG, etc.)
- **Quality**: High-resolution for desktop displays
- **Content**: Professional photos showing venue during events

## Carousel Implementation

### Multiple Images Per Event
- Support 1-4 images per event
- Carousel automatically appears for 2+ images
- Single image shows static display (no carousel UI)

### Configuration
Event images are configured in two places:

1. **Homepage** (`src/components/sections/EventExamples.tsx`):
```typescript
const events = [
  {
    key: 'birthday' as const,
    images: ['/images/events/birthday-1.jpg', '/images/events/birthday-2.jpg'],
  },
  // ...
];
```

2. **Past Events Page** (`src/app/[locale]/past-events/page.tsx`):
```typescript
const events = [
  {
    key: 'birthday' as const,
    images: ['/images/events/birthday-1.jpg', '/images/events/birthday-2.jpg'],
  },
  // All 6 events
];
```

### Carousel Features
- **Navigation**: Arrow buttons (on hover), dot indicators
- **Gestures**: Touch/swipe on mobile
- **Loop**: Infinite navigation
- **Counter**: Image position indicator (e.g., "2 / 4")
- **Accessibility**: Keyboard navigation, ARIA labels

## Adding New Event Images

1. **Add images** to `/public/images/events/`
2. **Update configurations** in EventExamples.tsx and past-events/page.tsx
3. **Test carousel** on multiple devices
4. **Verify performance** (image sizes, loading times)

## Best Practices

- ✅ Optimize images before adding (use compression tools)
- ✅ Use consistent aspect ratio (16:10)
- ✅ Choose diverse, high-quality photos
- ✅ Update both homepage and past events page
- ❌ Don't add too many images (4 max per event)
- ❌ Don't use different aspect ratios
- ❌ Don't upload unoptimized images
