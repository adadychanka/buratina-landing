// Configuration for menu images by locale
// Currently we only have English images, but the structure
// is ready for RU/SR (or others) to be added later.

type SupportedLocale = 'en' | 'ru' | 'sr' | (string & {});

const MENU_IMAGES: Record<SupportedLocale, string[] | undefined> = {
  en: [
    '/images/menu/menu.en.1.png',
    '/images/menu/menu.en.2.png',
    '/images/menu/menu.en.3.png',
  ],
  // ru: ['/images/menu/menu.ru.1.png', ...]
  // sr: ['/images/menu/menu.sr.1.png', ...]
};

export type MenuImagesConfig = {
  /** Locale whose images we are actually showing */
  resolvedLocale: SupportedLocale;
  /** Paths to static menu images under /public */
  images: string[];
  /** True when we had to fall back (e.g. ru → en) */
  isFallback: boolean;
};

/**
 * Returns menu images for the given locale.
 * Falls back to English if the locale does not have its own images.
 */
export function getMenuImagesForLocale(locale: SupportedLocale): MenuImagesConfig {
  const normalizedLocale = (locale ?? 'en') as SupportedLocale;

  const directImages = MENU_IMAGES[normalizedLocale];
  if (directImages && directImages.length > 0) {
    return {
      resolvedLocale: normalizedLocale,
      images: directImages,
      isFallback: false,
    };
  }

  const englishImages = MENU_IMAGES.en ?? [];

  return {
    resolvedLocale: 'en',
    images: englishImages,
    isFallback: normalizedLocale !== 'en',
  };
}

