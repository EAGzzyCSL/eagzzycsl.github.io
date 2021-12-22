import { Manifest } from '@/utils/app'

import icon from './icon.png'

export default Manifest.create({
  icon,
  title: '关于',
  router: {
    '/': 'About.tsx',
  },
  acknowledgements: [
    Manifest.acknowledgeIcon8icon(
      icon,
      'https://icons8.cn/icons/set/glasses--v4',
    ),
  ],
})
