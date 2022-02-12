export interface AppInfoItemRaw {
  // 工具所属领域
  domain: string
  // 工具名
  name: string
  // 工具地址
  link: string
  // 特征
  trait: string
  // 试用平台
  platform: string
  // 标注与简单介绍
  remarks: string[]
}

export interface ITrait {
  openSource: boolean
  ad: boolean
  limitedFree: boolean
  pay: boolean
}

export interface IPlatform {
  android: boolean
  ios: boolean
  web: boolean
  linux: boolean
  mac: boolean
  win: boolean
}

export interface AppInfoItem {
  domain: string
  name: string
  link: string
  trait: ITrait
  platform: IPlatform
  remarks: string[]
}

/**
 * 简单的规格描述，包含图标和简介
 */
export interface Specification {
  icon: string
  brief: string
}

/**
 * 包含详细介绍的规格描述
 */
export interface SpecificationWithParticular extends Specification {
  // 解释说明
  particular: string
}
