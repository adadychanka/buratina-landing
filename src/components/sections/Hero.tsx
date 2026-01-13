import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ScrollToButton } from '@/components/ui/scroll-to-button';

/**
 * Hero section - First screen of the landing page
 * Features logo, title, subtitle, background image/video, and CTA buttons
 * Server component with client-side interactive buttons
 */
export async function Hero() {
  const t = await getTranslations('Hero');

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Image/Video - placeholder for now */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-gradient-to-br from-background via-muted to-background" />
        {/* TODO: Replace with actual background image/video */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Logo placeholder */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold font-serif text-foreground mb-4">
            {t('title')}
          </h1>
        </div>

        {/* Subtitle */}
        <h2 className="text-2xl md:text-4xl font-semibold font-serif text-foreground/90 mb-6">
          {t('subtitle')}
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-12">
          {t('description')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="w-full sm:w-auto min-w-[200px]">
            <Link href="tel:+381123456789">{t('cta.book')}</Link>
          </Button>
          <ScrollToButton
            targetId="contact"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto min-w-[200px] bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 hover:border-accent/50"
          >
            {t('cta.event')}
          </ScrollToButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-accent/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
