import { IMetroStation } from '../type'

import { calcLineProps, calcBackground } from './MetroMap'

describe('calcLineProps', () => {
  const makeStation = (pos: [number, number]): IMetroStation => ({
    pos,
    level: 1,
    name: 'not-care',
    lines: [],
    active: true,
    colorful: false,
  })

  test('水平', () => {
    expect(
      calcLineProps(makeStation([10, 10]), makeStation([20, 10]), {}),
    ).toStrictEqual({
      alongAxis: true,
      direction: 'x',
      left: 10,
      top: 10,
      width: 11,
      height: 1,
    })
  })
  test('垂直', () => {
    expect(
      calcLineProps(makeStation([10, 10]), makeStation([10, 20]), {}),
    ).toStrictEqual({
      alongAxis: true,
      direction: 'y',
      left: 10,
      top: 10,
      width: 1,
      height: 11,
    })
  })
  // 注意写 case 时坐标系是浏览器坐标系（y向下）
  test('y=x', () => {
    expect(
      calcLineProps(makeStation([10, 10]), makeStation([20, 20]), {}),
    ).toStrictEqual({
      alongAxis: false,
      direction: 'y=x',
      left: 10,
      top: 10,
      width: 11,
      height: 11,
    })
  })
  test('y=-x', () => {
    expect(
      calcLineProps(makeStation([10, 10]), makeStation([20, 0]), {}),
    ).toStrictEqual({
      alongAxis: false,
      direction: 'y=-x',
      left: 10,
      top: 0,
      width: 11,
      height: 11,
    })
  })
})

describe('calcBackground', () => {
  test('四种情况', () => {
    expect(calcBackground('pink', false, 'y=x', true)).toMatchInlineSnapshot(
      `"linear-gradient(to bottom left,transparent 0%,transparent calc(49.5% - 3px),#ddd calc(50% - 3px),#ddd calc(50% + 3px),transparent calc(50.5% + 3px),transparent 100%)"`,
    )
    expect(calcBackground('pink', false, 'y=-x', true)).toMatchInlineSnapshot(
      `"linear-gradient(to bottom right,transparent 0%,transparent calc(49.5% - 3px),#ddd calc(50% - 3px),#ddd calc(50% + 3px),transparent calc(50.5% + 3px),transparent 100%)"`,
    )
    expect(calcBackground('pink', false, 'y=x', true)).toMatchInlineSnapshot(
      `"linear-gradient(to bottom left,transparent 0%,transparent calc(49.5% - 3px),#ddd calc(50% - 3px),#ddd calc(50% + 3px),transparent calc(50.5% + 3px),transparent 100%)"`,
    )
    expect(calcBackground('pink', false, 'y=-x', true)).toMatchInlineSnapshot(
      `"linear-gradient(to bottom right,transparent 0%,transparent calc(49.5% - 3px),#ddd calc(50% - 3px),#ddd calc(50% + 3px),transparent calc(50.5% + 3px),transparent 100%)"`,
    )
  })
})
