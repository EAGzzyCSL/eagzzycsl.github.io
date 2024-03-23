import { describe, test, expect } from 'vitest'

import {
  smoothPoints,
  getNineDescription,
  getDistanceFromTwoPoints,
  angle2Radian,
  transformTrack,
  flattenTrack,
} from './utils'

test('smoothPoints', () => {
  expect(smoothPoints([])).toStrictEqual([])
  expect(smoothPoints([{ x: 1, y: 1, size: 10 }])).toStrictEqual([
    { x: 1, y: 1, size: 10 },
  ])
  expect(
    smoothPoints(
      [
        { x: 0, y: 0, size: 0 },
        { x: 6, y: 12, size: 24 },
      ],
      3,
    ),
  ).toStrictEqual([
    { x: 0, y: 0, size: 0 },
    { x: 2, y: 4, size: 8 },
    { x: 4, y: 8, size: 16 },
    { x: 6, y: 12, size: 24 },
  ])
})

describe('getNineDescription', () => {
  test.each([
    [-5, '距离冬至还有4天'],
    [-1, '距离冬至还有0天'],
    [0, '一九第一天'],
    [1, '一九第二天'],
    [8, '一九第九天'],
    [9, '二九第一天'],
    [10, '二九第二天'],
    [80, '九九第九天'],
    [81, '出九第一天'],
    [89, '出九第九天'],
    [90, '出九'],
  ])('距离冬至%d天时文字是%s', (dayDiff, text) => {
    expect(getNineDescription(dayDiff)).toBe(text)
  })
})

describe('getDistanceFromTwoPoints', () => {
  test.each([
    [[0, 0, 0, 1], 1],
    [[0, 0, 3, 4], 5],
  ])('distance of %p is %p', (args, distance) => {
    expect(
      getDistanceFromTwoPoints(...(args as [number, number, number, number])),
    ).toBe(distance)
  })
})

describe('angle2Radian', () => {
  test.each([
    [0, 0],
    [90, Math.PI / 2],
    [180, Math.PI],
  ])('%d 角度转弧度的结果是 %f', (a, r) => {
    expect(angle2Radian(a)).toBe(r)
  })
})

test('flattenTrack', () => {
  expect(
    flattenTrack([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]),
  ).toStrictEqual([1, 2, 3, 4])
})

describe('transformTrack', () => {
  test.each([
    [[{ x: 0, y: 0 }], 0, 2, { x: 10, y: 10 }, [{ x: 10, y: 10 }]],
    // 用例如果换了其他值，很容易出现因为.999999的问题
    [[{ x: 6, y: 5 }], 90, 2, { x: 3, y: 1 }, [{ x: 13, y: -11 }]],
  ])(
    'transformTrack %j with rotateAngle %p and scale %p then translate %o result is %o',
    (track, rotateAngle, scale, translate, result) => {
      expect(
        transformTrack(track, rotateAngle, scale, translate),
      ).toStrictEqual(result)
    },
  )
})
