'use client';

import { Button } from '@/components/ui/button';
import { getMenuImagesForLocale } from '@/config/menuImages';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface MenuImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal with a scrollable gallery of menu images.
 * Uses locale-aware image config with fallback to English.
 */
export function MenuImageGalleryModal({ isOpen, onClose }: MenuImageGalleryModalProps) {
  const t = useTranslations('Menu');
  const locale = useLocale();

  const { images, isFallback } = getMenuImagesForLocale(locale);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Close on Escape and lock body scroll while modal is open
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
          setIsZoomed(false);
        } else {
          onClose();
        }
      }

      if (lightboxIndex !== null) {
        if (event.key === 'ArrowRight') {
          setLightboxIndex((prev) => {
            if (prev === null || images.length === 0) return prev;
            return (prev + 1) % images.length;
          });
        }
        if (event.key === 'ArrowLeft') {
          setLightboxIndex((prev) => {
            if (prev === null || images.length === 0) return prev;
            return (prev - 1 + images.length) % images.length;
          });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [images.length, isOpen, lightboxIndex, onClose]);

  if (!isOpen) {
    return null;
  }

  const hasImages = images.length > 0;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsZoomed(false);
  };

  const goToPrevious = () => {
    setLightboxIndex((prev) => {
      if (prev === null || images.length === 0) return prev;
      return (prev - 1 + images.length) % images.length;
    });
  };

  const goToNext = () => {
    setLightboxIndex((prev) => {
      if (prev === null || images.length === 0) return prev;
      return (prev + 1) % images.length;
    });
  };

  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-gallery-title"
      onClick={(event) => {
        if (event.target === event.currentTarget && lightboxIndex === null) {
          onClose();
        }
      }}
      onKeyDown={(event) => {
        if (
          event.key === 'Enter' &&
          event.target === event.currentTarget &&
          lightboxIndex === null
        ) {
          onClose();
        }
      }}
    >
      <div className="flex h-full w-full max-w-5xl flex-col rounded-none bg-background p-4 md:mx-4 md:h-auto md:max-h-[90vh] md:rounded-lg md:p-6">
        {/* Header */}
        <div className="mb-4 flex flex-shrink-0 items-center justify-between">
          <div className="flex flex-col gap-1">
            <h3 id="menu-gallery-title" className="font-serif text-xl font-bold md:text-2xl">
              {t('title')}
            </h3>
            {isFallback && hasImages && (
              <p className="max-w-xl text-muted-foreground text-xs md:text-sm">
                {t('menuNotFoundDescription')}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label={t('close')}
            className="h-8 w-8 text-2xl md:h-9 md:w-9"
          >
            ×
          </Button>
        </div>

        {/* Content */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {!hasImages ? (
            <div className="flex flex-1 items-center justify-center px-4 py-12 text-center">
              <p className="text-muted-foreground text-sm md:text-base">{t('loadError')}</p>
            </div>
          ) : (
            <div className="flex-1 overflow-auto rounded-lg border bg-muted/40 p-3 md:p-4">
              <div className="mx-auto flex max-w-3xl flex-col gap-4">
                {images.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    className="group relative overflow-hidden rounded-lg border bg-background shadow-md transition hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="relative h-auto w-full">
                      <Image
                        src={src}
                        alt={t('title')}
                        width={1200}
                        height={1700}
                        className="h-auto w-full object-contain transition-transform duration-200 group-hover:scale-[1.01]"
                        priority={index === 0}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lightbox overlay */}
        {lightboxIndex !== null && hasImages && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            role="dialog"
            aria-modal="true"
            aria-label={t('title')}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                closeLightbox();
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && event.target === event.currentTarget) {
                closeLightbox();
              }
            }}
          >
            <div className="relative flex h-full w-full items-center justify-center p-4 md:p-8">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleZoom}
                  className="hidden md:inline-flex"
                >
                  {isZoomed ? t('reset') : t('zoomIn')}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeLightbox}
                  aria-label={t('close')}
                  className="h-8 w-8 text-2xl md:h-9 md:w-9"
                >
                  ×
                </Button>
              </div>

              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-sm text-white hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {t('previous')}
              </button>

              <div
                className="relative max-h-full max-w-full overflow-auto"
                onDoubleClick={toggleZoom}
              >
                <Image
                  src={images[lightboxIndex]}
                  alt={t('title')}
                  width={1400}
                  height={2000}
                  className={`h-auto max-h-[90vh] w-auto object-contain transition-transform duration-200 ${
                    isZoomed ? 'scale-125 md:scale-150' : 'scale-100'
                  }`}
                />
              </div>

              <button
                type="button"
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-sm text-white hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {t('next')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
