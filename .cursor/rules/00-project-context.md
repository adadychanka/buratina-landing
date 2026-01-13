---
description: Project context and technology stack for Buratina Bar landing page
globs: ["**/*"]
alwaysApply: true
---

# Project Context

This is a landing page for Buratina Bar - a bar in Belgrade. The project uses Next.js 14+ with App Router, TypeScript, Tailwind CSS, and shadcn/ui.

## Cursor Rules Format

**IMPORTANT**: All Cursor rules must follow these requirements:

- **Location**: All rule files MUST be placed in `.cursor/rules/` directory only
- **File Format**: Rules must be Markdown files (`.md` extension)
- **Frontmatter**: Each rule file MUST start with YAML frontmatter containing:
  - `description`: Brief description of what the rule covers
  - `globs`: Array of glob patterns specifying which files the rule applies to (use `["**/*"]` for global rules)
  - `alwaysApply`: Boolean indicating if the rule should always be applied (typically `true` for project-wide rules)
- **Naming Convention**: Use numbered prefixes (e.g., `00-`, `01-`, `02-`) for ordering, followed by a descriptive kebab-case name
- **Structure**: Rules should be well-organized with clear headings and sections
- **No Duplication**: Do not create cursor rules in other locations (e.g., `.cursorrules/` or root directory)

## Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Internationalization**: next-intl
- **Form Handling**: React Hook Form + Zod
- **Email**: Resend
- **Linting**: Biome
- **Deployment**: Railway
