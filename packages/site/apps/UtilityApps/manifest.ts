import { Manifest } from '@/utils/app'

import iconForAD from './assets/icons/ad.png'
import iconForAndroid from './assets/icons/android.png'
import iconForIOS from './assets/icons/ios.png'
import iconForLimitedFree from './assets/icons/limited-free.png'
import iconForLinux from './assets/icons/linux.png'
import iconForMac from './assets/icons/mac.png'
import iconForOpenSource from './assets/icons/open-source.png'
import iconForPay from './assets/icons/pay.png'
import iconForWeb from './assets/icons/web.png'
import iconForWindows from './assets/icons/windows.png'
import icon from './icon.png'

export default Manifest.create({
  icon,
  title: '工具应用集',
  shortId: 'utility',
  router: {
    '/': 'UtilityApps.tsx',
  },
  tableIndex: 0,
  acknowledgements: [
    ...Manifest.acknowledgeIcon8iconBatch([
      icon,
      iconForAD,
      iconForAndroid,
      iconForLinux,
      iconForWeb,
      iconForIOS,
      iconForLimitedFree,
      iconForMac,
      iconForOpenSource,
      iconForPay,
      iconForWindows,
    ]),
  ],
  changelog: [
    {
      date: '2021-12-11',
      content: '创建「工具应用集」',
    },
  ],
})
