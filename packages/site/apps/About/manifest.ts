import { Manifest } from '@/utils/app'

import icon from './icon.png'

export default Manifest.create({
  icon,
  title: '关于',
  router: {
    '/': 'About.tsx',
  },
  tableIndex: 0,
  acknowledgements: [Manifest.acknowledgeIcon8icon(icon)],
})
