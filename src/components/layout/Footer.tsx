import { Instagram, Music, Send } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

/**
 * Footer component with copyright, social links, and contact information
 * Server component - no client-side interactivity needed
 */
export async function Footer() {
  const t = await getTranslations('SocialMedia');
  const tFooter = await getTranslations('Footer');

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/buratina.bar',
      icon: Instagram,
    },
    {
      name: 'Telegram',
      href: 'https://t.me/buratina.bar',
      icon: Send,
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com/@buratina.bar',
      icon: Music,
    },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-bold font-serif text-foreground text-lg">Buratina Bar</h3>
            <p className="text-muted-foreground text-sm">{tFooter('subtitle')}</p>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">{t('title')}</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">{tFooter('contact')}</h4>
            <div className="space-y-1 text-muted-foreground text-sm">
              <p>Belgrade, Serbia</p>
              <Link href="tel:+381611096732" className="transition-colors hover:text-foreground">
                +381 61 109 6732
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-8 text-center text-muted-foreground text-sm">
          <p>{tFooter('copyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
}
