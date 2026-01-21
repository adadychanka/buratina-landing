import { ContactFormEmail } from '@/emails/ContactFormEmail';
import { contactFormSchema } from '@/lib/validations/contact';
import { render } from '@react-email/render';
import { NextResponse } from 'next/server';
import React from 'react';
import { Resend } from 'resend';
import { z } from 'zod';

/**
 * API route for handling contact form submissions
 * Validates data, sends email via Resend, and sends notification to Telegram
 */
export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();

    // Validate data on server using the same schema
    const validatedData = contactFormSchema.parse(body);

    // Render email content using React Email
    const emailContent = await render(
      React.createElement(ContactFormEmail, { data: validatedData })
    );

    // Send email via Resend
    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      console.error('[contact] CONTACT_EMAIL env var is not set');
      throw new Error('CONTACT_EMAIL environment variable is not set');
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const contactValue = validatedData.contact;
    const isEmail =
      typeof contactValue === 'string' && contactValue.includes('@') && contactValue.includes('.');
    const replyTo = isEmail ? contactValue : undefined;

    const emailResult = await resend.emails.send({
      from: fromEmail,
      to: contactEmail,
      subject: 'New Event Request - Buratina Bar',
      html: emailContent,
      ...(replyTo ? { replyTo } : {}),
    });

    if (emailResult.error) {
      console.error('[contact] Resend email error', {
        name: emailResult.error.name,
        message: emailResult.error.message,
        from: fromEmail,
      });

      // Provide more helpful error messages for common issues
      if (emailResult.error.message?.includes('domain is not verified')) {
        throw new Error(
          `Email domain not verified: The domain in RESEND_FROM_EMAIL (${fromEmail}) is not verified in Resend. Please verify it at https://resend.com/domains or use 'onboarding@resend.dev' for testing.`
        );
      }

      throw new Error(`Resend email error: ${emailResult.error.message || 'unknown error'}`);
    }

    // Send notification to Telegram
    // const telegramMessage = formatTelegramMessage(validatedData);
    // await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     chat_id: process.env.TELEGRAM_CHAT_ID,
    //     text: telegramMessage,
    //     parse_mode: 'HTML',
    //   }),
    // });

    return NextResponse.json({
      success: true,
      messageId: emailResult.data?.id || null,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An error occurred while submitting the request',
      },
      { status: 500 }
    );
  }
}

/**
 * (Telegram formatter kept for potential future use)
 * Currently not used because Telegram sending is disabled.
 */
// function formatTelegramMessage(data: z.infer<typeof contactFormSchema>): string {
//   return `
// <b>🎉 New Event Request</b>
//
// 👤 <b>Name:</b> ${data.name}
// 📞 <b>Phone:</b> ${data.phone}
// ${data.contact ? `📧 <b>Contact:</b> ${data.contact}\n` : ''}
// ${data.eventDate ? `📅 <b>Date:</b> ${data.eventDate}\n` : ''}
// ${data.eventType ? `🎭 <b>Type:</b> ${data.eventType}\n` : ''}
// ${data.guestCount ? `👥 <b>Guests:</b> ${data.guestCount}\n` : ''}
// ${data.note ? `📝 <b>Notes:</b> ${data.note}\n` : ''}
//   `.trim();
// }
