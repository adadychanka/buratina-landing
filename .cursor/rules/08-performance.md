---
description: Performance optimization guidelines
globs: ["src/**/*.tsx", "src/**/*.ts"]
alwaysApply: true
---

# Performance

## Image Optimization

- Use next/image for all images
- Implement lazy loading where appropriate
- Use WebP format with fallback
- Provide responsive images with srcset
- Use placeholder blur for better UX

## Code Optimization

- Optimize bundle size
- Use dynamic imports for heavy components
- Minimize client-side JavaScript
- Code splitting for routes

## Loading States

- Show loading indicators for async operations
- Implement skeleton screens for better perceived performance
- Use Suspense boundaries where appropriate

## Best Practices

- Minimize re-renders
- Use React.memo for expensive components
- Optimize useEffect dependencies
- Avoid unnecessary state updates
