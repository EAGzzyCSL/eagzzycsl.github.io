/**
 * next会把pages下面所有js都编译，包括test.js，很蠢，好心人给出了两个方法
 * https://github.com/vercel/next.js/issues/3728
 */
const isLocal = process.env.DEPLOY_ENV === 'local'

const baseUrl = isLocal ? '/eagzzycsl.github.io' : ''

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
    return config
  },
}
