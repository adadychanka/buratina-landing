'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils/cn';

/**
 * ContactForm section - Event request form
 * Uses React Hook Form with Zod validation
 */
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
        // Scroll to top of form to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          {t('title')}
        </h2>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-200 text-center">
                {t('success')}
              </p>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200 text-center">
                {t('error')}
              </p>
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
                <p className="mt-1 text-sm text-destructive">
                  {errors.name.message}
                </p>
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
                <p className="mt-1 text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Additional Contact */}
            <div>
              <Label htmlFor="contact">{t('contact')}</Label>
              <Input
                id="contact"
                {...register('contact')}
                placeholder={t('contactPlaceholder')}
                className={cn(errors.contact && 'border-destructive')}
              />
              {errors.contact && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.contact.message}
                </p>
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
                <p className="mt-1 text-sm text-destructive">
                  {errors.eventDate.message}
                </p>
              )}
            </div>

            {/* Event Type */}
            <div>
              <Label htmlFor="eventType">{t('eventType')}</Label>
              <Select
                value={eventType}
                onValueChange={(value) => setValue('eventType', value as ContactFormData['eventType'])}
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
                <p className="mt-1 text-sm text-destructive">
                  {errors.eventType.message}
                </p>
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
                <p className="mt-1 text-sm text-destructive">
                  {errors.guestCount.message}
                </p>
              )}
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => setValue('consent', checked === true)}
                className={cn(
                  'mt-1',
                  errors.consent && 'border-destructive'
                )}
              />
              <Label
                htmlFor="consent"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('consent')} <span className="text-destructive">*</span>
              </Label>
            </div>
            {errors.consent && (
              <p className="text-sm text-destructive -mt-4">
                {errors.consent.message}
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
