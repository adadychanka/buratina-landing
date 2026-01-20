---
description: Linting and static analysis rules
globs: ["**/*"]
alwaysApply: true
---

## Linting

- **Mandatory lint pass**
  - Always run `npm run lint` before committing.
  - Do not introduce new Biome **errors**; existing warnings are acceptable only if explicitly acknowledged in the commit/PR description.

- **Automatic fixes**
  - Prefer `npx biome check --write --unsafe .` (or `npm run lint:fix` if configured) to auto-fix formatting issues such as import ordering and Tailwind class ordering.
  - Do not manually revert Biome’s automatic import or class reordering unless it clearly breaks functionality or readability.

- **Patterns to avoid**
  - Do not use non-null assertions (`!`) on `process.env.*`; validate required environment variables explicitly and fail fast with a clear error message.
  - Do not use array index as a React `key`; use stable identifiers instead (for example, `id`, `src`).
  - Ensure elements with `onClick` that behave like controls either:
    - are semantic elements (`<button>`, etc.), or
    - have corresponding keyboard handlers (`onKeyDown`/`onKeyUp`) to satisfy accessibility and Biome’s `useKeyWithClickEvents` rule.
