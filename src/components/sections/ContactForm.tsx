'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils/cn';
import { type ContactFormData, contactFormSchema } from '@/lib/validations/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

/**
 * ContactForm section - Event request form
 * Uses React Hook Form with Zod validation
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Form logic is intentionally kept in a single component for clarity
export function ContactForm() {
  const t = useTranslations('ContactForm');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      contact: '',
      eventDate: '',
      eventType: undefined,
      guestCount: undefined,
      consent: false,
      note: '',
    },
  });

  const eventType = watch('eventType');
  const consent = watch('consent');

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const eventTypeOptions = [
    { value: 'birthday', label: t('eventTypes.birthday') },
    { value: 'corporate', label: t('eventTypes.corporate') },
    { value: 'private-party', label: t('eventTypes.privateParty') },
    { value: 'concert', label: t('eventTypes.concert') },
    { value: 'lecture', label: t('eventTypes.lecture') },
    { value: 'photoshoot', label: t('eventTypes.photoshoot') },
    { value: 'other', label: t('eventTypes.other') },
  ];

  return (
    <section id="contact" className="bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="mb-12 text-center font-bold font-serif text-4xl text-foreground md:text-5xl">
          {t('title')}
        </h2>

        {/* Form */}
        <div className="mx-auto max-w-2xl">
          {/* Submit status messages */}
          {submitStatus === 'success' && (
            <div className="mb-8 rounded-xl border border-accent/40 bg-background/80 p-4 text-center text-sm text-foreground shadow-sm">
              {t('success')}
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-center text-sm text-destructive shadow-sm">
              {t('error')}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <Label htmlFor="name">
                {t('name')} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                {...register('name')}
                placeholder={t('namePlaceholder')}
                className={cn(errors.name && 'border-destructive')}
              />
              {errors.name && (
                <p className="mt-1 text-destructive text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">
                {t('phone')} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder={t('phonePlaceholder')}
                className={cn(errors.phone && 'border-destructive')}
              />
              {errors.phone && (
                <p className="mt-1 text-destructive text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* Additional Contact */}
            <div>
              <Label htmlFor="contactDetails">{t('contact')}</Label>
              <Input
                id="contactDetails"
                {...register('contact')}
                placeholder={t('contactPlaceholder')}
                className={cn(errors.contact && 'border-destructive')}
              />
              {errors.contact && (
                <p className="mt-1 text-destructive text-sm">{errors.contact.message}</p>
              )}
            </div>

            {/* Event Date */}
            <div>
              <Label htmlFor="eventDate">{t('eventDate')}</Label>
              <Input
                id="eventDate"
                type="date"
                {...register('eventDate')}
                className={cn(errors.eventDate && 'border-destructive')}
              />
              {errors.eventDate && (
                <p className="mt-1 text-destructive text-sm">{errors.eventDate.message}</p>
              )}
            </div>

            {/* Event Type */}
            <div>
              <Label htmlFor="eventType">{t('eventType')}</Label>
              <Select
                value={eventType}
                onValueChange={(value) =>
                  setValue('eventType', value as ContactFormData['eventType'])
                }
              >
                <SelectTrigger
                  id="eventType"
                  className={cn(errors.eventType && 'border-destructive')}
                >
                  <SelectValue placeholder={t('selectEventType')} />
                </SelectTrigger>
                <SelectContent>
                  {eventTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.eventType && (
                <p className="mt-1 text-destructive text-sm">{errors.eventType.message}</p>
              )}
            </div>

            {/* Guest Count */}
            <div>
              <Label htmlFor="guestCount">{t('guestCount')}</Label>
              <Input
                id="guestCount"
                type="number"
                min="1"
                max="200"
                {...register('guestCount')}
                placeholder={t('guestCountPlaceholder')}
                className={cn(errors.guestCount && 'border-destructive')}
              />
              {errors.guestCount && (
                <p className="mt-1 text-destructive text-sm">{errors.guestCount.message}</p>
              )}
            </div>

            {/* Note */}
            <div>
              <Label htmlFor="note">{t('note')}</Label>
              <Textarea
                id="note"
                {...register('note')}
                placeholder={t('notePlaceholder')}
                className={cn('min-h-[80px]', errors.note && 'border-destructive')}
              />
              {errors.note && (
                <p className="mt-1 text-destructive text-sm">{errors.note.message}</p>
              )}
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => setValue('consent', checked === true)}
                className={cn('mt-1', errors.consent && 'border-destructive')}
              />
              <Label
                htmlFor="consent"
                className="font-normal text-sm leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('consent')} <span className="text-destructive">*</span>
              </Label>
            </div>
            {errors.consent && (
              <p className="-mt-4 text-destructive text-sm">{errors.consent.message}</p>
            )}

            {/* Submit Button */}
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t('submitting') : t('submit')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
