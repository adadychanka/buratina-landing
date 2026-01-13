import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/validations/contact';
import { z } from 'zod';

/**
 * API route for handling contact form submissions
 * Validates data, sends email via Resend, and sends notification to Telegram
 */
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate data on server using the same schema
    const validatedData = contactFormSchema.parse(body);

    // Format email content
    const emailContent = formatEmailContent(validatedData);

    // Send email via Resend
    const emailResult = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL!,
      subject: 'New Event Request - Buratina Bar',
      html: emailContent,
      replyTo: validatedData.contact || validatedData.phone,
    });

    // Send notification to Telegram
    const telegramMessage = formatTelegramMessage(validatedData);
    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML',
        }),
      }
    );

    return NextResponse.json({
      success: true,
      messageId: emailResult.id,
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
 * Format form data as HTML email content
 */
function formatEmailContent(
  data: z.infer<typeof contactFormSchema>
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .field { margin: 10px 0; }
          .label { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Buratina Bar</h1>
            <p>New Event Request</p>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Name:</span> ${data.name}
            </div>
            <div class="field">
              <span class="label">Phone:</span> ${data.phone}
            </div>
            ${
              data.contact
                ? `
            <div class="field">
              <span class="label">Additional Contact:</span> ${data.contact}
            </div>
            `
                : ''
            }
            ${
              data.eventDate
                ? `
            <div class="field">
              <span class="label">Event Date:</span> ${data.eventDate}
            </div>
            `
                : ''
            }
            ${
              data.eventType
                ? `
            <div class="field">
              <span class="label">Event Type:</span> ${data.eventType}
            </div>
            `
                : ''
            }
            ${
              data.guestCount
                ? `
            <div class="field">
              <span class="label">Number of Guests:</span> ${data.guestCount}
            </div>
            `
                : ''
            }
            <div class="field">
              <span class="label">Consent:</span> ${data.consent ? 'Yes' : 'No'}
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Format form data as Telegram message
 */
function formatTelegramMessage(
  data: z.infer<typeof contactFormSchema>
): string {
  return `
<b>🎉 New Event Request</b>

👤 <b>Name:</b> ${data.name}
📞 <b>Phone:</b> ${data.phone}
${data.contact ? `📧 <b>Contact:</b> ${data.contact}\n` : ''}
${data.eventDate ? `📅 <b>Date:</b> ${data.eventDate}\n` : ''}
${data.eventType ? `🎭 <b>Type:</b> ${data.eventType}\n` : ''}
${data.guestCount ? `👥 <b>Guests:</b> ${data.guestCount}\n` : ''}
  `.trim();
}
