import { Point, PointTrack } from '../type'
import {
  angle2Radian,
  smoothPoints,
  transformTrack,
  transformTrackWithSize,
} from '../utils'

/**
 * 花瓣轮廓定义
 */
export interface PetalOutline {
  // 绘制起始点（写成数组只是为了方便做transform）
  moveTo: Point[]
  // 左半侧贝塞尔曲线
  leftBezier: Point[]
  // 顶部贝塞尔曲线
  topBezier: Point[]
  // 右半侧贝塞尔曲线
  rightBezier: Point[]
  // 底部贝塞尔曲线
  bottomQuadratic: Point[]
  // 填充花瓣的方向路径
  fillTrack: PointTrack[]
}

const flowerR = 10

/**
 * 一片花瓣的轮廓（花朵大小以10为基准，花瓣9花心1）
 */
export const A_PETAL_OUTLINE = ((): PetalOutline => {
  // 定义一些贝塞尔曲线的点（都取绝对值，实际使用时再加符号）
  // 花瓣与底部圆的交点，也是花瓣和花心的接触点
  const bottomContactPoint = [
    Math.sin(angle2Radian(360 / 9 / 2)),
    Math.cos(angle2Radian(360 / 9 / 2)),
  ]
  // 花瓣顶部与侧部的焦点
  const topContactPoint = [2.3, 7]
  // 花瓣顶部贝塞尔曲线的控制点Y
  const topControlY = 11
  // 花瓣部贝塞尔曲线的控制点
  const controlP1 = [2, 5]
  const controlP2 = [0.18, 2.4]

  // 绘制时从左下角开始，先绘制左半边的贝塞尔曲线
  const leftBezier = [
    { x: -controlP2[0], y: -controlP2[1] },
    { x: -controlP1[0], y: -controlP1[1] },
    { x: -topContactPoint[0], y: -topContactPoint[1] },
  ]
  // 再绘制顶部贝塞尔曲线
  const topBezier = [
    { x: -topContactPoint[0], y: -topControlY },
    { x: topContactPoint[0], y: -topControlY },
    { x: topContactPoint[0], y: -topContactPoint[1] },
  ]
  // 再绘制右半边的贝塞尔曲线
  const rightBezier = [
    { x: controlP1[0], y: -controlP1[1] },
    { x: controlP2[0], y: -controlP2[1] },
    { x: bottomContactPoint[0], y: -bottomContactPoint[1] },
  ]
  // 最后底部使用一小段贝塞尔曲线来模拟圆弧（为了使路径闭合）
  const bottomQuadratic = [
    { x: 0, y: -1.058 },
    { x: -bottomContactPoint[0], y: -bottomContactPoint[1] },
  ]
  return {
    moveTo: [{ x: -bottomContactPoint[0], y: -bottomContactPoint[1] }],
    leftBezier,
    topBezier,
    rightBezier,
    bottomQuadratic,
    fillTrack: smoothPoints(
      [
        { x: 0, y: -1, size: 0.3 },
        { x: 0, y: -flowerR, size: 3.5 },
      ],
      30,
    ),
  }
})()

/**
 * 创建整个梅花的轮廓
 * center是花瓣的圆心
 * size是花瓣的半径
 */
export const createThePlumOutline = (
  center: Point,
  size: number,
): PetalOutline[] => {
  const scale = size / flowerR
  const {
    moveTo,
    leftBezier,
    topBezier,
    rightBezier,
    bottomQuadratic,
    fillTrack,
  } = A_PETAL_OUTLINE

  return Array(9)
    .fill(0)
    .map((_, index) => (360 / 9) * index)
    .map(rotate => ({
      moveTo: transformTrack(moveTo, rotate, scale, center),
      leftBezier: transformTrack(leftBezier, rotate, scale, center),
      topBezier: transformTrack(topBezier, rotate, scale, center),
      rightBezier: transformTrack(rightBezier, rotate, scale, center),
      bottomQuadratic: transformTrack(bottomQuadratic, rotate, scale, center),
      fillTrack: transformTrackWithSize(fillTrack, rotate, scale, center),
    }))
}
