const path = require('path')

module.exports = {
  overrides: [
    {
      files: ['**/*.tsx'],
      extends: ['@mine/eslint-config/react'],
      rules: {
        'react/jsx-filename-extension': [
          'error',
          {
            extensions: ['.tsx'],
          },
        ],
      },
    },
    {
      files: ['**/*.tsx', '**/*.ts'],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(__dirname, './tsconfig.json'),
          },
        },
      },
      rules: {
        '@typescript-eslint/no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'dayjs',
                message: 'Please use @/utils/date instead.',
                allowTypeImports: false,
              },
              /**
               * @mui/icons-material/index.js 里面大概引用了上万个 icon 文件
               * 会被都编译一遍拖慢速度，同时它又不支持 esm
               * 即使走 esm next 给 server 端编译 node 消费的产物时转 commonjs 似乎也不会 tree-shaking
               */
              {
                name: '@mui/icons-material',
                message: 'Please use @/ui/icons instead.',
                allowTypeImports: false,
              },
              {
                name: '@mui/material',
                message: 'Please use @/ui/material instead.',
                allowTypeImports: false,
              },
            ],
          },
        ],
      },
    },
  ],
}
