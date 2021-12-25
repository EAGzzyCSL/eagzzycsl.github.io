import { Manifest } from '@/utils/app'

import icon from './icon.png'

export default Manifest.create({
  icon,
  title: '致谢',
  shortId: 'ack',
  router: {
    '/': 'Acknowledgements.tsx',
  },
  tableIndex: 0,
  acknowledgements: [
    Manifest.acknowledgeIcon8icon(
      icon,
      'https://icons8.cn/icons/set/hearts--v2',
    ),
  ],
})
