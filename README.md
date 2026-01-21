# Buratina Bar Landing Page

Landing page for Buratina Bar - a bar in Belgrade. Built with Next.js 14+, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- 🌍 **Multilingual support** (EN, RU, SR) using next-intl
- 📱 **Fully responsive** design (Mobile, Tablet, Desktop)
- 🎨 **Modern UI** with shadcn/ui components
- ✅ **Form validation** with React Hook Form + Zod
- 📧 **Email notifications** via Resend API
- 🤖 **Telegram notifications** for form submissions
- 🔍 **SEO optimized** with structured data
- ⚡ **Fast performance** with Next.js App Router
- 🛠️ **Code quality** with Biome linting and formatting

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Internationalization**: next-intl
- **Form Handling**: React Hook Form + Zod
- **Email**: Resend
- **Linting**: Biome

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Telegram
TELEGRAM_BOT_TOKEN=xxxxxxxxxxxxx
TELEGRAM_CHAT_ID=xxxxxxxxxxxxx

# Contact
CONTACT_EMAIL=barburatina@gmail.com
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── [locale]/     # Localized routes
│   └── api/          # API routes
├── components/       # React components
│   ├── sections/     # Page sections
│   ├── ui/           # shadcn/ui components
│   └── layout/       # Layout components
├── lib/              # Utilities and helpers
├── messages/         # Translation files
├── i18n/             # i18n configuration
├── types/            # TypeScript types
└── hooks/            # Custom React hooks
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Biome
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm run ci` - Run all checks (lint, format, type-check, build)

## Development Guidelines

- All code and comments must be in English
- Follow Biome linting rules
- Use TypeScript for all files
- Add comments for complex logic
- Follow the project structure

## Documentation

See the technical documentation in the plan file for detailed information about:
- Architecture and components
- Internationalization setup
- Form validation
- API routes
- Deployment configuration

## License

Private project for Buratina Bar
