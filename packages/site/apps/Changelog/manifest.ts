import { Manifest } from '@/utils/app'

import icon from './icon.png'

export default Manifest.create({
  icon,
  title: '更新记录',
  router: {
    '/': 'Changelog.tsx',
  },
  tableIndex: 1,
  acknowledgements: [Manifest.acknowledgeIcon8icon(icon)],
})
