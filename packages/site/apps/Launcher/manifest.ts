import { Manifest } from '@/type'

import icon from './icon.png'

export default {
  root: '/',
  icon,
  title: 'launcher',
  router: {
    '/': 'Launcher.tsx',
    '/404': 'NotFound.tsx',
  },
} as Manifest
