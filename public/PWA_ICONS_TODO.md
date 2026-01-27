# PWA Icons - Action Required

## Current Status

⚠️ **Missing Icons**: The following PWA icon files are referenced in the manifest but need to be created:
- `/public/icon-192.png` (192x192px)
- `/public/icon-512.png` (512x512px)

## Why These Icons Matter

1. **Android Home Screen**: 192x192px icon shows when users add your PWA to their Android home screen
2. **Splash Screen**: 512x512px icon is used for the PWA splash screen on high-resolution devices
3. **PWA Installation**: Both icons are required for a complete "Add to Home Screen" experience

## Design Requirements

### Icon-192.png (192x192px)
- **Size**: Exactly 192x192 pixels
- **Format**: PNG with transparency
- **Content**: Buratina Bar logo or "B" symbol
- **Safe Zone**: Keep important content within 160x160px center (icons can be cropped/masked)
- **Background**: Either transparent OR solid color matching brand
- **File Size**: < 50KB (optimized)

### Icon-512.png (512x512px)
- **Size**: Exactly 512x512 pixels
- **Format**: PNG with transparency
- **Content**: Same as 192px version (scaled up)
- **Safe Zone**: Keep important content within 440x440px center
- **Background**: Either transparent OR solid color matching brand
- **File Size**: < 200KB (optimized)

## Current Placeholder

Currently, the `/public/apple-icon.png` (180x180px) is being used as a temporary placeholder, but proper PWA icons should be created for optimal user experience.

## Design Guidelines

### Brand Consistency
- Use the same logo/symbol from `/public/icon.svg`
- Match Buratina Bar brand colors (mystical, dark tones)
- High contrast for visibility on various backgrounds
- Simple, recognizable design

### Technical Considerations
- **Maskable icons**: Add 40px padding on all sides for Android adaptive icons
- **Color profile**: sRGB
- **Transparency**: Optional but recommended
- **Corners**: Square (will be rounded by OS)

## How to Create

### Option 1: From Existing SVG (Recommended)

If you have design tools:

```bash
# Using ImageMagick (if installed)
convert public/icon.svg -resize 192x192 -background none public/icon-192.png
convert public/icon.svg -resize 512x512 -background none public/icon-512.png
```

### Option 2: Online Tools

1. **PWA Icon Generator**: https://tools.crawlink.com/tools/pwa-icon-generator/
   - Upload your logo/icon
   - Generate all sizes at once
   - Download optimized PNGs

2. **Maskable.app**: https://maskable.app/editor
   - Design maskable icons with safe zones
   - Preview how icon looks on different devices
   - Export PWA-ready icons

3. **Favicon.io**: https://favicon.io/
   - Convert PNG/SVG to various icon sizes
   - Preview on multiple platforms
   - Download icon package

### Option 3: Design Tool Export

**Figma/Adobe XD/Sketch:**
1. Create 512x512px artboard
2. Place logo centered with 40px padding (if maskable)
3. Export as PNG at 1x (512x512) and 192x192 separately
4. Optimize with TinyPNG.com or ImageOptim

## Testing PWA Icons

After creating icons:

1. **Build and deploy** the site
2. **Test on Android**:
   - Open site in Chrome
   - Menu → "Add to Home Screen"
   - Check icon appearance on home screen
   - Open app and check splash screen
3. **Test on iOS** (uses apple-icon.png, already created):
   - Safari → Share → "Add to Home Screen"
   - Verify icon on home screen

## Validation Tools

- **Lighthouse PWA Audit**: Check if icons are detected
  ```bash
  npm run build
  npx lighthouse https://buratina-bar.com --view
  ```
- **Manifest Validator**: https://manifest-validator.appspot.com/
- **PWA Builder**: https://www.pwabuilder.com/

## Priority

**Medium-High**: While the site works without these specific icons, they significantly improve the PWA experience and user perception of professionalism.

## Current Workaround

The manifest currently references:
- SVG icon (scalable, works everywhere)
- Apple icon 180x180px (works for iOS)
- Missing: Android-specific 192px and 512px icons

Users can still add the PWA to their home screen, but may see:
- Generic browser icon
- Lower quality scaled SVG
- Inconsistent appearance across devices

## Next Steps

1. [ ] Design/export icon-192.png
2. [ ] Design/export icon-512.png
3. [ ] Optimize file sizes
4. [ ] Place in `/public/` directory
5. [ ] Test PWA installation on Android device
6. [ ] Run Lighthouse PWA audit
7. [ ] Delete this TODO file

---

**Note**: The web app manifest (`/src/app/manifest.ts`) is already configured to reference these icons. Once you create and add the PNG files to `/public/`, the PWA will automatically use them without code changes.
