import { Link } from '@/i18n/navigation';
import { Facebook, Instagram, MessageCircle, Music, Send } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import NextLink from 'next/link';

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
      href: 'https://www.instagram.com/buratina_beograd',
      icon: Instagram,
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/people/Buratina-bar/61564934115698/',
      icon: Facebook,
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@buratina_beograd',
      icon: Music,
    },
    {
      name: 'Threads',
      href: 'https://www.threads.com/@buratina_beograd',
      icon: Send,
    },
    {
      name: 'WhatsApp',
      href: 'https://api.whatsapp.com/send/?phone=381611096732&text&type=phone_number&app_absent=0',
      icon: MessageCircle,
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
                  <NextLink
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </NextLink>
                );
              })}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">{tFooter('contact')}</h4>
            <div className="space-y-1 text-muted-foreground text-sm">
              <p>Svetogorska 46</p>
              <p>11103 Beograd, Serbia</p>
              <NextLink
                href="tel:+381611096732"
                className="transition-colors hover:text-foreground"
              >
                +381 61 109 6732
              </NextLink>
              <div>
                <NextLink
                  href="mailto:barburatina@gmail.com"
                  className="transition-colors hover:text-foreground"
                >
                  barburatina@gmail.com
                </NextLink>
              </div>
              <p className="pt-2 text-muted-foreground text-xs">
                <Link
                  href="/privacy-policy"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  {tFooter('privacyPolicy')}
                </Link>
              </p>
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
