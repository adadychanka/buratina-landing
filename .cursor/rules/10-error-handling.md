---
description: Error handling strategies and best practices
globs: ["src/**/*.tsx", "src/**/*.ts"]
alwaysApply: true
---

# Error Handling

## General Rules

- Always handle errors in try-catch blocks
- Provide user-friendly error messages
- Log errors to console for debugging
- Return appropriate HTTP status codes in API routes
- Show error states in UI components

## Client-Side Errors

- Display error messages in forms
- Show toast notifications for actions
- Handle network errors gracefully
- Provide retry mechanisms where appropriate

## Server-Side Errors

- Log detailed errors on server
- Return generic messages to client (don't expose internals)
- Use appropriate HTTP status codes
- Include error context in logs

## Error Boundaries

- Consider adding React Error Boundaries for critical sections
- Graceful degradation for non-critical features
- Show fallback UI for errors

## Validation Errors

- Show field-level validation errors
- Highlight invalid fields
- Provide clear error messages
- Allow users to correct errors easily
