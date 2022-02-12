import {
  AppInfoItemRaw,
  AppInfoItem,
  ITrait,
  IPlatform,
  Specification,
} from './type'

export const parseAppInfoItemRaw = (item: AppInfoItemRaw): AppInfoItem => {
  const {
    domain,
    name,
    link,
    remarks = [],
    trait: traitList,
    platform: platformList,
  } = item

  const trait: ITrait = {
    openSource: false,
    limitedFree: false,
    pay: false,
    ad: false,
  }

  ;(traitList || '').split('、').forEach(item => {
    trait.openSource = trait.openSource || item === '开源'
    trait.limitedFree = trait.limitedFree || item === '受限免费'
    trait.pay = trait.pay || item === '付费'
    trait.ad = trait.ad || item === '有广告'
  })

  const platform: IPlatform = {
    android: false,
    ios: false,
    web: false,
    linux: false,
    mac: false,
    win: false,
  }

  platformList.split('、').forEach(x => {
    platform[x as keyof typeof platform] = true
  })

  return {
    domain,
    name,
    link,
    trait,
    platform,
    remarks,
  }
}

/**
 * 生成一个按domain分组的appInfoItem列表
 */
export const generateAppsList = (
  appsListData: AppInfoItemRaw[],
): AppInfoItem[][] =>
  Object.values(
    appsListData.map(parseAppInfoItemRaw).reduce((acc, item) => {
      acc[item.domain] = acc[item.domain] || []
      acc[item.domain].push(item)
      return acc
    }, {} as Record<string, AppInfoItem[]>),
  )

/**
 * 根据trait或platform描述生成用于渲染的Specification列表
 */
export const getSpecifications = <T extends ITrait | IPlatform>(
  feat: T,
  spec: Record<keyof T, Specification>,
): Specification[] =>
  (Object.keys(feat) as (keyof T)[])
    .filter(key => feat[key])
    // 如果list.yml中feat列表拼错了，会导致undefined错误
    .map(key => spec[key])
