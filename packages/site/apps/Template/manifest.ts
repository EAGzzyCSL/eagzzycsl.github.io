import { Manifest } from '@/utils/app'

import icon from './icon.png'

export default Manifest.create({
  icon,
  title: '模板',
  router: {
    '/': 'Template.tsx',
  },
  shortId: 'template',
  tableIndex: 1,
  acknowledgements: [Manifest.acknowledgeIcon8icon(icon)],
})
