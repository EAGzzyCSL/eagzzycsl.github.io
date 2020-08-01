import iconHeartsV2 from '@/apps/Acknowledgements/icon.png'
import iconPinCodeKeyboard from '@/apps/Calculator/icon.png'
import imageWallpaper from '@/apps/Launcher/assets/wallpaper.svg'
import iconRocket from '@/apps/Launcher/icon.png'
import imageClassroom from '@/apps/LittleCousinSpeakTheTruth/assets/about-header.png'
import iconChristmasBoyV1 from '@/apps/LittleCousinSpeakTheTruth/icon.png'

import projectMaterialUi from './images/material-ui.svg'
import projectNext from './images/next.svg'

export interface BasicDisplayItem {
  title: string
  url: string
  brief: string
  image?: string
}

export interface PictorialDisplayItem extends BasicDisplayItem {
  image: string
}

type DisplayItem = BasicDisplayItem | PictorialDisplayItem

export interface DisplayData {
  icons: PictorialDisplayItem[]
  images: PictorialDisplayItem[]
  projects: DisplayItem[]
}

export default {
  icons: [
    {
      title: '火箭 icon',
      image: iconRocket,
      url: 'https://icons8.cn/icons/set/rocket',
      brief: '火箭 icon 来自 icons8.cn',
    },
    {
      title: '桃心 icon',
      image: iconHeartsV2,
      url: 'https://icons8.cn/icons/set/hearts--v2',
      brief: '桃心 icon 来自 icons8.cn',
    },
    {
      title: 'Christmas Boy icon',
      image: iconChristmasBoyV1,
      url: 'https://icons8.cn/icons/set/christmas-boy--v1',
      brief: 'Christmas Boy icon 来自 icons8.cn',
    },
    {
      title: 'PIN 代码键盘 icon',
      image: iconPinCodeKeyboard,
      url: 'https://icons8.cn/icons/set/pincode-keyboard',
      brief: 'PIN 代码键盘 icon 来自 icons8.cn',
    },
  ],
  images: [
    {
      title: '桌面壁纸',
      image: imageWallpaper,
      url:
        'https://besthqwallpapers.com/abstract/colorful-strips-art-lines-design-material-abstract-material-25834',
      brief: '桌面壁纸来自 besthqwallpapers.com，为减小体积转制为svg',
    },
    {
      title: '课堂插图',
      image: imageClassroom,
      url: 'https://icons8.cn/illustrations/illustration/pluto-96',
      brief: '课堂插图 来自icons8.cn',
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
  ],
} as DisplayData
