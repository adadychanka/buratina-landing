/**
 * Main landing page
 * Single-page application with all sections
 * Most components are server components for better performance
 */
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Menu } from '@/components/sections/Menu';
import { Events } from '@/components/sections/Events';
import { EventExamples } from '@/components/sections/EventExamples';
import { ContactForm } from '@/components/sections/ContactForm';
import { Location } from '@/components/sections/Location';
import { SocialMedia } from '@/components/sections/SocialMedia';

export default async function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Menu />
      <Events />
      <EventExamples />
      <ContactForm />
      <Location />
      <SocialMedia />
    </main>
  );
}
