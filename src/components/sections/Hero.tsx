import heroBanner from '@/../public/images/hero/hero-banner-2560.jpg';
import { Button } from '@/components/ui/button';
import { ScrollToButton } from '@/components/ui/scroll-to-button';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

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
          alt={t('imageAlt')}
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 100vw, 100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/95" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        {/* Text block on subtle panel for better readability */}
        <div className="mx-auto max-w-4xl rounded-3xl bg-background/25 px-6 py-10 shadow-black/20 shadow-md backdrop-blur">
          {/* Logo placeholder */}
          <div className="mb-6">
            <h1 className="mb-3 font-bold font-serif text-4xl text-foreground md:text-6xl">
              {t('title')}
            </h1>
          </div>

          {/* Subtitle */}
          <p className="mb-6 font-semibold font-serif text-2xl text-foreground md:text-3xl">
            {t('subtitle')}
          </p>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-3xl whitespace-pre-line text-base text-foreground/90 md:text-lg">
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
      <div className="-translate-x-1/2 absolute bottom-8 left-1/2 z-10 transform animate-bounce">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-accent/30 p-2">
          <div className="h-3 w-1 rounded-full bg-accent/50" />
        </div>
      </div>
    </section>
  );
}
