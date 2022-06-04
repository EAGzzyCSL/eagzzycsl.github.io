import { Manifest } from '@/utils/app'

import cylindricalProjectionLight from './assets/eo_base_2020_clean_geo.webp'
import three from './assets/three.svg'
import cylindricalProjectionDark from './assets/world.topo.bathy.200407.3.webp'
import icon from './icon.png'

export default Manifest.create({
  icon,
  title: '如果地球是向内的',
  shortId: 'earth',
  router: {
    '/': 'ViewInEarth.tsx',
  },
  tableIndex: 1,
  acknowledgements: [
    Manifest.acknowledgeIcon8icon(
      icon,
      'https://icons8.com/icon/nwRBNExj5TVz/地球行星',
    ),
    {
      type: 'image',
      image: cylindricalProjectionDark,
      url: 'https://visibleearth.nasa.gov/images/73751/july-blue-marble-next-generation-w-topography-and-bathymetry/73762l',
      title: '地球圆柱投影（深色）',
      brief: '地球圆柱投影（深色）来自nasa.gov',
    },
    {
      type: 'image',
      image: cylindricalProjectionLight,
      url: 'https://visibleearth.nasa.gov/images/147190/explorer-base-map/147192l',
      title: '地球圆柱投影（浅色）',
      brief: '地球圆柱投影（浅色）来自nasa.gov',
    },
    {
      type: 'openSource',
      image: three,
      url: 'https://threejs.org',
      title: 'three.js',
      brief: 'JavaScript 3D library',
    },
  ],
  changelog: [
    {
      date: '2022-06-04',
      content: '端午后，创建「如果地球是向内的」',
    },
  ],
})
