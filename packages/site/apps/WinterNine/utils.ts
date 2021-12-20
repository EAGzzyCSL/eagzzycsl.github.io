import { Tuple } from '@/types/utility'

import { Point, PointTrack, XYTuple } from './type'

/**
 * 对轨迹进行细化，以便于使用requestAnimationFrame绘制
 * @param points
 * @param ratio 细化的比率
 */
export const smoothPoints = (
  points: PointTrack[],
  ratio = 10,
): PointTrack[] => {
  const result: PointTrack[] = []
  if (points.length === 0) {
    return result
  }
  result.push(points[0])
  for (let i = 1; i < points.length; i += 1) {
    const previous = points[i - 1]
    const current = points[i]
    const deltaX = (current.x - previous.x) / ratio
    const deltaY = (current.y - previous.y) / ratio
    const deltaSize = (current.size - previous.size) / ratio
    for (let j = 1; j <= ratio; j += 1) {
      result.push({
        x: previous.x + deltaX * j,
        y: previous.y + deltaY * j,
        size: previous.size + deltaSize * j,
      })
    }
  }
  return result
}

const chars = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九']

export const numberToChar = (num: number): string => chars[num]

/**
 * 根据与冬至的日期差值，获取描述文字
 * 日期差值为1天，对应倒计时应该是还剩0天
 * @param dayDiff 日期差值
 */
export const getNineDescription = (dayDiff: number): string => {
  if (dayDiff < 0) {
    return `距离冬至还有${Math.abs(dayDiff) - 1}天`
  }
  if (dayDiff > 89) {
    return '出九'
  }
  if (dayDiff > 80) {
    return `出九第${numberToChar(dayDiff - 80)}天`
  }
  const dayIndex = dayDiff + 1
  const nineOrder = Math.ceil(dayIndex / 9)
  const dayOrder = 9 - (nineOrder * 9 - dayIndex)
  return `${numberToChar(nineOrder)}九第${numberToChar(dayOrder)}天`
}

/**
 * 获取两点间距离
 */
export const getDistanceFromTwoPoints = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)

/**
 * 根据点迹细化创建轨迹
 * 与smoothPoints的区别在于smoothPoints是直接对轨迹的每一段均匀切分为若干段
 * 而createTrackFromPoints对轨迹的每一段的切分数量由段的长度/画笔size决定
 */
export const createTrackFromPoints = (
  points: Point[],
  size: number,
  smoothRatio: number,
): Point[] => {
  const result: Point[] = []

  if (points.length === 0) {
    return result
  }

  for (let i = 0; i < points.length - 1; i += 1) {
    const { x: currentX, y: currentY } = points[i]
    const { x: nextX, y: nextY } = points[i + 1]
    const d = getDistanceFromTwoPoints(currentX, currentY, nextX, nextY)
    // 这里可能会有无法整除的问题，但画笔宽度会比枝条略宽，大概可以cover到
    const trackCount = d / (size / smoothRatio)
    const deltaX = (nextX - currentX) / trackCount
    const deltaY = (nextY - currentY) / trackCount
    for (let j = 0; j < trackCount; j += 1) {
      result.push({ x: currentX + j * deltaX, y: currentY + j * deltaY })
    }
  }
  const endPoint = points[points.length - 1]
  result.push(endPoint)
  return result
}

/**
 * 将弧度转换为角度
 */
export const angle2Radian = (angle: number): number => (angle * Math.PI) / 180

/**
 * 对轨迹点依次进行旋转、缩放、平移操作
 * 旋转方向为顺时针
 */
export const transformTrack = (
  track: Point[],
  rotateAngle: number,
  scale: number,
  translate: Point,
): Point[] =>
  track.map(p => ({
    x:
      (p.x * Math.cos(angle2Radian(rotateAngle)) +
        p.y * Math.sin(angle2Radian(rotateAngle))) *
        scale +
      translate.x,
    y:
      (p.y * Math.cos(angle2Radian(rotateAngle)) -
        p.x * Math.sin(angle2Radian(rotateAngle))) *
        scale +
      translate.y,
  }))

/**
 * 与transformTrack功能类似，但同时会对size进行放缩
 */
export const transformTrackWithSize = (
  track: PointTrack[],
  rotateAngle: number,
  scale: number,
  translate: Point,
): PointTrack[] =>
  transformTrack(track, rotateAngle, scale, translate).map((p, i) => ({
    ...p,
    size: track[i].size * scale,
  }))

export const point2Tuple = (p: Point): XYTuple => [p.x, p.y]

export const tuple2Point = (a: XYTuple): Point => ({
  x: a[0],
  y: a[1],
})

export const pointArray2TupleArray = (ps: Point[]): XYTuple[] =>
  ps.map(point2Tuple)

export const tupleArray2PointArray = (ts: XYTuple[]): Point[] =>
  ts.map(tuple2Point)

/**
 * 将轨迹数组扁平化
 */
export const flattenTrack = <N extends number>(
  track: Point[],
): Tuple<number, N> =>
  track.reduce<number[]>((result, p) => {
    result.push(p.x, p.y)
    return result
  }, []) as Tuple<number, N>

/**
 * 对数值进行浮动
 * @param 原本数值
 * @param 浮动范围（0-1）
 * @returns 漂移后结果
 */
export const driftNumber = (origin: number, range: number): number =>
  origin + origin * Math.random() * range * (Math.random() > 0.5 ? 1 : -1)
