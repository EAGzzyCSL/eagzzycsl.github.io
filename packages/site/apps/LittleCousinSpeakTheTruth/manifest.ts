import { Manifest } from '@/utils/app'

import imageClassroom from './assets/about-header.png'
import icon from './icon.png'

export default Manifest.create({
  icon,
  title: '他说破了事实',
  shortId: 'lcstt',
  router: {
    '/': 'LittleCousinSpeakTheTruth.tsx',
  },
  acknowledgements: [
    Manifest.acknowledgeIcon8icon(
      icon,
      'https://icons8.cn/icons/set/christmas-boy--v1',
    ),
    {
      type: 'image',
      title: '课堂插图',
      image: imageClassroom,
      url: 'https://icons8.cn/illustrations/illustration/pluto-96',
      brief: '课堂插图 来自icons8.cn',
    },
  ],
})
