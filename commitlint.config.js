const appsList = require('./apps-list')

module.exports = {
  extends: ['@mine/commitlint-config'],
  rules: {
    'scope-enum': [2, 'always', appsList.map(({ name }) => name)],
    'scope-empty': [2, 'never'],
    'header-max-length': [2, 'always', 160],
  },
}
