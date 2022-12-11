import { Manifest } from '@/utils/app'

import icon from './icon.png'

export default Manifest.create({
  icon,
  title: '地铁星座',
  router: {
    '/': 'MetroConstellation.tsx',
  },
  shortId: 'metro',
  tableIndex: 1,
  acknowledgements: [Manifest.acknowledgeIcon8icon(icon)],
  changelog: [
    {
      date: '2022-12-11',
      content: '大雪后，创建「地铁星座」',
    },
  ],
})
