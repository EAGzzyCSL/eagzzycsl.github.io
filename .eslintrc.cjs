module.exports = {
  root: true,
  extends: ['@mine/eslint-config/node'],
  overrides: [
    {
      files: ['packages/**/*.tsx', 'packages/**/*.ts'],
      extends: ['@mine/eslint-config/typescript'],
      parserOptions: {
        project: true,
      },
      overrides: [
        {
          files: [
            'packages/**/*.test.js',
            'packages/**/*.test.ts',
            'packages/**/*.test.tsx',
          ],
          extends: ['@mine/eslint-config/vitest'],
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
