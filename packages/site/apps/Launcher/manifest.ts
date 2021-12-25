import { Manifest } from '@/utils/app'

import imageWallpaper from './assets/wallpaper.svg'
import icon from './icon.png'

export default Manifest.create({
  root: '/',
  icon,
  title: 'launcher',
  router: {
    '/': 'Launcher.tsx',
    '/404': 'NotFound.tsx',
  },
  tableIndex: 0,
  acknowledgements: [
    {
      type: 'icon',
      title: '',
      image: icon,
      url: 'https://icons8.cn/icons/set/rocket',
    },
    {
      type: 'image',
      title: '桌面壁纸',
      url: 'https://besthqwallpapers.com/abstract/colorful-strips-art-lines-design-material-abstract-material-25834',
      image: imageWallpaper,
      brief: '桌面壁纸来自 besthqwallpapers.com，为减小体积转制为svg',
    },
  ],
})
