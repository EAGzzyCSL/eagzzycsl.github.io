import { getRestrictValue } from './index'

describe('getRestrictValue', () => {
  test.each([
    [1, 2, 3, 2],
    [1, 1, 3, 1],
    [1, 3, 3, 3],
    [1, 0, 3, 1],
    [1, 4, 3, 3],
  ])('result of getRestrictValue(%d, %d, %d) is %d', (min, x, max, y) => {
    expect(getRestrictValue(min, x, max)).toBe(y)
  })
})
