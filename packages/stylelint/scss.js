module.exports = {
  customSyntax: 'postcss-scss',
  extends: ['./css.js', 'stylelint-config-prettier'],
  plugins: ['stylelint-scss', 'stylelint-use-nesting'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'scss/no-duplicate-dollar-variables': true,
    'scss/no-duplicate-mixins': true,
    'scss/operator-no-unspaced': true,
    'scss/operator-no-newline-after': true,
    'scss/double-slash-comment-whitespace-inside': 'always',
    'csstools/use-nesting': 'always',
  },
}
