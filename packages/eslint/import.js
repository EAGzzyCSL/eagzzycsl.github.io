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
          'parent',
          'sibling',
          'index',
          'object',
          'unknown',
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            // TODO: 这里的pattern应该通过外部配置
            pattern: '@/**',
            group: 'internal',
          },
        ],
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': 'off',
  },
}
