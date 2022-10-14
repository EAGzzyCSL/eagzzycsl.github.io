import { Manifest } from '@/utils/app'

import icon from './icon.png'

export default Manifest.create({
  icon,
  title: '纯粹搜索',
  router: {
    '/': 'PureSearch.tsx',
  },
  shortId: 'search',
  tableIndex: 1,
  acknowledgements: [Manifest.acknowledgeIcon8icon(icon)],
  changelog: [
    {
      date: '2022-10-14',
      content: '寒露后，创建「纯粹搜索」',
    },
  ],
})
