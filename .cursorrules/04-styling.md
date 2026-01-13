# Styling

## Tailwind CSS

- Use Tailwind CSS for styling
- Follow mobile-first approach
- Use CSS variables from globals.css for theming
- All components should be fully responsive (mobile, tablet, desktop)

## shadcn/ui Components

- Use shadcn/ui components as base
- Customize components through Tailwind classes
- Components are copied into project (not dependencies)
- Full control over component code and styling

## Responsive Design

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Test on multiple devices
- Ensure touch-friendly interactions (min 44x44px for buttons)

## Theming

- Use CSS variables for colors
- Support dark mode via CSS variables
- Customize theme in `tailwind.config.ts` and `globals.css`
