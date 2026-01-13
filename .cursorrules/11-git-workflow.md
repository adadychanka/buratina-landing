# Git Workflow

## Commits

- Make logical commits after each feature/step
- Write descriptive commit messages
- Follow conventional commit format when possible
- Examples: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`

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
