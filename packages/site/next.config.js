/**
 * next会把pages下面所有js都编译，包括test.js，很蠢，好心人给出了两个方法
 * https://github.com/vercel/next.js/issues/3728
 */
// eslint-disable-next-line import/no-extraneous-dependencies
const resolve = require('resolve')

const isLocal = process.env.DEPLOY_ENV === 'local'

const baseUrl = isLocal ? '/eagzzycsl.github.io' : ''

const markdownLoader = require.resolve('@mine/markdown-loader')

module.exports = {
  // 配置本地部署路径
  assetPrefix: baseUrl,
  basePath: baseUrl,
  // 导出路径添加index.html避免刷新后404问题
  trailingSlash: true,
  // 魔改 webpackConfig
  webpack: config => {
    // 支持 css modules 驼峰化
    config.module.rules
      .filter(_ => _.oneOf)
      .forEach(_ =>
        _.oneOf
          .filter(__ => Array.isArray(__.use))
          .forEach(__ =>
            __.use
              .filter(___ => ___.loader)
              .filter(___ => ___.loader.includes('/css-loader/'))
              .forEach(___ => {
                // eslint-disable-next-line no-param-reassign
                ___.options.localsConvention = 'camelCaseOnly'
              }),
          ),
      )
    // 支持 import 媒体文件
    // 参考：https://github.com/vercel/next.js/issues/1935
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|mp3)$/i,
      loader: 'file-loader',
      options: {
        name: '[path][name].[hash:hex:8].[ext]',
        outputPath: '../public/static',
        publicPath: `${baseUrl}/static`,
      },
    })
    // 支持import markdown
    config.module.rules.push({
      test: /\.md$/,
      use: markdownLoader,
    })
    // 优化mobx体积
    // 参考：https://mobx.js.org/README.html#browser-support
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias.mobx = resolve.sync(`mobx/lib/mobx.es6.js`)
    return config
  },
}
