import { Manifest } from '@/utils/app'

import icon from './icon.png'

export default Manifest.create({
  icon,
  title: '出图',
  router: {
    '/': 'Painter.tsx',
  },
  acknowledgements: [
    Manifest.acknowledgeIcon8icon(
      icon,
      'https://icons8.cn/icons/set/border-color',
    ),
  ],
})
