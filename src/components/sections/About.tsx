import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

/**
 * About section - Information about the bar
 * Features title, text content, image gallery, and CTA button
 * Server component - no client-side interactivity needed
 */
export async function About() {
  const t = await getTranslations('About');

  const paragraphs = t.raw('paragraphs') as string[];
  const galleryAltTexts = t.raw('gallery.alts') as string[];

  const galleryImages = [
    '/images/about/IMG_5165.JPG',
    '/images/about/IMG_5214.JPG',
    '/images/about/IMG_5232.JPG',
    '/images/about/IMG_5266.JPG',
    '/images/about/IMG_5380.JPG',
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
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={image}
                className={`relative aspect-square overflow-hidden rounded-lg ${
                  index === 0 ? 'col-span-2' : ''
                }`}
              >
                <Image
                  src={image}
                  alt={galleryAltTexts[index] ?? ''}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
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
