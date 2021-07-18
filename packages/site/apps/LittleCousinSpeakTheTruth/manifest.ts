import { Manifest } from '@/type'

import icon from './icon.png'

export default {
  icon,
  title: '他说破了事实',
  router: {
    '/': 'LittleCousinSpeakTheTruth.tsx',
  },
} as Manifest<'/'>
