---
description: Component architecture and reusability guidelines for Buratina Bar landing
globs: ["src/components/**/*.tsx"]
alwaysApply: true
---

# Component Architecture

## Component Structure

### Component Organization
- **Layout Components** (`src/components/layout/`): Header, Footer, global layout
- **Section Components** (`src/components/sections/`): Homepage sections (Hero, About, Events, etc.)
- **UI Components** (`src/components/ui/`): Reusable components (buttons, carousels, etc.)

### Component Types
1. **Server Components** (default): Use for static content, SEO-critical sections
2. **Client Components** (`'use client'`): Use only when needed for:
   - State management (useState, useReducer)
   - Event handlers (onClick, onChange)
   - Browser APIs (useEffect with window/document)
   - Third-party libraries requiring client-side JS (carousels, modals)

## Reusability Guidelines

### When to Create a Reusable Component

Create a reusable component when:
- Code is duplicated in 2+ places
- Logic/markup is complex (>50 lines) and self-contained
- Component has clear, single responsibility
- Props can be well-defined and typed

### Component Props Best Practices

```typescript
// ✅ Good: Clear, typed props with defaults
type ComponentProps = {
  variant?: 'default' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  className?: string; // Allow custom styling
};

export function Component({ variant = 'default', size = 'md', className }: ComponentProps) {
  // Implementation
}

// ❌ Bad: Unclear, untyped props
function Component(props: any) {
  // Implementation
}
```

### Component Composition Pattern

Prefer composition over configuration:

```typescript
// ✅ Good: Flexible composition
<EventCard cardKey="birthday" variant="compact" images={imageArray} />

// ❌ Bad: Too many boolean flags
<EventCard showCarousel={true} showBadge={true} showHighlights={true} />
```

## Event Components Example

### EventCard Component
- **Purpose**: Reusable card for displaying event information
- **Variants**: `default` (homepage), `compact` (grid view)
- **Props**: `cardKey`, `variant`, `images`
- **Client Component**: Yes (uses ImageCarousel which requires client-side)

### ImageCarousel Component
- **Purpose**: Reusable image carousel with navigation
- **Client Component**: Yes (uses Embla Carousel - requires useEffect, event handlers)
- **Smart Behavior**: Shows carousel UI only when >1 image

## Guidelines for Future Components

1. **Start with the simplest solution**: Single-purpose, clear responsibility
2. **Extract when duplicated**: Don't preemptively create reusable components
3. **Type everything**: Use TypeScript for all props and state
4. **Document variants**: If component has multiple modes, use `variant` prop
5. **Allow customization**: Accept `className` prop for styling overrides
6. **Test client/server boundary**: Minimize 'use client' usage
