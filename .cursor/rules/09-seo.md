---
description: SEO optimization best practices and metadata guidelines
globs: ["src/app/**/layout.tsx", "src/app/**/page.tsx", "src/app/sitemap.ts", "src/app/robots.ts"]
alwaysApply: false
---

# SEO Optimization

## Metadata

- Add proper metadata to all pages
- Use `generateMetadata` function in layouts
- Include Open Graph and Twitter Card metadata
- Use canonical URLs for multilingual content

## Semantic HTML

- Use semantic HTML5 elements
- Proper heading hierarchy (h1, h2, h3)
- Use alt text for all images
- Proper form labels and ARIA attributes

## Sitemap and Robots

- Generate sitemap.xml automatically (sitemap.ts)
- Configure robots.txt properly (robots.ts)
- Include all locales in sitemap
- Set appropriate priority and change frequency

## Structured Data

- Consider adding JSON-LD structured data
- LocalBusiness schema for bar information
- Event schema for events
- Review schema for testimonials (future)

## Multilingual SEO

- Use hreflang tags for language alternates
- Proper lang attribute on html tag
- Separate URLs for each locale
- Canonical URLs for each language version
