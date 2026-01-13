import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

/**
 * About section - Information about the bar
 * Features title, text content, image gallery, and CTA button
 */
export function About() {
  const t = useTranslations('About');

  // TODO: Replace with actual images
  const galleryImages = [
    { src: '/images/about/1.jpg', alt: 'Bar interior 1' },
    { src: '/images/about/2.jpg', alt: 'Bar interior 2' },
    { src: '/images/about/3.jpg', alt: 'Bar interior 3' },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold font-serif text-center mb-12 text-foreground">
          {t('title')}
        </h2>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              {t('content')}
            </p>
            {/* TODO: Add more paragraphs from translations */}
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square rounded-lg overflow-hidden ${
                  index === 0 ? 'col-span-2' : ''
                }`}
              >
                {/* Placeholder for images */}
                <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                  <span className="text-neutral-400 text-sm">
                    {image.alt}
                  </span>
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
            <Link href="tel:+381123456789">{t('callUs')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
