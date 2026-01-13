---
description: API route development guidelines and best practices
globs: ["src/app/api/**/*.ts"]
alwaysApply: false
---

# API Routes

## Structure

- All API routes in `src/app/api/`
- Use Next.js Route Handlers (route.ts)
- Export named functions: GET, POST, PUT, DELETE, etc.

## Validation

- Always validate input with Zod schemas
- Use shared validation schemas from `src/lib/validations/`
- Return 400 status for validation errors
- Include error details in response

## Error Handling

- Handle errors gracefully with try-catch
- Return appropriate HTTP status codes
- Log errors to console for debugging
- Never expose sensitive error details to client

## Response Format

- Return JSON responses
- Use consistent response structure
- Include success/error status
- Return appropriate status codes (200, 400, 500, etc.)

## Security

- Use environment variables for sensitive data (never commit secrets)
- Validate all user input
- Sanitize data before processing
- Rate limiting for public endpoints (future consideration)
