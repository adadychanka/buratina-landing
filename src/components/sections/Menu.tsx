'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { MenuModal } from './MenuModal';

/**
 * Menu section - Display menu categories
 * Features tabs for different menu categories and CTA to view menu PDF
 */
export function Menu() {
  const t = useTranslations('Menu');
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const menuCategories = [
    { key: 'cocktails', label: t('categories.cocktails') },
    { key: 'alcohol', label: t('categories.alcohol') },
    { key: 'nonAlcohol', label: t('categories.nonAlcohol') },
    { key: 'food', label: t('categories.food') },
  ];

  return (
    <section id="menu" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold font-serif text-center mb-12 text-foreground">
          {t('title')}
        </h2>

        {/* Menu Tabs */}
        <div className="max-w-4xl mx-auto mb-8">
          <Tabs defaultValue={menuCategories[0].key} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              {menuCategories.map((category) => (
                <TabsTrigger key={category.key} value={category.key}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {menuCategories.map((category) => (
              <TabsContent key={category.key} value={category.key} className="mt-8">
                <div className="text-center text-muted-foreground">
                  {/* TODO: Add menu items for each category */}
                  <p>{t('menuItemsPlaceholder', { category: category.label })}</p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button size="lg" onClick={() => setIsMenuModalOpen(true)}>
            {t('viewMenu')}
          </Button>
        </div>

        {/* Menu Modal */}
        <MenuModal isOpen={isMenuModalOpen} onClose={() => setIsMenuModalOpen(false)} />
      </div>
    </section>
  );
}
