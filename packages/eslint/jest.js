module.exports = {
  extends: ['plugin:jest/style', 'plugin:jest/recommended'],
  plugins: ['eslint-plugin-jest'],
  env: {
    node: true,
    jest: true,
  },
}
