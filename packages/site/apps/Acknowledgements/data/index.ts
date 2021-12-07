import iconOfAbout from '@/apps/About/icon.png'
import iconOfAcknowledgements from '@/apps/Acknowledgements/icon.png'
import iconOfBlog from '@/apps/Blog/icon.png'
import iconOfCalculator from '@/apps/Calculator/icon.png'
import iconOfChangelog from '@/apps/Changelog/icon.png'
import imageWallpaper from '@/apps/Launcher/assets/wallpaper.svg'
import iconOfLauncher from '@/apps/Launcher/icon.png'
import imageClassroom from '@/apps/LittleCousinSpeakTheTruth/assets/about-header.png'
import iconOfLittleCousinSpeakTheTruth from '@/apps/LittleCousinSpeakTheTruth/icon.png'
import iconOfPainter from '@/apps/Painter/icon.png'
import iconOfWinterNine from '@/apps/WinterNine/icon.png'

import projectMaterialUi from './images/material-ui.svg'
import projectNext from './images/next.svg'
import plumPhoto from './images/plum.jpg'

export interface BasicDisplayItem {
  title: string
  url: string
  brief: string
  image?: string
}

export interface PictorialDisplayItem extends BasicDisplayItem {
  image: string
  cover?: boolean
}

type DisplayItem = BasicDisplayItem | PictorialDisplayItem

export interface DisplayData {
  icons: PictorialDisplayItem[]
  images: PictorialDisplayItem[]
  projects: DisplayItem[]
}

const icon8Icons = [
  [iconOfLauncher, 'https://icons8.cn/icons/set/rocket'],
  [iconOfAcknowledgements, 'https://icons8.cn/icons/set/hearts--v2'],
  [
    iconOfLittleCousinSpeakTheTruth,
    'https://icons8.cn/icons/set/christmas-boy--v1',
  ],
  [iconOfCalculator, 'https://icons8.cn/icons/set/pincode-keyboard'],
  [iconOfBlog, 'https://icons8.cn/icons/set/quill-pen'],
  [iconOfAbout, 'https://icons8.cn/icons/set/glasses--v4'],
  [iconOfPainter, 'https://icons8.cn/icons/set/border-color'],
  [iconOfWinterNine, 'https://icons8.com/icon/67935/雪人'],
  [iconOfChangelog, 'https://icons8.cn/icon/81967/cinema'],
].map(([image, url = null]) => ({
  title: 'from icon8',
  image,
  // next 的props限制：`undefined` cannot be serialized as JSON
  url,
}))

export default {
  icons: [...icon8Icons],
  images: [
    {
      title: '桌面壁纸',
      image: imageWallpaper,
      url: 'https://besthqwallpapers.com/abstract/colorful-strips-art-lines-design-material-abstract-material-25834',
      brief: '桌面壁纸来自 besthqwallpapers.com，为减小体积转制为svg',
      cover: true,
    },
    {
      title: '课堂插图',
      image: imageClassroom,
      url: 'https://icons8.cn/illustrations/illustration/pluto-96',
      brief: '课堂插图 来自icons8.cn',
      cover: true,
    },
    {
      title: '数九梅花图',
      image: plumPhoto,
      url: 'https://www.photophoto.cn/sucai/38019572.html',
      brief: '数九梅花图参考了图行天下提供的共享授权图片',
      cover: true,
    },
  ],
  projects: [
    {
      title: 'NEXT',
      image: projectNext,
      url: 'https://nextjs.org/',
      brief: '基于 React 的前端框架',
    },
    {
      title: 'MATERIAL-UI',
      image: projectMaterialUi,
      url: 'https://material-ui.com/',
      brief: '基于 React 与 Material Design 的 UI 库',
    },
    {
      title: 'highlight.js',
      url: 'https://highlightjs.org/',
      brief: '用于web的代码高亮库',
    },
    {
      title: 'markdownlint',
      url: 'https://github.com/DavidAnson/markdownlint',
      brief: '适用于 Markdown 文件的 lint 工具',
    },
    {
      title: '国字标准字体笔顺学习网',
      url: 'https://stroke-order.learningweb.moe.edu.tw/',
      brief: '台湾省教育部门维护的汉字笔顺教学资源',
    },
  ],
} as DisplayData
