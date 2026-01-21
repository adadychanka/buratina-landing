import type { contactFormSchema } from '@/lib/validations/contact';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import type { z } from 'zod';

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormEmailProps {
  data: ContactFormData;
}

/**
 * React Email template for contact form submissions
 */
export function ContactFormEmail({ data }: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Event Request - Buratina Bar</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>Buratina Bar</Heading>
            <Text style={subheading}>New Event Request</Text>
          </Section>
          <Section style={content}>
            <Field label="Name" value={data.name} />
            <Field label="Phone" value={data.phone} />
            {data.contact && <Field label="Additional Contact" value={data.contact} />}
            {data.eventDate && <Field label="Event Date" value={data.eventDate} />}
            {data.eventType && <Field label="Event Type" value={data.eventType} />}
            {data.guestCount && <Field label="Number of Guests" value={String(data.guestCount)} />}
            {data.note && <Field label="Additional Notes" value={data.note} />}
            <Field label="Consent" value={data.consent ? 'Yes' : 'No'} />
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={field}>
      <span style={labelStyle}>{label}:</span> {value}
    </div>
  );
}

const main = {
  fontFamily: 'Arial, sans-serif',
  lineHeight: '1.6',
  backgroundColor: '#ffffff',
};

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
};

const header = {
  background: '#1a1a1a',
  color: '#ffffff',
  padding: '20px',
  textAlign: 'center' as const,
};

const heading = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 10px 0',
};

const subheading = {
  color: '#ffffff',
  fontSize: '16px',
  margin: '0',
};

const content = {
  padding: '20px',
  background: '#f9f9f9',
};

const field = {
  margin: '10px 0',
};

const labelStyle = {
  fontWeight: 'bold',
};
