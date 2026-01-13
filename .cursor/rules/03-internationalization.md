---
description: Internationalization rules and translation guidelines using next-intl
globs: ["src/**/*.tsx", "src/messages/**/*.json"]
alwaysApply: true
---

# Internationalization

## Rules

- Use next-intl for all text content
- Translation files in `src/messages/`
- Support locales: en, ru, sr
- Always use `useTranslations` hook for text
- Never hardcode text strings - always use translations
- Add new translation keys to all locale files (en.json, ru.json, sr.json)

## Translation Structure

- Group translations by component/section
- Use nested objects for related translations
- Keep translation keys descriptive and consistent
- Example: `ContactForm.name`, `ContactForm.submit`

## Locale Detection

- Middleware automatically detects language from Accept-Language header
- Falls back to English (en) if language not supported
- All locales have URL prefix: /en, /ru, /sr
