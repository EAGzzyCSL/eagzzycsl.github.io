/**
 * 利用webpack将ts文件编译为js后执行
 */
const path = require('path')

const { createFsFromVolume, Volume } = require('memfs')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const webpack = require('webpack')

const OUTPUT_FILENAME = 'dist.js'

const compileToJs = async (entryPath, tsConfigPath) => {
  const compiler = webpack({
    target: 'node',
    entry: entryPath,
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.ts$/,
              use: {
                loader: 'ts-loader',
                /**
                 * 这里有一个关于noEmit的surprisingly feature/bug
                 * 按道理如果noEmit为true，则会因为tsc没有输出而发生TypeScript emitted no output错误
                 * 但不知中间发生了什么奇怪的情况，也许是ts的问题，也许是ts-loader的问题，也许是TsconfigPathsPlugin的问题
                 * 如果使用tsconfig.descendant.json 继承自 tsconfig.json
                 * 且tsconfig.json中配置noEmit: true，则tsconfig.descendant.json中配置noEmit：false不会生效
                 * 有人提议ts-loader直接强制noEmit为false，毕竟it can't function without it...
                 * 但没有得到ts-loader的支持，所以这里通过给ts-loader添加option的方式强制noEmit为false
                 *
                 * 参考：
                 * - https://github.com/wix/yoshi/pull/1593
                 * - https://github.com/TypeStrong/ts-loader/issues/161
                 * - https://github.com/TypeStrong/ts-loader/issues/719
                 * - https://github.com/microsoft/TypeScript/issues/36932
                 * - https://github.com/TypeStrong/ts-loader/issues/1060
                 */
                options: {
                  configFile: tsConfigPath,
                  compilerOptions: {
                    noEmit: false,
                  },
                },
              },
              exclude: /node_modules/,
            },
            // 使用null-loader将不支持的文件一律编译为空模块
            {
              use: 'null-loader',
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: tsConfigPath,
        }),
      ],
    },
    mode: 'production',
    output: {
      path: '/',
      filename: OUTPUT_FILENAME,
    },
  })

  /**
   * 使用fs.readfileSync会遇到下面问题：
   *
   * node_modules/neo-async/async.js:16
   * throw new Error('Callback was already called.')
   *
   * 因此这里改用对volume json化获取内容
   */
  const vol = new Volume()
  const webpackFs = createFsFromVolume(vol)
  /**
   * 由于webpack之前所使用的memory-fs实现了本非node fs标准api的join api
   * 因此在webpack@4.x下使用自定义fs需要提供join api
   *
   * 参考：
   * - https://github.com/streamich/memfs/issues/404
   * - https://github.com/webpack/webpack-dev-middleware/blob/master/src/utils/setupOutputFileSystem.js
   */
  webpackFs.join = path.join.bind(path)

  compiler.outputFileSystem = webpackFs

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err)
      }

      if (stats.hasErrors() || stats.hasWarnings()) {
        return reject(
          new Error(
            stats.toString({
              errorDetails: true,
              warnings: true,
            }),
          ),
        )
      }
      const fsContent = vol.toJSON()
      return resolve(fsContent[`/${OUTPUT_FILENAME}`])
    })
  })
}

module.exports = async (entryPath, tsConfigPath) => {
  const scriptContent = await compileToJs(entryPath, tsConfigPath)
  // 利用eval执行脚本获取返回值
  // eslint-disable-next-line no-eval
  return eval(scriptContent)
}
