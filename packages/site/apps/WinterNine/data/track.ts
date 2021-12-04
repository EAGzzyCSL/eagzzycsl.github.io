import { Point } from '../type'
import { tupleArray2PointArray } from '../utils'

/**
 * 树枝的数据，需要定义树枝的轨迹和树枝的起始宽度
 */
export interface PlumBranchDefine {
  points: Point[]
  width: number
}

export const plumBranchData: PlumBranchDefine[] = [
  // 最长的主枝
  {
    points: tupleArray2PointArray([
      [-20, -20],
      [25, 22],
      [17, 71],
      [28, 113],
      [63, 163],
      [87, 217],
      [139, 246],
      [174, 231],
      [220, 160],
      [296, 169],
      [329, 162],
      [356, 177],
      [391, 288],
      [443, 417],
      [476, 447],
      [616, 444],
      [675, 474],
      [803, 536],
      [860, 530],
      [878, 495],
      [1012, 433],
      [1037, 378],
      [1098, 347],
      [1130, 272],
    ]),
    width: 40,
  },
  // 主枝上的附枝
  {
    points: tupleArray2PointArray([
      [454, 440],
      [455, 436],
      [599, 391],
      [764, 379],
      [801, 322],
      [840, 291],
      [894, 202],
    ]),
    width: 20,
  },
  // 主枝下的附枝
  {
    points: tupleArray2PointArray([
      [140, 232],
      [140, 235],
      [142, 256],
      [217, 465],
      [215, 494],
      [193, 558],
      [247, 648],
      [322, 659],
      [365, 650],
      [418, 678],
      [488, 639],
      [577, 632],
      [627, 591],
    ]),
    width: 30,
  },
  // 主枝下的附枝的附枝
  {
    points: tupleArray2PointArray([
      [247, 644],
      [248, 645],
      [331, 607],
      [353, 561],
      [397, 520],
    ]),
    width: 20,
  },
]

/**
 * 花的数据，只需要定义位置和花的大小即可
 */
export interface PlumFlowerDefine {
  x: number
  y: number
  size: number
}

export const plumFlowerData: PlumFlowerDefine[] = [
  {
    x: 225,
    y: 160,
    size: 70,
  },
  {
    x: 394,
    y: 304,
    size: 60,
  },
  {
    x: 616,
    y: 390,
    size: 50,
  },
  {
    x: 890,
    y: 209,
    size: 40,
  },
  {
    x: 826,
    y: 531,
    size: 55,
  },
  {
    x: 1036,
    y: 384,
    size: 30,
  },
  {
    x: 242,
    y: 646,
    size: 40,
  },
  {
    x: 380,
    y: 540,
    size: 80,
  },
  {
    x: 525,
    y: 635,
    size: 30,
  },
]
