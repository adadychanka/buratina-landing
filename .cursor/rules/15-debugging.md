---
description: Debugging guidelines and best practices for troubleshooting issues
globs: ["**/*"]
alwaysApply: true
---

# Debugging Guidelines

## Systematic Debugging Approach

When encountering bugs, follow this systematic approach:

1. **Generate Hypotheses**: Create 3-5 specific hypotheses about why the bug occurs
2. **Add Instrumentation**: Add targeted logging to test all hypotheses in parallel
3. **Reproduce and Collect Data**: Reproduce the bug and collect runtime evidence
4. **Analyze Logs**: Evaluate each hypothesis (CONFIRMED/REJECTED/INCONCLUSIVE) with cited log evidence
5. **Fix with Evidence**: Only fix when you have 100% confidence based on runtime data
6. **Verify**: Test the fix and compare before/after logs

## Logging Best Practices

- Add logs at key points: function entry/exit, before/after critical operations, branch execution
- Include relevant context: parameters, return values, state changes
- Use structured logging format for easy analysis
- Remove debug logs after successful verification

## Common Issues

### Next.js App Router

- Server components may not reload on client-side navigation
- Use full page reload (`window.location.href`) when switching contexts that affect server components
- Be aware of caching behavior in development vs production

### Client-Server Boundaries

- Hooks like `useLocale()` may not update if provider doesn't receive correct props
- Always verify that context providers receive all required props
- Check that server-side data (like locale) is properly passed to client components

### State Synchronization

- URL changes don't always trigger component re-renders
- Extract state from URL directly if hooks aren't reactive
- Use full page reload when state synchronization is critical
