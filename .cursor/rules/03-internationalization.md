---
description: Internationalization rules and translation guidelines using next-intl
globs: ["src/**/*.tsx", "src/messages/**/*.json", "src/i18n/**/*.ts"]
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

## NextIntlClientProvider Setup

**CRITICAL**: When using `NextIntlClientProvider` in Server Components:

1. **Always pass `locale` prop**: The `locale` prop is REQUIRED for `useLocale()` to work correctly in client components
   ```tsx
   <NextIntlClientProvider messages={messages} locale={locale}>
     {children}
   </NextIntlClientProvider>
   ```

2. **Load messages correctly**: Use direct dynamic import instead of `getMessages()` to ensure correct locale:
   ```tsx
   // ✅ CORRECT - Direct import ensures correct locale
   const messages = (await import(`@/messages/${locale}.json`)).default;
   
   // ❌ AVOID - getMessages() may not respect locale in some cases
   const messages = await getMessages();
   ```

3. **Set request locale**: Always call `setRequestLocale(locale)` before loading messages:
   ```tsx
   setRequestLocale(locale);
   const messages = (await import(`@/messages/${locale}.json`)).default;
   ```

## Client Components

- Use `useLocale()` hook to get current locale in client components
- Use `useTranslations(namespace)` hook to get translation function
- The `useLocale()` hook will only work correctly if `NextIntlClientProvider` has the `locale` prop set

## Language Switching

- Use full page reload (`window.location.href`) when switching languages to ensure server components reload with new translations
- Extract locale from pathname in client components if needed:
  ```tsx
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] || 'en';
  ```

## Navigation

- Use navigation hooks from `@/i18n/navigation` for locale-aware navigation
- The `useRouter` and `usePathname` from `@/i18n/navigation` automatically handle locale prefixes
