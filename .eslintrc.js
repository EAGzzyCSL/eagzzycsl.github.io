const path = require('path')

module.exports = {
  root: true,
  extends: ['@mine/eslint-config/node'],
  overrides: [
    {
      files: ['packages/**/*.tsx', 'packages/**/*.ts'],
      extends: ['@mine/eslint-config/typescript'],
      parserOptions: {
        project: path.resolve(__dirname, './tsconfig.json'),
      },
      overrides: [
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
  ],
}
