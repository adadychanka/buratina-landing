---
description: Pre-commit and pre-deployment validation checklist based on common issues
globs: ["**/*"]
alwaysApply: false
---

# Pre-Deployment Checklist

## Overview

This checklist captures common issues encountered during development and ensures they're caught before committing or deploying code.

## Before Every Commit

### 1. Build Validation ✅

**Critical:** Always run a production build before committing:

```bash
npm run build
```

**What it catches:**
- TypeScript errors
- Missing dependencies
- Import errors
- Invalid configurations
- Route generation issues

**Expected output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (X/X)
✓ Finalizing page optimization
```

**Common Issues:**

#### Issue: Missing Dependencies
```
Error: Cannot find module 'critters'
```

**Fix:** Install missing dependency
```bash
npm install critters
```

**Prevention:** After adding new Next.js features (especially experimental ones), check if additional dependencies are required.

#### Issue: TypeScript Errors
```
error TS2322: Type 'string' is not assignable to type 'number'
```

**Fix:** Run type check and fix errors
```bash
npm run type-check
# or
npx tsc --noEmit
```

#### Issue: Import Path Errors
```
Module not found: Can't resolve '@/components/...'
```

**Fix:** Verify import paths and file existence
```bash
ls src/components/...
```

### 2. Linting ✅

Run linter to catch code style and potential bugs:

```bash
npm run lint
```

**What it catches:**
- Code style violations
- Unused variables
- Missing dependencies in useEffect
- Dangerous HTML usage without suppressions
- Accessibility issues

**Common Issues:**

#### Issue: Dangerous HTML without suppression
```
error: Using 'dangerouslySetInnerHTML' without comment suppression
```

**Fix:** Add biome-ignore comment
```tsx
<script
  type="application/ld+json"
  // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
```

### 3. Type Checking ✅

Verify TypeScript types separately:

```bash
npm run type-check
```

**What it catches:**
- Type mismatches
- Missing type definitions
- Invalid property access
- Incorrect function signatures

**Common Issues:**

#### Issue: Unknown property in metadata
```
error TS2353: Object literal may only specify known properties, and 'modifiedTime' does not exist in type 'OpenGraphMetadata'
```

**Fix:** Check Next.js docs for correct property names
```typescript
// ❌ Wrong
openGraph: {
  modifiedTime: '...',
}

// ✅ Correct
other: {
  'og:updated_time': '...',
}
```

### 4. Git Status Check ✅

Review what will be committed:

```bash
git status
git diff
```

**Verify:**
- [ ] No unintended files (node_modules, .env, etc.)
- [ ] No debug code (console.log, debugger)
- [ ] No commented-out code blocks
- [ ] No TODO comments without tracking

### 5. Translation Completeness ✅

If you added new translation keys:

```bash
# Check if key exists in all locales
key="Hero.imageAlt"
grep -r "$key" src/messages/
```

**Expected:** Should appear in en.json, sr.json, and ru.json

**Verification script:**
```bash
# Compare keys between locale files
node -e "
const en = require('./src/messages/en.json');
const sr = require('./src/messages/sr.json');
const ru = require('./src/messages/ru.json');

function getKeys(obj, prefix = '') {
  return Object.keys(obj).flatMap(key =>
    typeof obj[key] === 'object' && obj[key] !== null
      ? getKeys(obj[key], prefix + key + '.')
      : prefix + key
  );
}

const enKeys = getKeys(en);
const srKeys = getKeys(sr);
const ruKeys = getKeys(ru);

console.log('Missing in SR:', enKeys.filter(k => !srKeys.includes(k)));
console.log('Missing in RU:', enKeys.filter(k => !ruKeys.includes(k)));
"
```

## Before Committing (Git)

### 6. Commit Message Format ✅

Follow Conventional Commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Rules:**
- Subject must be lowercase
- Subject max 100 characters
- Body lines max 100 characters
- Use present tense ("add" not "added")
- Be descriptive but concise

**Good examples:**
```bash
git commit -m "$(cat <<'EOF'
feat(seo): add structured data schemas for local business and events

Implemented JSON-LD schemas following Schema.org standards:
- LocalBusiness (BarOrPub type) with complete venue information
- Organization schema with brand identity and contact details
- WebSite schema with SearchAction for site search
- Event schema for past-events page
- BreadcrumbList schema for navigation hierarchy

All schemas include proper TypeScript types and biome-ignore
comments for dangerouslySetInnerHTML usage.
EOF
)"
```

**Common Issues:**

#### Issue: Subject not lowercase
```
✖ subject must not be sentence-case, start-case, pascal-case, upper-case
```

**Fix:** Convert to lowercase
```bash
# ❌ Wrong
"Feat: Add SEO optimization"

# ✅ Correct
"feat: add seo optimization"
```

#### Issue: Line too long
```
✖ body's lines must not be longer than 100 characters
```

**Fix:** Wrap lines at 100 characters
```bash
# Use heredoc with manual wrapping
git commit -m "$(cat <<'EOF'
feat: add security headers

Added comprehensive security headers to next.config.mjs including
HSTS, X-Frame-Options, and Content-Type-Options for enhanced
security posture.
EOF
)"
```

### 7. File Path Quoting ✅

When staging files with special characters:

```bash
# ❌ Wrong (breaks with brackets, spaces, etc.)
git add src/app/[locale]/layout.tsx

# ✅ Correct
git add "src/app/[locale]/layout.tsx"

# For multiple files
git add "src/app/[locale]/layout.tsx" "src/app/[locale]/page.tsx"
```

**Tip:** Always quote paths when using shell commands programmatically.

## Before Deploying to Production

### 8. Environment Variables ✅

Verify all required environment variables are set:

**Check locally:**
```bash
# Required variables
echo $NEXT_PUBLIC_SITE_URL
echo $RESEND_API_KEY
```

**Check on hosting platform:**
- Vercel: Settings → Environment Variables
- Railway: Variables tab
- Netlify: Site settings → Environment variables

**Required variables:**
```bash
NEXT_PUBLIC_SITE_URL=https://buratina-bar.com
RESEND_API_KEY=re_...
```

### 9. Build on Production Environment ✅

Test build with production environment variables:

```bash
# Load production env vars
export NEXT_PUBLIC_SITE_URL=https://buratina-bar.com

# Build
npm run build

# Test production server locally
npm start
```

**Verify:**
- [ ] Build completes successfully
- [ ] No environment variable errors
- [ ] All routes accessible
- [ ] API endpoints working
- [ ] Images loading correctly

### 10. SEO Validation ✅

Verify SEO implementation:

**A. Robots.txt**
```bash
curl https://buratina-bar.com/robots.txt
```

**Expected:**
- AI search bots allowed
- AI training bots blocked
- Sitemap URL included

**B. Sitemap**
```bash
curl https://buratina-bar.com/sitemap.xml
```

**Expected:**
- All public pages listed
- Proper locale URLs
- Valid XML format

**C. Metadata**
```bash
curl -s https://buratina-bar.com | grep -E '<title>|<meta.*description|<meta.*og:'
```

**Verify:**
- [ ] Title tag present
- [ ] Meta description present
- [ ] OpenGraph tags present
- [ ] Canonical URL correct
- [ ] Hreflang tags for all locales

**D. Structured Data**
```bash
# Check for JSON-LD
curl -s https://buratina-bar.com | grep -o '<script type="application/ld+json">.*</script>'
```

**Verify:**
- [ ] LocalBusiness schema on homepage
- [ ] Organization schema on homepage
- [ ] WebSite schema on homepage
- [ ] Event schema on past-events page
- [ ] BreadcrumbList on subpages

**E. Use Testing Tools**
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator

### 11. Performance Check ✅

Verify performance optimizations:

**A. Image Optimization**
```bash
# Check if images use modern formats
curl -s -I https://buratina-bar.com/_next/image?url=/hero-banner.jpg | grep content-type
```

**Expected:** `content-type: image/webp` or `image/avif`

**B. Compression**
```bash
# Check if gzip is enabled
curl -s -I -H "Accept-Encoding: gzip" https://buratina-bar.com | grep content-encoding
```

**Expected:** `content-encoding: gzip` or `br` (brotli)

**C. Security Headers**
```bash
# Check security headers
curl -s -I https://buratina-bar.com | grep -E 'x-frame-options|strict-transport|x-content-type'
```

**Expected:** All security headers present

**D. Core Web Vitals**
- Use PageSpeed Insights: https://pagespeed.web.dev/
- Target: All metrics in "Good" range (green)
- Focus on LCP, FID, CLS

### 12. Bot Protection Configuration ✅

**Critical for AI crawlers:** Ensure bot protection isn't blocking AI search engines.

**Cloudflare:**
1. Navigate to Security → Bots
2. Verify these user agents are NOT blocked:
   - OAI-SearchBot (OpenAI)
   - ChatGPT-User (ChatGPT)
   - PerplexityBot (Perplexity)
   - ClaudeBot (Anthropic)
   - Gemini-Bot (Google)
   - FirecrawlAgent
   - AndiBot
   - ExaBot
   - PhindBot
   - YouBot
   - DeepSeekBot

**Vercel:**
1. Check Firewall settings
2. Ensure "Good Bot" traffic is allowed
3. Review rate limiting rules

**Test:**
```bash
# Test if AI bots can access the site
curl -A "OAI-SearchBot" https://buratina-bar.com
curl -A "PerplexityBot" https://buratina-bar.com
```

**Expected:** 200 OK response, not 403 Forbidden

### 13. Analytics Verification ✅

If GA4 is configured, verify tracking:

1. Open site in browser
2. Open Google Analytics Real-Time view
3. Navigate between pages
4. Verify events are firing

**Custom dimensions to check:**
- AI referral sources
- Locale
- Page type

### 14. Cross-Browser Testing ✅

Test on multiple browsers:
- [ ] Chrome (desktop & mobile)
- [ ] Firefox
- [ ] Safari (desktop & iOS)
- [ ] Edge

**Focus areas:**
- [ ] Images load correctly
- [ ] Fonts render properly
- [ ] Forms work (contact form)
- [ ] Language switcher functions
- [ ] Mobile menu works
- [ ] PWA installation (mobile)

### 15. Internationalization Check ✅

Test all locale versions:

```bash
# Test each locale
curl https://buratina-bar.com      # English (default)
curl https://buratina-bar.com/sr   # Serbian
curl https://buratina-bar.com/ru   # Russian
```

**Verify:**
- [ ] All locales load correctly
- [ ] Content is translated (not showing English everywhere)
- [ ] Hreflang tags point to correct locales
- [ ] Language switcher works
- [ ] Image alt text is localized

## Deployment Platforms

### Vercel Deployment

**Pre-deployment:**
```bash
# Install Vercel CLI
npm i -g vercel

# Preview deployment
vercel

# Production deployment
vercel --prod
```

**Post-deployment:**
- [ ] Check build logs for warnings
- [ ] Verify environment variables
- [ ] Test all routes
- [ ] Check custom domain configuration

### Railway Deployment

**Pre-deployment:**
- [ ] Verify `railway.json` or `Procfile` if needed
- [ ] Check build command: `npm run build`
- [ ] Check start command: `npm start`
- [ ] Verify Node version matches local

**Common Railway issues:**

```
Error: Cannot find module 'critters'
```

**Fix:** Ensure dependency is in `dependencies`, not `devDependencies`
```json
{
  "dependencies": {
    "critters": "^0.0.21"
  }
}
```

## Emergency Rollback Procedure

If deployment breaks production:

### Vercel
```bash
# Rollback to previous deployment
vercel rollback
```

### Railway
1. Go to Deployments tab
2. Find last working deployment
3. Click "Redeploy"

### Manual
```bash
# Revert last commit
git revert HEAD
git push origin main

# Or reset to previous commit (destructive)
git reset --hard HEAD~1
git push --force origin main
```

## Automated Checks (Recommended)

Create a pre-commit hook:

**File:** `.husky/pre-commit`
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "Running pre-commit checks..."

# Type check
echo "→ Type checking..."
npm run type-check || exit 1

# Lint
echo "→ Linting..."
npm run lint || exit 1

# Build (optional, can be slow)
# echo "→ Building..."
# npm run build || exit 1

echo "✓ All checks passed!"
```

**Setup:**
```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/pre-commit "npm run type-check && npm run lint"
```

## Checklist Summary

Copy this checklist for each deployment:

```markdown
## Pre-Commit
- [ ] `npm run build` - successful
- [ ] `npm run lint` - no errors
- [ ] `npm run type-check` - no errors
- [ ] All translations added (en, sr, ru)
- [ ] No debug code (console.log, etc.)
- [ ] Git diff reviewed
- [ ] Commit message follows Conventional Commits
- [ ] File paths quoted correctly

## Pre-Deploy
- [ ] Environment variables verified
- [ ] Build on production environment successful
- [ ] robots.txt correct
- [ ] sitemap.xml accessible
- [ ] Metadata verified (Rich Results Test)
- [ ] Structured data validated (Schema.org)
- [ ] Images optimized (WebP/AVIF)
- [ ] Security headers present
- [ ] Bot protection configured (AI bots allowed)
- [ ] Core Web Vitals green
- [ ] All locales working (en, sr, ru)
- [ ] Cross-browser tested
- [ ] Analytics tracking verified

## Post-Deploy
- [ ] Production site accessible
- [ ] No console errors
- [ ] Forms working
- [ ] Images loading
- [ ] All routes accessible
- [ ] Social sharing working (test with debuggers)
- [ ] PWA installable (mobile)
```

## Related Rules

- See `09-seo.md` for comprehensive SEO guidelines
- See `11-git-workflow.md` for git best practices
- See `16-linting.md` for linting standards
- See `03-internationalization.md` for i18n testing
