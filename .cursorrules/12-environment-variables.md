# Environment Variables

## Rules

- Never commit .env files
- Use .env.example for documentation
- All environment variables must be documented
- Use NEXT_PUBLIC_ prefix only for client-side variables

## Required Variables

### Resend
- RESEND_API_KEY
- RESEND_FROM_EMAIL
- CONTACT_EMAIL

### Telegram
- TELEGRAM_BOT_TOKEN
- TELEGRAM_CHAT_ID

### Site Configuration
- NEXT_PUBLIC_SITE_URL (for SEO and sitemap)

## Usage

- Access server-side: `process.env.VARIABLE_NAME`
- Access client-side: `process.env.NEXT_PUBLIC_VARIABLE_NAME`
- Always provide fallbacks for optional variables
- Validate required variables on startup

## Documentation

- Document all variables in .env.example
- Include helpful comments
- Provide links to service documentation
- Note which variables are required vs optional
