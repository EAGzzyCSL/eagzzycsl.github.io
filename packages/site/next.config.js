/**
 * next会把pages下面所有js都编译，包括test.js，很蠢，好心人给出了两个方法
 * https://github.com/vercel/next.js/issues/3728
 */
const { execSync } = require('child_process')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const dayjs = require('dayjs')

const isLocal = process.env.DEPLOY_ENV === 'local'

const baseUrl = isLocal ? '/eagzzycsl.github.io' : ''

module.exports = withBundleAnalyzer({
  // 配置本地部署路径
  // 配置为 '' 的话 next 的校验会报错
  assetPrefix: baseUrl || undefined,
  basePath: baseUrl || undefined,
  // 导出路径添加index.html避免刷新后404问题
  trailingSlash: true,
  // TODO: 开启next对eslint的集成
  // https://nextjs.org/docs/basic-features/eslint
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TODO: 启用next的Image组件
  // https://nextjs.org/docs/basic-features/image-optimization
  images: {
    disableStaticImages: true,
  },
  generateBuildId: () => {
    const revision = execSync('git rev-parse --short HEAD').toString().trim()
    const date = dayjs().format('YYYYMMDD-HHmmss')
    return `${revision}-${date}`
  },
  // 魔改 webpackConfig
  webpack: (config, { webpack, buildId }) => {
    // 注入 buildId
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.SITE_BUILD_ID': JSON.stringify(buildId),
      }),
    )
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
                ___.options.modules.exportLocalsConvention = 'camelCaseOnly'
              }),
          ),
      )
    // 支持 import 媒体文件
    // 参考：https://github.com/vercel/next.js/issues/1935
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp|mp3)$/i,
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
      oneOf: [
        {
          test: /apps\/Blog\/data\/.*\.md$/,
          use: require.resolve('@mine/markdown-loader/lib/article.js'),
        },
        {
          test: /apps\/Booklet\/data\/.*\.md$/,
          use: require.resolve('@mine/markdown-loader/lib/booklet.js'),
        },
        {
          use: require.resolve('@mine/markdown-loader/lib/normal.js'),
        },
      ],
    })
    // 支持yaml
    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: [
        {
          loader: 'yaml-loader',
          options: { asJSON: true },
        },
      ],
    })
    return config
  },
})
