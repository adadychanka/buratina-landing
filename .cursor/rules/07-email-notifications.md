---
description: Email and Telegram notification integration guidelines
globs: ["src/app/api/**/*.ts"]
alwaysApply: false
---

# Email and Notifications

## Resend Integration

- Use Resend for email sending
- Environment variables: RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_EMAIL
- Format emails as HTML with proper styling
- Use email templates for consistency

## Email Formatting

- Use HTML email templates
- Include branding (logo, colors)
- Structure information clearly
- Add reply-to header for easy responses

## Telegram Notifications

- Send notifications to Telegram via HTTP API
- Environment variables: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
- Format Telegram messages with emojis and HTML formatting
- Keep messages concise and informative

## Error Handling

- Handle email sending errors gracefully
- Log failures for debugging
- Don't fail entire request if email fails (optional)
- Consider retry logic for failed sends
