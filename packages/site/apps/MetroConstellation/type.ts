/**
 * 地铁站
 */
export interface IMetroStationRaw {
  pos: [number, number]
  name: string
  lines: (string | number)[]
}

export interface IMetroStation extends IMetroStationRaw {
  level: BlinkLevel
  active: boolean
  colorful: boolean
}

/**
 * 地铁线
 */
export interface IMetroLineRaw {
  color: string
  sections: IMetroSection[]
}

export interface IMetroLine extends IMetroLineRaw {
  no: string
  colorful: boolean
  active: boolean
}
export type IMetroLinesMap = Record<string, IMetroLine>

/**
 * 地铁段（比如 11 号线分了两个方向）
 */
export interface IMetroSection {
  line: string[]
  isCircle?: boolean
}

/**
 * 线路上的一节一节（两站之间）
 */
export interface ILineNode {
  no: string
  // start 和 end 使用星星的编号
  start: number
  end: number
  color: string
}

/**
 * 亮度等级（星等）
 */
export enum BlinkLevel {
  small,
  mid,
  big,
}
