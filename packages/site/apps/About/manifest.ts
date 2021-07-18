import { Manifest } from '@/type'

import icon from './icon.png'

export default {
  icon,
  title: '关于',
  router: {
    '/': 'About.tsx',
  },
} as Manifest<'/'>
