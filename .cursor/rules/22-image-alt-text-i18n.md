---
description: Image alt text internationalization patterns for SEO and accessibility
globs: ["src/components/**/*.tsx", "src/app/**/*.tsx", "src/messages/**/*.json"]
alwaysApply: true
---

# Image Alt Text Internationalization

## Critical Rules

### NEVER Hardcode Alt Text
❌ **WRONG:**
```tsx
<Image 
  src="/hero-banner.jpg" 
  alt="Buratina Bar interior with lighting" 
/>
```

✅ **CORRECT:**
```tsx
<Image 
  src="/hero-banner.jpg" 
  alt={t('imageAlt')} 
/>
```

### Always Use Translation Keys for Alt Text

All image alt text MUST be:
1. **Descriptive** - Explain what the image shows in detail
2. **Localized** - Use translation keys, not hardcoded text
3. **SEO-friendly** - Include relevant keywords naturally
4. **Context-aware** - Different alt text for different contexts

## Alt Text Patterns

### Static Images

For images that appear once with fixed context:

```tsx
// Component
const t = useTranslations('Hero');
<Image src="/hero.jpg" alt={t('imageAlt')} />

// Translation file (en.json)
{
  "Hero": {
    "imageAlt": "Buratina Bar interior showcasing mystical atmospheric lighting, wooden decor, and warm ambiance in Belgrade"
  }
}
```

### Dynamic Images (with variables)

For images where alt text needs dynamic values:

```tsx
// Component - Menu with page numbers
const t = useTranslations('Menu');
<Image 
  src={`/menu/page-${currentIndex + 1}.jpg`}
  alt={t('imageAlt', { page: currentIndex + 1 })} 
/>

// Translation file (en.json)
{
  "Menu": {
    "imageAlt": "Buratina Bar menu page {page} - cocktails, drinks and beverages list"
  }
}
```

### Gallery/Carousel Images

For multiple images in galleries:

```tsx
// Option 1: Individual keys for each image
const t = useTranslations('Gallery');
images.map((img, index) => (
  <Image 
    key={img.src}
    src={img.src}
    alt={t(`image${index + 1}Alt`)} 
  />
))

// Option 2: Generic with dynamic data
const t = useTranslations('Events');
<Image 
  src={event.image}
  alt={t('eventImageAlt', { 
    eventType: t(event.key),
    index: index + 1 
  })} 
/>
```

### Event/Dynamic Content Images

For content-driven images:

```tsx
const t = useTranslations('Events');
<Image 
  src={event.image}
  alt={t(`${event.key}.imageAlt`)} 
/>

// Translation file structure
{
  "Events": {
    "birthday": {
      "imageAlt": "Buratina Bar birthday party celebration with guests, decorations, and festive atmosphere"
    },
    "corporate": {
      "imageAlt": "Corporate team building event at Buratina Bar with professional setup and networking space"
    }
  }
}
```

## Alt Text Writing Guidelines

### SEO-Optimized Alt Text Formula

**Pattern:** `[Primary Subject] + [Key Details] + [Location/Context] + [Action/Atmosphere]`

**Examples:**

✅ **Good:**
- "Buratina Bar interior showcasing mystical atmospheric lighting, wooden decor, and warm ambiance in Belgrade"
- "Corporate team building event at Buratina Bar with professional setup and networking space"
- "Buratina Bar menu page 2 - cocktails, drinks and beverages list"

❌ **Bad:**
- "bar" (too short, not descriptive)
- "Image of our bar interior" (generic, not SEO-friendly)
- "DSC_1234.jpg" (technical, meaningless to users)
- "Click here to see our bar" (not descriptive, incorrect use)

### Length Guidelines

- **Minimum:** 10 words (descriptive enough for SEO)
- **Optimal:** 10-20 words (balanced for SEO and UX)
- **Maximum:** 125 characters (screen reader limit)

### Keyword Integration

Include relevant keywords naturally:
- Business name: "Buratina Bar"
- Location: "Belgrade"
- Services: "cocktails", "events", "live music"
- Atmosphere: "mystical", "atmospheric", "cozy"
- Event types: "birthday party", "corporate event", "private party"

### Multi-language Considerations

Each language should have:
1. **Natural phrasing** - Not direct word-for-word translation
2. **Cultural adaptation** - Adjust descriptions for local audience
3. **Keyword localization** - Use keywords people search in that language

```json
{
  "en": "Buratina Bar interior showcasing mystical atmospheric lighting, wooden decor, and warm ambiance in Belgrade",
  "sr": "Enterijer Buratina Bara sa mističnom atmosferskom rasvetu, drvenim dekorom i toplom ambijentom u Beogradu",
  "ru": "Интерьер бара Buratina с мистическим атмосферным освещением, деревянным декором и теплой атмосферой в Белграде"
}
```

## Next.js Image Component Best Practices

### Priority Images (Above the Fold)

```tsx
<Image
  src="/hero.jpg"
  alt={t('imageAlt')}
  priority // Disable lazy loading for LCP
  width={1920}
  height={1080}
  quality={90}
/>
```

### Lazy Loading (Below the Fold)

```tsx
<Image
  src="/gallery-1.jpg"
  alt={t('galleryImage1Alt')}
  loading="lazy" // Default behavior
  width={800}
  height={600}
  quality={85}
/>
```

## Checklist for Adding New Images

Before committing code with new images:

- [ ] Alt text uses translation key (not hardcoded)
- [ ] Alt text is descriptive (10+ words)
- [ ] Alt text includes business name
- [ ] Alt text includes location (if relevant)
- [ ] Alt text describes image content accurately
- [ ] Translation added to ALL locale files (en, sr, ru)
- [ ] Natural phrasing in each language
- [ ] Image uses Next.js `Image` component
- [ ] Correct `priority` or `loading` attribute
- [ ] Image optimized (AVIF/WebP support via next.config.mjs)

## Common Mistakes to Avoid

### ❌ Mistake 1: Hardcoded English Text
```tsx
<Image src="/bar.jpg" alt="Our mystical bar in Belgrade" />
```

**Problem:** Not localized, breaks for non-English users

**Fix:** Use translation key
```tsx
<Image src="/bar.jpg" alt={t('barImageAlt')} />
```

### ❌ Mistake 2: Empty or Generic Alt Text
```tsx
<Image src="/event.jpg" alt="" />
<Image src="/event.jpg" alt="image" />
```

**Problem:** Bad for SEO and accessibility

**Fix:** Descriptive, contextualized alt text
```tsx
<Image src="/event.jpg" alt={t('birthdayEventAlt')} />
```

### ❌ Mistake 3: Filename as Alt Text
```tsx
<Image src="/IMG_5432.jpg" alt="IMG_5432" />
```

**Problem:** Meaningless to users and search engines

**Fix:** Human-readable description
```tsx
<Image src="/IMG_5432.jpg" alt={t('corporateEventAlt')} />
```

### ❌ Mistake 4: Using Only English in Multilingual Site
```json
{
  "en": { "Hero": { "imageAlt": "Bar interior with lighting" } },
  "sr": { "Hero": { "imageAlt": "Bar interior with lighting" } }, // ❌ Same as English!
  "ru": { "Hero": { "imageAlt": "Bar interior with lighting" } }  // ❌ Same as English!
}
```

**Fix:** Translate to each language properly
```json
{
  "en": { "Hero": { "imageAlt": "Buratina Bar interior showcasing mystical lighting and warm ambiance" } },
  "sr": { "Hero": { "imageAlt": "Enterijer Buratina Bara sa mističnom rasvetu i toplom ambijentom" } },
  "ru": { "Hero": { "imageAlt": "Интерьер бара Buratina с мистическим освещением и теплой атмосферой" } }
}
```

## AI Search Optimization (GEO/AEO)

Alt text is increasingly important for AI search engines (ChatGPT, Perplexity, Gemini):

### Why It Matters
- AI crawlers extract image context from alt text
- Well-described images improve content understanding
- Helps AI generate accurate summaries about your business

### Best Practices for AI
1. **Front-load important info**: Put business name and key details first
2. **Include context**: Location, event type, atmosphere
3. **Natural language**: Write for humans, not algorithms
4. **Avoid keyword stuffing**: Keep it natural and descriptive

## Testing Alt Text

### Manual Testing
1. **Visual check**: Does alt text accurately describe the image?
2. **Context check**: Does it make sense in the page context?
3. **Length check**: 10-20 words, under 125 characters?
4. **Localization check**: Translated naturally in all languages?

### Automated Testing
```bash
# Check for hardcoded alt text (should return 0 matches)
grep -r 'alt="[A-Z]' src/components/
grep -r "alt='[A-Z]" src/components/

# Check for empty alt text (should return 0 matches)
grep -r 'alt=""' src/components/
grep -r "alt=''" src/components/

# Find images without alt attribute (should return 0 matches)
grep -r '<Image' src/ | grep -v 'alt='
```

### Screen Reader Testing
- Use VoiceOver (Mac) or NVDA (Windows)
- Navigate to images with screen reader
- Verify alt text reads naturally and provides useful context

## Related Rules

- See `03-internationalization.md` for general i18n patterns
- See `09-seo.md` for comprehensive SEO guidelines
- See `18-image-media-management.md` for image file management
- See `21-structured-data.md` for structured data with images
