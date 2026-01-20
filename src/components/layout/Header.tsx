'use client';

import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils/cn';
import { scrollToSection } from '@/lib/utils/scroll';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

/**
 * Header component with navigation and language switcher
 * Includes mobile menu (hamburger) for responsive design
 */
export function Header() {
  const t = useTranslations('Navigation');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'about', href: '#about', label: t('about') },
    { key: 'menu', href: '#menu', label: t('menu') },
    { key: 'events', href: '#events', label: t('events') },
    { key: 'contact', href: '#contact', label: t('contact') },
    { key: 'location', href: '#location', label: t('location') },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      const targetId = href.slice(1);
      scrollToSection(targetId, 80);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 font-bold font-serif text-foreground text-xl transition-colors hover:text-accent"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span>Buratina Bar</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={handleNavClick}
              className="font-medium text-sm transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Language Switcher */}
        <div className="hidden items-center space-x-4 md:flex">
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center space-x-2 md:hidden">
          <LanguageSwitcher />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">{t('toggleMenu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{t('menuTitle')}</SheetTitle>
                <SheetDescription>{t('menuDescription')}</SheetDescription>
              </SheetHeader>
              <nav className="mt-6 flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={handleNavClick}
                    className={cn(
                      'font-medium text-sm transition-colors hover:text-accent',
                      'py-2'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
