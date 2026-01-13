'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

/**
 * ContactForm section - Event request form
 * This is a placeholder - will be implemented with React Hook Form + Zod in next step
 */
export function ContactForm() {
  const t = useTranslations('ContactForm');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: Implement form with React Hook Form + Zod validation
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Form submission will be implemented in next step
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          {t('title')}
        </h2>

        {/* Form Placeholder */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center text-muted-foreground py-12 border-2 border-dashed rounded-lg">
              <p className="mb-2">Contact form will be implemented here</p>
              <p className="text-sm">
                Using React Hook Form + Zod validation
              </p>
            </div>

            {/* Placeholder fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('name')} *
                </label>
                <input
                  type="text"
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-muted"
                  placeholder={t('namePlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('phone')} *
                </label>
                <input
                  type="tel"
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-muted"
                  placeholder={t('phonePlaceholder')}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled
              className="w-full py-3 px-6 bg-muted text-muted-foreground rounded-md cursor-not-allowed"
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
