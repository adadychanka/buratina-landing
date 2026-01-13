'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

/**
 * Hero section - First screen of the landing page
 * Features logo, title, subtitle, background image/video, and CTA buttons
 */
export function Hero() {
  const t = useTranslations('Hero');

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Image/Video - placeholder for now */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
        {/* TODO: Replace with actual background image/video */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Logo placeholder */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            {t('title')}
          </h1>
        </div>

        {/* Subtitle */}
        <h2 className="text-2xl md:text-4xl font-semibold text-white/90 mb-6">
          {t('subtitle')}
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12">
          {t('description')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto min-w-[200px]"
          >
            <Link href="tel:+381123456789">{t('cta.book')}</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto min-w-[200px] bg-white/10 text-white border-white/20 hover:bg-white/20"
            onClick={scrollToContact}
          >
            {t('cta.event')}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
