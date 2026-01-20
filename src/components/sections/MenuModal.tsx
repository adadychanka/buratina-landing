'use client';

import { Button } from '@/components/ui/button';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
// This must be set before using Document/Page components
// The worker is required for PDF parsing and rendering
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Client component for menu modal with PDF viewer
 * Displays menu PDF based on current locale
 */
export function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const t = useTranslations('Menu');
  const locale = useLocale();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfPath, setPdfPath] = useState<string>(`/menu/menu.${locale}.pdf`);
  const [triedFallback, setTriedFallback] = useState(false);
  const [scale, setScale] = useState(1.5); // Default scale for better readability

  // Reset state when modal opens/closes or locale changes
  useEffect(() => {
    if (isOpen) {
      setPageNumber(1);
      setLoading(true);
      setError(null);
      setPdfPath(`/menu/menu.${locale}.pdf`);
      setTriedFallback(false);
      setScale(1.5); // Reset zoom when opening
    }
  }, [isOpen, locale]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);

    // If locale-specific PDF fails and we haven't tried English fallback yet, try it
    if (locale !== 'en' && !triedFallback) {
      setTriedFallback(true);
      setPdfPath('/menu/menu.en.pdf');
      setLoading(true);
      return;
    }

    // If English also fails or we're already on English, show error
    setLoading(false);
    if (locale !== 'en' && triedFallback) {
      setError('loadError');
    } else if (locale !== 'en') {
      setError('menuNotFound');
    } else {
      setError('loadError');
    }
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => (numPages ? Math.min(prev + 1, numPages) : prev));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3)); // Max 3x zoom
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5)); // Min 0.5x zoom
  };

  const resetZoom = () => {
    setScale(1.5); // Reset to default readable scale
  };

  // Handle mouse wheel zoom
  useEffect(() => {
    if (!isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      // Only zoom if Ctrl/Cmd key is pressed (standard browser behavior)
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          setScale((prev) => Math.min(prev + 0.25, 3));
        } else {
          setScale((prev) => Math.max(prev - 0.25, 0.5));
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 md:bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex h-full w-full max-w-5xl flex-col rounded-none bg-background p-4 md:mx-4 md:h-auto md:max-h-[90vh] md:rounded-lg md:p-6">
        {/* Header */}
        <div className="mb-4 flex flex-shrink-0 items-center justify-between">
          <h3 className="font-bold text-xl md:text-2xl">{t('title')}</h3>
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            {!error && (
              <div className="mr-4 hidden items-center gap-2 md:flex">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={zoomOut}
                  aria-label={t('zoomOut')}
                  disabled={scale <= 0.5}
                >
                  {t('zoomOut')}
                </Button>
                <div className="flex min-w-[120px] items-center gap-2">
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="flex-1"
                    aria-label={t('zoomLevel')}
                  />
                  <span className="min-w-[50px] text-right text-muted-foreground text-sm">
                    {Math.round(scale * 100)}%
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={zoomIn}
                  aria-label={t('zoomIn')}
                  disabled={scale >= 3}
                >
                  {t('zoomIn')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetZoom}
                  aria-label={t('resetZoom')}
                  title={t('resetZoom')}
                >
                  {t('reset')}
                </Button>
              </div>
            )}
            {/* Mobile Zoom Controls */}
            {!error && (
              <div className="mr-2 flex items-center gap-1 md:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={zoomOut}
                  aria-label={t('zoomOut')}
                  disabled={scale <= 0.5}
                  className="h-8 w-8 p-0"
                >
                  {t('zoomOut')}
                </Button>
                <span className="min-w-[45px] text-center text-muted-foreground text-xs">
                  {Math.round(scale * 100)}%
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={zoomIn}
                  aria-label={t('zoomIn')}
                  disabled={scale >= 3}
                  className="h-8 w-8 p-0"
                >
                  {t('zoomIn')}
                </Button>
              </div>
            )}
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
        </div>

        {/* PDF Viewer */}
        <div className="flex min-h-0 flex-1 flex-col items-center overflow-auto">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">{t('loading')}</p>
            </div>
          )}

          {error === 'loadError' && (
            <div className="py-12 text-center">
              <p className="mb-4 text-destructive">{t('loadError')}</p>
              <p className="text-muted-foreground text-sm">{t('loadErrorDescription')}</p>
            </div>
          )}

          {error === 'menuNotFound' && (
            <div className="py-12 text-center">
              <p className="mb-4 text-muted-foreground">{t('menuNotFound')}</p>
              <p className="text-muted-foreground text-sm">{t('menuNotFoundDescription')}</p>
            </div>
          )}

          {!error && (
            <>
              <div className="h-full overflow-auto rounded-none border-0 bg-muted/50 md:max-h-[calc(90vh-200px)] md:rounded-lg md:border">
                <div className="flex min-h-full justify-center p-2 md:p-4">
                  <Document
                    file={pdfPath}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={
                      <div className="flex h-[400px] w-full items-center justify-center md:h-[600px]">
                        <p className="text-muted-foreground">{t('loading')}</p>
                      </div>
                    }
                  >
                    <Page
                      pageNumber={pageNumber}
                      scale={scale}
                      renderTextLayer
                      renderAnnotationLayer
                      className="shadow-lg transition-transform duration-200"
                    />
                  </Document>
                </div>
              </div>

              {/* Pagination Controls */}
              {numPages && numPages > 1 && (
                <div className="mt-2 flex flex-shrink-0 items-center justify-center gap-2 pb-2 md:mt-4 md:gap-4 md:pb-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPrevPage}
                    disabled={pageNumber <= 1}
                    className="text-xs md:text-sm"
                  >
                    {t('previous')}
                  </Button>
                  <span className="text-muted-foreground text-xs md:text-sm">
                    {t('page', { current: pageNumber, total: numPages })}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNextPage}
                    disabled={pageNumber >= numPages}
                    className="text-xs md:text-sm"
                  >
                    {t('next')}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
