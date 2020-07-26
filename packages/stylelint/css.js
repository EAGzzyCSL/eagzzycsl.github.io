module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-csstree-validator'],
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
  },
}
