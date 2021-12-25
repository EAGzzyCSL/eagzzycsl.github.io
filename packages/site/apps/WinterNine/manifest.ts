import { Manifest } from '@/utils/app'

import plumPhoto from './assets/plum.jpg'
import icon from './icon.png'

export default Manifest.create({
  icon,
  title: '管城春满',
  shortId: 'nine',
  router: {
    '/': 'WinterNine.tsx',
  },
  tableIndex: 0,
  acknowledgements: [
    Manifest.acknowledgeIcon8icon(icon, 'https://icons8.com/icon/67935/雪人'),
    {
      type: 'image',
      title: '数九梅花图',
      image: plumPhoto,
      url: 'https://www.photophoto.cn/sucai/38019572.html',
      brief: '数九梅花图参考了图行天下提供的共享授权图片',
    },
  ],
  changelog: [
    {
      date: '2021-12-06',
      content: '大雪，为「管城春满」添加梅花',
    },
    {
      date: '2020-12-21',
      content: '冬至夜，创建「管城春满」',
    },
  ],
})
