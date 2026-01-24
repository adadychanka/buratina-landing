# Event Images

This directory contains images for the Event Examples section. The site supports **multiple images per event** via an interactive carousel.

## Expected Images

Add images for each event type. You can add **1-4 images per event** (carousel shows automatically for 2+ images):

### Naming Convention

Use the format: `{eventType}-{number}.jpg`

Examples:
- `birthday-1.jpg`, `birthday-2.jpg`, `birthday-3.jpg`
- `corporate-1.jpg`, `corporate-2.jpg`
- `concert-1.jpg`, `concert-2.jpg`, `concert-3.jpg`, `concert-4.jpg`
- `privateParty-1.jpg`, `privateParty-2.jpg`
- `cultural-1.jpg`, `cultural-2.jpg`, `cultural-3.jpg`
- `photoshoot-1.jpg` (single image, no carousel)

## Image Specifications

- **Aspect Ratio**: 16:10 (1600x1000px recommended)
- **Format**: JPG or PNG
- **File Size**: Optimize for web (< 500KB per image)
- **Resolution**: High quality for desktop displays
- **Content**: Professional photos showing the venue during events

## Responsive Images

For optimal performance, consider creating multiple sizes:
- Large: 1600x1000px (desktop)
- Medium: 1024x640px (tablet)
- Small: 640x400px (mobile)

## Carousel Features

✨ **Automatic carousel for multiple images:**
- Swipe/touch gestures on mobile
- Arrow navigation buttons (appear on hover)
- Dot indicators at bottom
- Image counter (top right)
- Loop navigation
- Smooth transitions

📱 **Single image behavior:**
- No carousel UI shown
- Clean, simple presentation

## Updating the Components

Once you add real images, update the event configurations in:

### 1. Homepage (`src/components/sections/EventExamples.tsx`)

```typescript
const events = [
  {
    key: 'birthday' as const,
    images: ['/images/events/birthday-1.jpg', '/images/events/birthday-2.jpg', '/images/events/birthday-3.jpg'],
  },
  {
    key: 'corporate' as const,
    images: ['/images/events/corporate-1.jpg', '/images/events/corporate-2.jpg'],
  },
  // ... other events
];
```

### 2. Past Events Page (`src/app/[locale]/past-events/page.tsx`)

```typescript
const events = [
  {
    key: 'birthday' as const,
    images: ['/images/events/birthday-1.jpg', '/images/events/birthday-2.jpg', '/images/events/birthday-3.jpg'],
  },
  // ... all 6 events
];
```

## Tips for Great Event Photos

📸 **Photo Selection:**
- Choose diverse angles and perspectives
- Include venue atmosphere shots
- Show guests enjoying the event
- Capture key moments and details
- Mix wide shots with close-ups

🎨 **Photo Quality:**
- Good lighting (avoid dark/blurry images)
- Professional or high-quality phone photos
- Consistent color grading across images
- Focus on atmosphere and emotions

## Technical Notes

- **Carousel Library**: Uses Embla Carousel (lightweight, touch-friendly)
- **Performance**: Images lazy-load for better performance
- **Accessibility**: Full keyboard navigation and ARIA labels
- **Responsive**: Adapts to all screen sizes
