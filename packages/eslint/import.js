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
        /**
         * TODO: 这里的pattern应该通过外部配置
         */
        pathGroups: [
          // 让react永远排在最前面
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          // @开头的视为内部模块
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        warnOnUnassignedImports: true,
      },
    ],
    'import/prefer-default-export': 'off',
  },
}
