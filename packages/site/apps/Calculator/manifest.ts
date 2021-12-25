import { Manifest } from '@/utils/app'

import icon from './icon.png'

export default Manifest.create({
  icon,
  title: '计算器',
  router: {
    '/': 'Calculator.tsx',
  },
  shortId: 'calc',
  tableIndex: 1,
  acknowledgements: [
    Manifest.acknowledgeIcon8icon(
      icon,
      'https://icons8.cn/icons/set/pincode-keyboard',
    ),
  ],
})
