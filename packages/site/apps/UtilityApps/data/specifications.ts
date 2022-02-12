import iconForAD from '../assets/icons/ad.png'
import iconForAndroid from '../assets/icons/android.png'
import iconForIOS from '../assets/icons/ios.png'
import iconForLimitedFree from '../assets/icons/limited-free.png'
import iconForLinux from '../assets/icons/linux.png'
import iconForMac from '../assets/icons/mac.png'
import iconForOpenSource from '../assets/icons/open-source.png'
import iconForPay from '../assets/icons/pay.png'
import iconForWeb from '../assets/icons/web.png'
import iconForWindows from '../assets/icons/windows.png'
import {
  SpecificationWithParticular,
  Specification,
  IPlatform,
  ITrait,
} from '../type'

export const PlatformSpecifications: Record<keyof IPlatform, Specification> = {
  android: {
    brief: '适用于 Android',
    icon: iconForAndroid,
  },
  ios: {
    brief: '适用于 IOS',
    icon: iconForIOS,
  },
  web: {
    brief: '适用于浏览器或本身是浏览器插件',
    icon: iconForWeb,
  },
  linux: {
    brief: '适用于 Linux',
    icon: iconForLinux,
  },
  mac: {
    brief: '适用于 macOS',
    icon: iconForMac,
  },
  win: {
    brief: '适用于 Windows',
    icon: iconForWindows,
  },
}

export const TraitSpecifications: Record<
  keyof ITrait,
  SpecificationWithParticular
> = {
  openSource: {
    brief: '开源',
    icon: iconForOpenSource,
    particular:
      '标记表示开源，未标记表示闭源。仅从功能角度考虑，开源与闭源并无优劣之分。',
  },
  ad: {
    brief: '有广告',
    icon: iconForAD,
    particular:
      '标记表示有广告，未标记表示无广告。广告带来的收益可以维持开发者持续不断地更新迭代。',
  },
  limitedFree: {
    brief: '受限免费',
    icon: iconForLimitedFree,
    particular:
      '标记表示受限免费。很多软件免费版的功能对于个人用户也是足够的。',
  },
  pay: {
    brief: '需要付费',
    icon: iconForPay,
    particular: '标记表示需要付费。定价合理物有所值且确实需要那就付费。',
  },
}
