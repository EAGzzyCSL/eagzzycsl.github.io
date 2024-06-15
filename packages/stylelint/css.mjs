export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  // stylelint-csstree-validator 一直不支持 stylelint 16，使用别人 fork 的代替
  // https://github.com/csstree/stylelint-validator/issues/58
  plugins: ['@carlosjeurissen/stylelint-csstree-validator'],
  rules: {
    'no-empty-source': true,
    'selector-max-type': 0,
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        resolveNestedSelectors: true,
      },
    ],
    'selector-id-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    'csstree/validator': true,
    // https://stylelint.io/user-guide/rules/list/declaration-block-no-duplicate-properties/
    // consecutive-duplicates也不允许
    'declaration-block-no-duplicate-properties': true,
  },
}
