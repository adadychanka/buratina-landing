'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Client component for menu modal
 * Can be used in server components
 */
export function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const t = useTranslations('Menu');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">{t('title')}</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label={t('close')}
          >
            ×
          </Button>
        </div>
        <div className="text-center text-muted-foreground py-12">
          {/* TODO: Add PDF viewer component */}
          <p>{t('pdfViewerPlaceholder')}</p>
          <p className="text-sm mt-4">Menu PDF: /public/menu/menu.pdf</p>
        </div>
      </div>
    </div>
  );
}
