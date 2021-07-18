import { Manifest } from '@/type'

import icon from './icon.png'

export default {
  icon,
  title: '出图',
  router: {
    '/': 'Painter.tsx',
  },
} as Manifest<'/'>
