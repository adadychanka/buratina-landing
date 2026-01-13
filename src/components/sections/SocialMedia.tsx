import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Instagram, Send, Music } from 'lucide-react';

/**
 * SocialMedia section - Social media links
 * Features icons with links to Instagram, Telegram, TikTok
 */
export function SocialMedia() {
  const t = useTranslations('SocialMedia');

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
    <section id="social" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          {t('title')}
        </h2>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-8">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-3 p-6 rounded-lg transition-all hover:scale-110 ${social.color}`}
                aria-label={social.name}
              >
                <Icon className="h-12 w-12" />
                <span className="text-sm font-medium">{social.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
