'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Document, Page, pdfjs } from 'react-pdf';
import { useState, useEffect } from 'react';
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
    >
      <div className="bg-background rounded-none md:rounded-lg p-4 md:p-6 max-w-5xl w-full h-full md:h-auto md:mx-4 md:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h3 className="text-xl md:text-2xl font-bold">{t('title')}</h3>
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            {!error && (
              <div className="hidden md:flex items-center gap-2 mr-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={zoomOut}
                  aria-label={t('zoomOut')}
                  disabled={scale <= 0.5}
                >
                  {t('zoomOut')}
                </Button>
                <div className="flex items-center gap-2 min-w-[120px]">
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
                  <span className="text-sm text-muted-foreground min-w-[50px] text-right">
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
              <div className="flex md:hidden items-center gap-1 mr-2">
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
                <span className="text-xs text-muted-foreground min-w-[45px] text-center">
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
              className="text-2xl h-8 w-8 md:h-9 md:w-9"
            >
              ×
            </Button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto flex flex-col items-center min-h-0">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">{t('loading')}</p>
            </div>
          )}

          {error === 'loadError' && (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{t('loadError')}</p>
              <p className="text-sm text-muted-foreground">{t('loadErrorDescription')}</p>
            </div>
          )}

          {error === 'menuNotFound' && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">{t('menuNotFound')}</p>
              <p className="text-sm text-muted-foreground">{t('menuNotFoundDescription')}</p>
            </div>
          )}

          {!error && (
            <>
              <div className="border-0 md:border rounded-none md:rounded-lg overflow-auto bg-muted/50 h-full md:max-h-[calc(90vh-200px)]">
                <div className="flex justify-center p-2 md:p-4 min-h-full">
                  <Document
                    file={pdfPath}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={
                      <div className="flex items-center justify-center w-full h-[400px] md:h-[600px]">
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
                <div className="flex items-center justify-center gap-2 md:gap-4 mt-2 md:mt-4 flex-shrink-0 pb-2 md:pb-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPrevPage}
                    disabled={pageNumber <= 1}
                    className="text-xs md:text-sm"
                  >
                    {t('previous')}
                  </Button>
                  <span className="text-xs md:text-sm text-muted-foreground">
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
