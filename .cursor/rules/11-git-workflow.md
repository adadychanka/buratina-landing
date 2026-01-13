---
description: Git workflow and commit guidelines
globs: ["**/*"]
alwaysApply: true
---

# Git Workflow

## Commits

- Make logical commits after each feature/step
- Write descriptive commit messages
- **ALWAYS write commit messages in English only** - never use other languages
- Follow conventional commit format when possible
- Examples: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`

### Commit Message Format

The project uses **commitlint** with conventional commit format. Commit messages are automatically validated via husky git hooks.

**Format:** `<type>(<scope>): <subject>`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `build`: Build system changes
- `revert`: Revert a previous commit

**Examples:**
- `feat: add dark mode toggle`
- `fix: resolve header navigation issue`
- `docs: update README with setup instructions`
- `style: format code with biome`

**Validation:**
- Commitlint automatically validates commit messages on `git commit`
- Invalid format will prevent commit from completing
- Messages must be in English and follow conventional format

## Security

- Never commit secrets or environment variables
- Use .env.local for local development
- Add .env to .gitignore
- Use .env.example for documentation

## Branch Strategy

- Use main branch for production-ready code
- Use develop branch for development
- Create feature branches for new features
- Keep commits focused and atomic

## Code Review

- Review code before merging
- Ensure all tests pass
- Check for linting errors
- Verify TypeScript types
