import { Manifest } from '@/utils/app'

import avatars from './data/avatars'
import icon from './icon.png'
import coolhueImage from './images/coolhue.png'

export default Manifest.create({
  icon,
  title: '弹幕 demo',
  router: {
    '/': 'BulletChat.tsx',
  },
  shortId: 'bullet',
  tableIndex: 1,
  acknowledgements: [
    Manifest.acknowledgeIcon8icon(icon),
    ...Manifest.acknowledgeIcon8iconBatch(avatars),
    {
      title: 'coolhue',
      url: 'https://github.com/webkul/coolhue',
      image: coolhueImage,
      type: 'openSource',
      brief:
        'Coolest handpicked Gradient Hues and Swatches for your next super ⚡ amazing stuff',
    },
  ],
})
