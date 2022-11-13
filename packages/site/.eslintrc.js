const path = require('path')

module.exports = {
  overrides: [
    {
      files: ['**/*.tsx'],
      extends: ['@mine/eslint-config/react'],
      rules: {
        'react/jsx-filename-extension': [
          'error',
          {
            extensions: ['.tsx'],
          },
        ],
      },
    },
    {
      files: ['**/*.tsx', '**/*.ts'],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(__dirname, './tsconfig.json'),
          },
        },
      },
      rules: {
        '@typescript-eslint/no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'dayjs',
                message: 'Please use @/utils/date instead.',
                allowTypeImports: false,
              },
            ],
          },
        ],
      },
    },
  ],
}
