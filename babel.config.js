module.exports = {
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
        '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/plugin-transform-react-jsx',
        // 配置mobx的装饰器支持
        // 参考：https://mobx.js.org/best/decorators.html
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    },
  },
}
