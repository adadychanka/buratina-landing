import { Instagram, Music, Send } from 'lucide-react';
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
      href: 'https://instagram.com/buratina.bar',
      icon: Instagram,
      color: 'hover:text-pink-500',
    },
    {
      name: 'Telegram',
      href: 'https://t.me/buratina.bar',
      icon: Send,
      color: 'hover:text-blue-500',
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com/@buratina.bar',
      icon: Music,
      color: 'hover:text-black dark:hover:text-white',
    },
  ];

  return (
    <section id="social" className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="mb-12 text-center font-bold font-serif text-4xl text-foreground md:text-5xl">
          {t('title')}
        </h2>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-8">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 rounded-lg p-6 text-muted-foreground transition-all hover:scale-110 hover:text-accent"
                aria-label={social.name}
              >
                <Icon className="h-12 w-12" />
                <span className="font-medium text-sm">{social.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
