module.exports = {
  root: true,
  extends: ['@mine/eslint-config/node'],
  overrides: [
    {
      files: ['packages/**/*.tsx', 'packages/**/*.ts'],
      extends: ['@mine/eslint-config/typescript'],
      parserOptions: {
        project: './tsconfig.json',
      },
      overrides: [
        {
          files: ['packages/**/*.tsx'],
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
          files: [
            'packages/**/*.test.js',
            'packages/**/*.test.ts',
            'packages/**/*.test.tsx',
          ],
          extends: ['@mine/eslint-config/jest'],
          rules: {
            'import/no-extraneous-dependencies': [
              'error',
              {
                devDependencies: true,
              },
            ],
          },
        },
      ],
    },
    {
      files: ['packages/site/**/*.tsx', 'packages/site/**/*.ts'],
      settings: {
        'import/resolver': {
          typescript: {
            project: require.resolve('./packages/site/tsconfig.json'),
          },
        },
      },
    },
  ],
}
