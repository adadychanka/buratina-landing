'use client';

import { getMenuImagesForLocale } from '@/config/menuImages';
import { Button } from '@/components/ui/button';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, ZoomIn, ZoomOut, X } from 'lucide-react';

/**
 * Menu section - compact carousel with menu images.
 * Shows one menu page at a time with navigation controls.
 * Includes a simple full-screen viewer that relies on native pinch-zoom on mobile.
 */
export function Menu() {
  const t = useTranslations('Menu');
  const locale = useLocale();

  const { images, isFallback } = getMenuImagesForLocale(locale);
  const hasImages = images.length > 0;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => {
      if (!hasImages) return prev;
      return (prev - 1 + images.length) % images.length;
    });
  }, [hasImages, images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (!hasImages) return prev;
      return (prev + 1) % images.length;
    });
  }, [hasImages, images.length]);

  const openLightbox = () => {
    setIsLightboxOpen(true);
    setZoomLevel(1);
  };

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setZoomLevel(1);
  }, []);

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };

  const resetZoom = () => {
    setZoomLevel(1);
  };

  // Keyboard controls inside lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, closeLightbox, goToPrevious, goToNext]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen]);

  return (
    <section id="menu" className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="mb-4 text-center font-serif text-4xl font-bold text-foreground md:mb-5 md:text-5xl">
          {t('title')}
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-center text-sm text-muted-foreground md:mb-8 md:text-base">
          {t('description')}
        </p>

        {/* Fallback note when we show English images for non-English locales */}
        {isFallback && hasImages && (
          <p className="mx-auto mb-6 max-w-2xl text-center text-sm text-muted-foreground md:mb-8 md:text-base">
            {t('menuNotFoundDescription')}
          </p>
        )}

        {/* Carousel */}
        {hasImages && (
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 md:gap-6">
            <div className="group relative w-full overflow-hidden rounded-lg border bg-background shadow-md">
              <button
                type="button"
                onClick={openLightbox}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox();
                  }
                }}
                className="relative block w-full cursor-zoom-in"
                aria-label={t('zoomIn')}
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={images[currentIndex]}
                    alt={t('title')}
                    fill
                    className="h-full w-full object-contain transition-transform duration-300 ease-out"
                    priority
                  />
                </div>
              </button>

              {/* Zoom button overlay */}
              <button
                type="button"
                onClick={openLightbox}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox();
                  }
                }}
                className="absolute right-3 top-3 flex items-center justify-center rounded-lg bg-black/70 p-2 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={t('zoomIn')}
              >
                <ZoomIn className="h-5 w-5" />
              </button>

              {/* Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevious();
                    }}
                    className="absolute left-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-black/60 p-2 text-white shadow-md transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={t('previous')}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-black/60 p-2 text-white shadow-md transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={t('next')}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Dots / page indicator */}
            {images.length > 1 && (
              <div className="flex items-center gap-2">
                {images.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      index === currentIndex ? 'bg-foreground' : 'bg-muted-foreground/40'
                    }`}
                    aria-label={t('page', { current: index + 1, total: images.length })}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {!hasImages && (
          <p className="mt-6 text-center text-sm text-muted-foreground md:text-base">
            {t('loadError')}
          </p>
        )}
      </div>

      {/* Lightbox - simple full-screen viewer (pinch-zoom friendly on mobile) */}
      {isLightboxOpen && hasImages && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              closeLightbox();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label={t('title')}
          tabIndex={-1}
        >
          <div className="relative flex h-full w-full flex-col">
            {/* Header with page info, zoom controls and close */}
            <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/80">
                  {t('page', { current: currentIndex + 1, total: images.length })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom controls (desktop & mobile) */}
                <div className="flex items-center gap-1 rounded-lg bg-black/60 p-1 backdrop-blur-sm">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      zoomOut();
                    }}
                    disabled={zoomLevel <= 1}
                    className="h-8 w-8 text-white hover:bg-white/20 disabled:opacity-50"
                    aria-label={t('zoomOut')}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      zoomIn();
                    }}
                    disabled={zoomLevel >= 3}
                    className="h-8 w-8 text-white hover:bg-white/20 disabled:opacity-50"
                    aria-label={t('zoomIn')}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      resetZoom();
                    }}
                    disabled={zoomLevel === 1}
                    className="h-8 w-8 text-white hover:bg-white/20 disabled:opacity-50"
                    aria-label={t('resetZoom')}
                    title={t('resetZoom')}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeLightbox}
                  className="h-8 w-8 text-white hover:bg-white/20"
                  aria-label={t('close')}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Image container - scrollable, with simple scale zoom (pinch still works on mobile) */}
            <div
              className="flex flex-1 items-center justify-center overflow-auto p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="transition-transform duration-200 ease-out"
                style={{ transform: `scale(${zoomLevel})` }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setZoomLevel((prev) => (prev > 1 ? 1 : 2));
                }}
              >
                <Image
                  src={images[currentIndex]}
                  alt={t('title')}
                  width={1400}
                  height={2000}
                  className="max-h-[90vh] w-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label={t('previous')}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label={t('next')}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Footer hint */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-center text-xs text-white/60">
                Double-click or use controls to zoom · Pinch to zoom on mobile
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

