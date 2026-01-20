import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ScrollToButton } from '@/components/ui/scroll-to-button';
import heroBanner from '@/../public/hero/hero-banner-2560.jpg';

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
      {/* Background image with stronger gradient overlay for readability */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBanner}
          alt={t('title')}
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 100vw, 100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Text block on subtle panel for better readability */}
        <div className="mx-auto max-w-4xl rounded-3xl bg-background/25 px-6 py-10 shadow-md shadow-black/20 backdrop-blur">
          {/* Logo placeholder */}
          <div className="mb-6">
            <h1 className="mb-3 font-serif text-4xl font-bold text-foreground md:text-6xl">
              {t('title')}
            </h1>
          </div>

          {/* Subtitle */}
          <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground md:text-3xl">
            {t('subtitle')}
          </h2>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-3xl text-base text-foreground/90 md:text-lg whitespace-pre-line">
            {t('description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="w-full min-w-[200px] sm:w-auto">
              <Link href="tel:+381611096732">{t('cta.book')}</Link>
            </Button>
            <ScrollToButton
              targetId="contact"
              variant="outline"
              size="lg"
              className="w-full min-w-[200px] border-accent/40 bg-accent/10 text-accent hover:border-accent/60 hover:bg-accent/20 sm:w-auto"
            >
              {t('cta.event')}
            </ScrollToButton>
          </div>
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
