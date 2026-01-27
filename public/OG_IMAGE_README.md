# OG Image Guidelines

## Current Status

**Temporary**: Using `hero-banner-1600.jpg` as `og-image.jpg`

**Action Required**: Create a proper branded OG image with design tools.

---

## OG Image Requirements

### Dimensions
- **Size**: 1200 x 630 pixels (Facebook/LinkedIn standard)
- **Aspect Ratio**: 1.91:1
- **File Format**: JPG or PNG
- **File Size**: < 8MB (recommended < 300KB)

### Content Guidelines

**Must Include**:
- ✅ Buratina Bar branding/logo
- ✅ Tagline: "The Most Mystical Bar in Belgrade"
- ✅ Visual representation of the bar's atmosphere
- ✅ High-quality, branded imagery

**Text Guidelines**:
- Large, readable text (minimum 60px font size)
- High contrast (dark text on light background or vice versa)
- No more than 2-3 lines of text
- Avoid text in outer 10% of image (safe zone)

### Design Recommendations

**Option 1: Hero-Based Design**
- Use existing hero banner as background
- Add text overlay with branding
- Include call-to-action or unique selling point
- Apply gradient overlay for text readability

**Option 2: Branded Card Design**
- Solid or gradient background
- Centered logo and typography
- Modern, mystical aesthetic matching brand
- Include location: "Belgrade, Serbia"

**Option 3: Photo Collage**
- Showcase bar interior/atmosphere
- Add text overlay with branding
- Include key features (events, cocktails, etc.)

### Safe Zone

Keep important content within central 1200 x 630px area:
- **Top/Bottom**: 70px margin
- **Left/Right**: 70px margin

This ensures content isn't cropped on any platform.

---

## Platform Requirements

### Facebook/LinkedIn
- **Recommended**: 1200 x 630px
- **Minimum**: 600 x 315px
- Displays at 1.91:1 aspect ratio

### Twitter
- **Recommended**: 1200 x 675px (16:9)
- **Summary Large Image**: 1.91:1 aspect ratio works
- Falls back to 1:1 square if needed

### WhatsApp/Telegram
- Uses same OG image
- Thumbnails to smaller size
- Text must remain readable

---

## Design Tools

### Free Options
- **Canva**: canva.com (OG image templates available)
- **Figma**: figma.com (free design tool)
- **GIMP**: gimp.org (open-source Photoshop alternative)

### Paid Options
- **Adobe Photoshop**: Professional photo editing
- **Adobe Illustrator**: Vector-based design
- **Sketch**: Mac-only design tool

### AI Generation (Quick Option)
- **Midjourney**: AI image generation
- **DALL-E**: OpenAI image generator
- **Stable Diffusion**: Open-source AI generation

---

## Template Structure

```
[Background: Mystical bar interior]

[Logo/Branding: Centered or top-left]

Buratina Bar
The Most Mystical Bar in Belgrade

[Optional: Call-to-action or feature]
Host Your Event | Unique Cocktails | Live Music
```

---

## Testing

After creating the OG image, test on:

1. **Facebook Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Enter: https://buratina-bar.com
   - Click "Scrape Again" to refresh cache

2. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Enter: https://buratina-bar.com
   - Verify image displays correctly

3. **LinkedIn Post Inspector**
   - URL: https://www.linkedin.com/post-inspector/
   - Enter: https://buratina-bar.com
   - Check preview

4. **WhatsApp**
   - Send link to yourself
   - Verify preview shows correctly

---

## Brand Assets Needed

To create a professional OG image, gather:

- [ ] High-resolution logo (PNG with transparency)
- [ ] Brand colors (hex codes)
- [ ] Brand fonts (or web-safe alternatives)
- [ ] High-quality photos of bar interior
- [ ] Any existing brand guidelines

---

## Example Prompt for AI Generation

If using AI tools like Midjourney:

```
A mystical, atmospheric bar interior in Belgrade with warm amber 
lighting, wooden decor, and vintage elements. Cinematic, moody, 
professional photography. Include text space for branding overlay. 
1200x630 aspect ratio, high detail, professional commercial photography.
```

---

## Implementation

Once created, replace `/public/og-image.jpg` with your new design.

The image is already referenced in:
- `src/app/[locale]/layout.tsx` (OpenGraph metadata)
- Automatically used by social platforms

No code changes needed - just replace the file!

---

## Optimization

Before uploading:
1. **Compress**: Use TinyPNG, ImageOptim, or Squoosh
2. **Target**: 100-300KB file size
3. **Format**: JPG for photos, PNG for graphics with transparency
4. **Quality**: 80-85% (balance quality vs. file size)

---

## Accessibility

Consider:
- High contrast text (4.5:1 minimum ratio)
- Readable font sizes (60px+ for main text)
- Alt text already configured in metadata
- Avoid text-only images (combine with visuals)

---

## Future Enhancements

Consider creating variants for:
- Different pages (events, menu, etc.)
- Seasonal campaigns
- Special events
- Language-specific versions (EN/RU/SR)

**Location**: Use page-specific metadata to set different OG images per route.
