const packageJson = require('./package.json')

/**
 * next似乎并没有遵循browserslist配置，所以只好自己动手了
 *
 * https://github.com/zeit/next.js/discussions/12826
 * https://nextjs.org/docs/advanced-features/customizing-babel-config
 */
module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          useBuiltIns: false,
          targets: packageJson.browserslist[process.env.NODE_ENV].join(', '),
        },
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
  ],
}
