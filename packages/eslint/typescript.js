module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    './base.js',
    './import.js',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-plugin-import/typescript',
    'eslint-config-prettier/@typescript-eslint',
    'eslint-config-prettier',
  ],
  rules: {
    // 要求声明函数返回值，但允许一些特例
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      },
    ],
    // 强制模块级方法必须声明返回类型
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-empty-function': 'off',
  },
}
