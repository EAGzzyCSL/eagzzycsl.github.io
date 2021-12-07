import { Manifest } from '@/type'

import icon from './icon.png'

export default {
  icon,
  title: '更新记录',
  router: {
    '/': 'Changelog.tsx',
  },
} as Manifest<'/'>
