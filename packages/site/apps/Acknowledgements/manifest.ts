import { Manifest } from '@/utils/app'

import icon from './icon.png'

export default Manifest.create({
  icon,
  title: '致谢',
  router: {
    '/': 'Acknowledgements.tsx',
  },
  acknowledgements: [
    Manifest.acknowledgeIcon8icon(
      icon,
      'https://icons8.cn/icons/set/hearts--v2',
    ),
  ],
})
