import { smoothPoints } from './utils'

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
