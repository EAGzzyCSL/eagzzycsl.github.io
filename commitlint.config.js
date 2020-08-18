module.exports = {
  extends: ['@mine/commitlint-config'],
  rules: {
    'scope-enum': [
      2,
      'always',
      // prettier-ignore
      [
        'infra',
        'launcher',
        'ack',
        'launcher',
        'lcstt',
        'calc',
        'blog',
      ],
    ],
    'scope-empty': [2, 'never'],
  },
}
