import { calDPI } from './functions'

test('DPI计算', () => {
  expect(calDPI(300, 400, 5)).toBe(100)
})
