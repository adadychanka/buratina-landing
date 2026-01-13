import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Instagram, Send, Music } from 'lucide-react';

/**
 * Footer component with copyright, social links, and contact information
 */
export function Footer() {
  const t = useTranslations('SocialMedia');
  const tFooter = useTranslations('Footer');

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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-serif text-foreground">Buratina Bar</h3>
            <p className="text-sm text-muted-foreground">
              {tFooter('subtitle')}
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t('title')}</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
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
            <h4 className="text-sm font-semibold">{tFooter('contact')}</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Belgrade, Serbia</p>
              <Link
                href="tel:+381123456789"
                className="hover:text-foreground transition-colors"
              >
                +381 12 345 6789
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>{tFooter('copyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
}
