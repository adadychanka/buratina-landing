import * as z from 'zod';
import type { EventType } from '@/types';

/**
 * Contact form validation schema using Zod
 * This schema is shared between client and server for consistent validation
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must contain at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .trim(),

  phone: z
    .string()
    .min(10, 'Phone must contain at least 10 digits')
    .regex(
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
      'Invalid phone format'
    ),

  contact: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        val.includes('@') ||
        val.startsWith('@') ||
        /^[\+]?[(]?[0-9]/.test(val),
      'Please provide email, phone, or Instagram'
    ),

  eventDate: z
    .string()
    .optional()
    .refine(
      (val) => !val || !isNaN(Date.parse(val)),
      'Invalid date format'
    ),

  eventType: z
    .enum(
      [
        'birthday',
        'corporate',
        'private-party',
        'concert',
        'lecture',
        'photoshoot',
        'other',
      ],
      {
        errorMap: () => ({ message: 'Please select an event type' }),
      }
    )
    .optional(),

  guestCount: z
    .coerce
    .number()
    .int('Guest count must be a whole number')
    .min(1, 'Minimum 1 guest')
    .max(200, 'Maximum 200 guests')
    .optional()
    .or(z.literal('')),

  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Consent to data processing is required',
    }),
});

// Export TypeScript type inferred from schema
export type ContactFormData = z.infer<typeof contactFormSchema>;
