module.exports = {
  extends: [
    'plugin:eslint-plugin-import/errors',
    'plugin:eslint-plugin-import/warnings',
    'eslint-config-prettier',
  ],
  rules: {
    'import/extensions': [
      'error',
      {
        tsx: 'never',
        ts: 'never',
        jsx: 'never',
        js: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'sibling',
          'parent',
          'index',
          'object',
          'unknown',
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': 'off',
  },
}
