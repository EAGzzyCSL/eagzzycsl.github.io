import { Manifest } from '@/utils/app'

import imageButter from './assets/crossed/butter.jpeg'
import imageButterfly from './assets/crossed/butterfly.png'
import imageKongQin from './assets/crossed/kong_qin.jpeg'
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
    Manifest.acknowledgeIcon8icon(icon),
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
    {
      type: 'openSource',
      url: 'https://github.com/DominicTobias/react-image-crop',
      title: 'React Image Crop',
      brief: 'A responsive image cropping tool for React',
    },
    ...Manifest.acknowledgeBatch(
      [
        [
          '黄油',
          imageButter,
          'https://zh.m.wikipedia.org/zh/%E9%BB%84%E6%B2%B9',
        ],
        [
          '蝴蝶',
          imageButterfly,
          'https://pixabay.com/zh/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1295496',
        ],
        [
          '空青',
          imageKongQin,
          'https://site.china.cn/kucunnongchanpin/4557849928.html',
        ],
      ],
      {
        type: 'image',
        titleFn: title => `十字格${title}照片`,
        urlFn: () => '',
        briefFn: title => `十字格${title}照片来自 wikipedia.org`,
      },
    ),
  ],
  changelog: [
    {
      date: '2022-03-06',
      content: '惊蛰后，「出图」增加「字典」',
    },
    {
      date: '2022-04-16',
      content: '居家中，「出图」增加「不可能三角」',
    },
    {
      date: '2022-06-12',
      content: '芒种后，「出图」增加「阵营九宫格」',
    },
  ],
})
