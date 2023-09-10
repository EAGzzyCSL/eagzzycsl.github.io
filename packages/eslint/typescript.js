module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    './base.js',
    './import.js',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:eslint-plugin-import/typescript',
    'eslint-config-prettier',
  ],
  rules: {
    'no-shadow': 'off',
    'no-use-before-define': 'off',
  },
}
