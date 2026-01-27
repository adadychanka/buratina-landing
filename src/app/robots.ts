import type { MetadataRoute } from 'next';

/**
 * Generate robots.txt for SEO and AI search optimization
 * Allows AI search engines (ChatGPT, Perplexity, etc.) while blocking training bots
 * Critical for GEO (Generative Engine Optimization) in 2026+
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://buratina-bar.com';

  return {
    rules: [
      // Allow AI search engines and agents (for search visibility)
      {
        userAgent: [
          'OAI-SearchBot', // OpenAI Search
          'ChatGPT-User', // ChatGPT browsing
          'PerplexityBot', // Perplexity
          'FirecrawlAgent', // Firecrawl
          'AndiBot', // Andi Search
          'ExaBot', // Exa
          'PhindBot', // Phind
          'YouBot', // You.com
          'ClaudeBot', // Anthropic Claude
          'Gemini-Bot', // Google Gemini
          'DeepSeekBot', // DeepSeek
        ],
        allow: '/',
      },
      // Block AI training data collection
      {
        userAgent: [
          'GPTBot', // OpenAI training
          'CCBot', // Common Crawl
          'Google-Extended', // Google training
          'anthropic-ai', // Anthropic training
          'Omgilibot', // Training bot
        ],
        disallow: '/',
      },
      // Allow traditional search engines
      {
        userAgent: ['Googlebot', 'Bingbot', 'Yandex'],
        allow: '/',
      },
      // Default rules for all other bots
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
