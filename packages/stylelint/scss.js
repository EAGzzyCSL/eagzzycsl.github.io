module.exports = {
  customSyntax: 'postcss-scss',
  extends: ['./css.js'],
  plugins: ['stylelint-scss', 'stylelint-use-nesting'],
  rules: {
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
