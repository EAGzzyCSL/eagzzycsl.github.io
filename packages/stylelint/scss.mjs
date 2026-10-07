export default {
  customSyntax: 'postcss-scss',
  extends: ['./css.mjs'],
  plugins: ['stylelint-scss', 'stylelint-use-nesting'],
  rules: {
    'at-rule-prelude-no-invalid': [
      true,
      { ignoreAtRules: ['mixin', 'function'] },
    ],
    'declaration-property-value-no-unknown': null,
    'scss/declaration-property-value-no-unknown': true,
    'selector-class-pattern': null,
    'scss/selector-class-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      { resolveNestedSelectors: true },
    ],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'scss/no-duplicate-dollar-variables': true,
    'scss/no-duplicate-mixins': true,
    'scss/operator-no-unspaced': true,
    'scss/operator-no-newline-after': true,
    'scss/double-slash-comment-whitespace-inside': 'always',
    'csstree/validator': {
      syntaxExtensions: ['sass'],
    },
    // https://sass-lang.com/documentation/at-rules/import#plain-css-imports
    // scss 设定 url() 的引用会被识别为 css 语法的 import
    'import-notation': 'string',
  },
}
