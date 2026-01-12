/**
 * Type definitions for Buratina Bar Landing Page
 */

/**
 * Supported locales for internationalization
 */
export type Locale = 'en' | 'ru' | 'sr';

/**
 * Contact form data structure
 * Used for form validation and API requests
 */
export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  instagram?: string;
  eventDate?: string;
  eventType?: string;
  guestCount?: number;
  consent: boolean;
}

/**
 * Event types available for booking
 */
export type EventType =
  | 'birthday'
  | 'corporate'
  | 'private-party'
  | 'concert'
  | 'lecture'
  | 'photoshoot'
  | 'other';
