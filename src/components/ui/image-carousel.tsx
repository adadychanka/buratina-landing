'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

type ImageCarouselProps = {
  images: string[];
  alt: string;
};

/**
 * Reusable image carousel component using Embla Carousel
 * Displays multiple images with navigation dots and arrow buttons
 * Supports touch/swipe gestures on mobile
 */
export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Single image - no carousel needed
  if (images.length === 1) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/20">
          <div className="text-center">
            <div className="mb-2 text-4xl opacity-30">📸</div>
            <span className="text-muted-foreground text-sm">{alt}</span>
          </div>
        </div>
      </div>
    );
  }

  // Multiple images - show carousel
  return (
    <div className="group/carousel relative aspect-[16/10] overflow-hidden bg-muted">
      {/* Embla Carousel */}
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {images.map((_image, index) => (
            <div key={index} className="relative min-w-0 flex-[0_0_100%]">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/20">
                <div className="text-center">
                  <div className="mb-2 text-4xl opacity-30">📸</div>
                  <span className="text-muted-foreground text-sm">
                    {alt} - Image {index + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {canScrollPrev && (
        <button
          type="button"
          onClick={scrollPrev}
          className="-translate-y-1/2 absolute top-1/2 left-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 opacity-0 shadow-md transition-opacity hover:bg-background group-hover/carousel:opacity-100"
          aria-label="Previous image"
        >
          <span className="text-foreground">←</span>
        </button>
      )}

      {canScrollNext && (
        <button
          type="button"
          onClick={scrollNext}
          className="-translate-y-1/2 absolute top-1/2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 opacity-0 shadow-md transition-opacity hover:bg-background group-hover/carousel:opacity-100"
          aria-label="Next image"
        >
          <span className="text-foreground">→</span>
        </button>
      )}

      {/* Dot Navigation */}
      {images.length > 1 && (
        <div className="-translate-x-1/2 absolute bottom-2 left-1/2 z-10 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === selectedIndex
                  ? 'w-4 bg-primary'
                  : 'bg-background/60 hover:bg-background/80'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 z-10 rounded-full bg-background/80 px-2 py-1 text-foreground text-xs backdrop-blur-sm">
          {selectedIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
