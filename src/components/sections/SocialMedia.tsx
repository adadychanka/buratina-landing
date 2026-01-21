import { Facebook, Instagram, MessageCircle, Music, Send } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

/**
 * SocialMedia section - Social media links
 * Features icons with links to Instagram, Telegram, TikTok
 * Server component - no client-side interactivity needed
 */
export async function SocialMedia() {
  const t = await getTranslations('SocialMedia');

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/buratina_beograd',
      icon: Instagram,
      color: 'hover:text-pink-500',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/people/Buratina-bar/61564934115698/',
      icon: Facebook,
      color: 'hover:text-blue-600',
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@buratina_beograd',
      icon: Music,
      color: 'hover:text-black dark:hover:text-white',
    },
    {
      name: 'Threads',
      href: 'https://www.threads.com/@buratina_beograd',
      icon: Send,
      color: 'hover:text-neutral-500',
    },
    {
      name: 'WhatsApp',
      href: 'https://api.whatsapp.com/send/?phone=381611096732&text&type=phone_number&app_absent=0',
      icon: MessageCircle,
      color: 'hover:text-green-500',
    },
  ];

  return (
    <section id="social" className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="mb-4 text-center font-bold font-serif text-4xl text-foreground md:text-5xl">
          {t('title')}
        </h2>
        <p className="mb-10 text-center text-muted-foreground">{t('description')}</p>

        {/* Social Icons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 rounded-lg p-4 text-muted-foreground transition-all hover:scale-110 hover:text-accent sm:gap-3 sm:p-6"
                aria-label={social.name}
              >
                <Icon className="h-8 w-8 sm:h-12 sm:w-12" />
                <span className="font-medium text-xs sm:text-sm">{social.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
