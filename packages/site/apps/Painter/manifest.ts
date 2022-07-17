import { Manifest } from '@/utils/app'

import dumplingImage11 from './assets/camp/dumpling/11.jpeg'
import dumplingImage12 from './assets/camp/dumpling/12.jpeg'
import dumplingImage13 from './assets/camp/dumpling/13.jpeg'
import dumplingImage21 from './assets/camp/dumpling/21.jpeg'
import dumplingImage22 from './assets/camp/dumpling/22.jpeg'
import dumplingImage23 from './assets/camp/dumpling/23.jpeg'
import dumplingImage31 from './assets/camp/dumpling/31.jpeg'
import dumplingImage32 from './assets/camp/dumpling/32.jpeg'
import dumplingImage33 from './assets/camp/dumpling/33.jpeg'
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
    {
      type: 'openSource',
      url: 'https://github.com/DominicTobias/react-image-crop',
      title: 'React Image Crop',
      brief: 'A responsive image cropping tool for React',
    },
    ...Manifest.acknowledgeBatch(
      [
        [
          '饺子',
          dumplingImage11,
          'https://zh.wikipedia.org/zh-hans/%E9%A5%BA%E5%AD%90',
        ],
        ['粽子', dumplingImage12, 'https://zh.wikipedia.org/wiki/%E7%B2%BD'],
        [
          '丸子',
          dumplingImage13,
          'https://zh.wikipedia.org/wiki/%E4%B8%B8%E5%AD%90',
        ],
        [
          '煎饼果子',
          dumplingImage21,
          'https://zh.wikipedia.org/wiki/%E7%85%8E%E9%A5%BC%E9%A6%83%E5%AD%90',
        ],
        [
          '鸡蛋',
          dumplingImage22,
          'https://zh.wikipedia.org/wiki/%E9%9B%9E%E8%9B%8B',
        ],
        [
          '汉堡',
          dumplingImage23,
          'https://zh.wikipedia.org/wiki/%E6%BC%A2%E5%A0%A1%E5%8C%85',
        ],
        [
          '馒头',
          dumplingImage31,
          'https://zh.wikipedia.org/wiki/%E9%A6%92%E5%A4%B4',
        ],
        [
          '瑞士卷',
          dumplingImage32,
          'https://zh.wikipedia.org/wiki/%E5%8D%B7%E8%9B%8B%E7%B3%95',
        ],
        [
          '冰棍',
          dumplingImage33,
          'https://zh.wikipedia.org/wiki/%E5%86%B0%E6%A3%92',
        ],
      ],
      {
        type: 'image',
        titleFn: title => `阵营图${title}照片`,
        urlFn: () => '',
        briefFn: title => `阵营图${title}照片来自 wikipedia.org`,
      },
    ),
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
