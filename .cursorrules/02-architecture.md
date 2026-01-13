# Architecture

## Project Structure

- Use Next.js App Router structure
- Components in `src/components/`
- Sections in `src/components/sections/`
- UI components from shadcn/ui in `src/components/ui/`
- Utilities in `src/lib/utils/`
- Types in `src/types/`
- Hooks in `src/hooks/`
- API routes in `src/app/api/`
- Validation schemas in `src/lib/validations/`

## File Naming

- Use PascalCase for components: `ContactForm.tsx`
- Use camelCase for utilities: `cn.ts`, `formatDate.ts`
- Use kebab-case for API routes: `route.ts`
- Use descriptive names that indicate purpose

## Component Guidelines

- Use 'use client' directive only when necessary (for interactivity, hooks, event handlers)
- Server Components by default for better performance
- Extract reusable logic into custom hooks
- Keep components focused and single-purpose
- Use shadcn/ui components and customize as needed
