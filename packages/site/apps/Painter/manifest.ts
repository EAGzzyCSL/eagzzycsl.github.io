import { Manifest } from '@/utils/app'

import pinyinImage from './assets/pinyin.png'
import icon from './icon.png'

export default Manifest.create({
  icon,
  title: '出图',
  router: {
    '/': 'Painter.tsx',
  },
  tableIndex: 1,
  acknowledgements: [
    Manifest.acknowledgeIcon8icon(
      icon,
      'https://icons8.cn/icons/set/border-color',
    ),
    {
      type: 'openSource',
      url: 'https://pinyin.js.org/',
      title: 'pinyin',
      brief: '汉字拼音转换工具',
      image: pinyinImage,
    },
    {
      type: 'openSource',
      url: 'https://html2canvas.hertzen.com/',
      title: 'html2canvas',
      brief: 'Screenshots with JavaScript',
    },
    {
      type: 'project',
      url: 'https://www.foundertype.com/index.php/FontInfo/index/id/137',
      title: '方正楷体',
      brief: '方正楷体是方正公司出品的一款可免费商用的字体',
    },
  ],
  changelog: [
    {
      date: '2022-03-06',
      content: '惊蛰后，「出图」增加「字典」',
    },
  ],
})
