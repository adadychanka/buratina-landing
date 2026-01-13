# Form Handling

## React Hook Form + Zod

- Use React Hook Form for form management
- Use Zod for validation schemas
- Share validation schemas between client and server (in `src/lib/validations/`)
- Always validate on both client and server
- Show user-friendly error messages from validation

## Form Structure

- Create Zod schema in `src/lib/validations/`
- Export TypeScript type from schema using `z.infer<>`
- Use `zodResolver` from `@hookform/resolvers`
- Register fields with `register()` or `Controller`

## Error Handling

- Display field-level errors below inputs
- Show success/error messages after submission
- Handle network errors gracefully
- Provide loading states during submission

## Best Practices

- Use shadcn/ui form components (Input, Textarea, Select, Checkbox)
- Validate on blur for better UX
- Show required field indicators (*)
- Disable submit button during submission
