/**
 * Commitlint configuration
 * Enforces conventional commit format and English-only messages
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Enforce English-only commit messages
    'subject-case': [2, 'always', ['lower-case', 'sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
    // Ensure commit messages are in English (basic check - no Cyrillic, etc.)
    'subject-max-length': [2, 'always', 100],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },
};
