const jsxA11y = require('eslint-plugin-jsx-a11y')

/**
 * 手动屏蔽a11y规则
 * 参考：https://github.com/airbnb/javascript/issues/2032
 */
const a11yOff = Object.keys(jsxA11y.rules).reduce((acc, rule) => {
  acc[`jsx-a11y/${rule}`] = 'off'
  return acc
}, {})

module.exports = {
  plugins: [
    'eslint-plugin-react',
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-css-modules',
  ],
  env: {
    node: false,
    browser: true,
  },
  extends: [
    './base.js',
    './node.js',
    './import.js',
    './typescript.js',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'eslint-config-prettier',
    'eslint-config-prettier/react',
    'plugin:css-modules/recommended',
  ],
  rules: {
    ...a11yOff,
    'css-modules/no-unused-class': ['error', { camelCase: true }],
    'css-modules/no-undef-class': ['error', { camelCase: true }],
  },
}
