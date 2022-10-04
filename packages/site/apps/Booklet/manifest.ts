import { Manifest } from '@/utils/app'

import icon from './icon.png'

export default Manifest.create({
  icon,
  title: '篇册',
  router: {
    '/': 'Booklet.tsx',
    '/[bookletId]': 'BookletFull.tsx',
  },
  tableIndex: 0,
  acknowledgements: [Manifest.acknowledgeIcon8icon(icon)],
  changelog: [
    {
      date: '2022-03-01',
      content: '正月将尽，创建「篇册」',
    },
  ],
})
