import { Manifest } from '@/type'

import icon from './icon.png'

export default {
  icon,
  title: '计算器',
  router: {
    '/': 'Calculator.tsx',
  },
} as Manifest<'/'>
