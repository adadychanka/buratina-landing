import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

/**
 * About section - Information about the bar
 * Features title, text content, image gallery, and CTA button
 * Server component - no client-side interactivity needed
 */
export async function About() {
  const t = await getTranslations('About');

  // TODO: Replace with actual images
  const galleryImages = [
    { src: '/images/about/1.jpg', alt: 'Bar interior 1' },
    { src: '/images/about/2.jpg', alt: 'Bar interior 2' },
    { src: '/images/about/3.jpg', alt: 'Bar interior 3' },
  ];

  return (
    <section id="about" className="bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="mb-12 text-center font-bold font-serif text-4xl text-foreground md:text-5xl">
          {t('title')}
        </h2>

        {/* Content Grid */}
        <div className="mb-12 grid items-center gap-12 md:grid-cols-2">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">{t('content')}</p>
            {/* TODO: Add more paragraphs from translations */}
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={image.src}
                className={`relative aspect-square overflow-hidden rounded-lg ${
                  index === 0 ? 'col-span-2' : ''
                }`}
              >
                {/* Placeholder for images */}
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 dark:bg-neutral-800">
                  <span className="text-neutral-400 text-sm">{image.alt}</span>
                </div>
                {/* TODO: Replace with actual Image component when images are available */}
                {/* <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                /> */}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="tel:+381611096732">{t('callUs')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
