import { Manifest } from '@/utils/app'

import icon from './icon.png'

export default Manifest.create({
  icon,
  title: '模板',
  router: {
    '/': 'Template.tsx',
  },
  tableIndex: 1,
  acknowledgements: [
    Manifest.acknowledgeIcon8icon(
      icon,
      'https://icons8.cn/icon/64874/open-box',
    ),
  ],
})
