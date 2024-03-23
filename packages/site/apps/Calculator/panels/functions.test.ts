import { describe, test, expect } from 'vitest'

import { getBMIString, calBMIValue, calDPI, ceilFixed } from './functions'

test('DPI计算', () => {
  expect(calDPI(300, 400, 5)).toBe(100)
})

test('BMI计算', () => {
  expect(calBMIValue(81, 1.8)).toBe(25)
})

describe('ceilFixed', () => {
  test.each([
    [1, 2, '1.00'],
    [1.23, 1, '1.3'],
    [1.99, 1, '2.0'],
    [1.01, 1, '1.1'],
  ])('数字 %d ceilFixed 保留 %d 结果是 %s', (number, n, result) => {
    expect(ceilFixed(number, n)).toBe(result)
  })
})

describe('BMIString', () => {
  test.each([
    // 肥胖界
    [28.561, '28.57（肥胖）'],
    [28.001, '28.01（肥胖）'],
    [28.0, '28.00（肥胖）'],
    [27.999, '28.00（肥胖）'], // 0.999=1
    [27.99, '27.99（超重）'],
    [27.5, '27.50（超重）'],
    // 超重界
    [24.561, '24.57（超重）'],
    [24.001, '24.01（超重）'],
    [24.0, '24.00（超重）'],
    [23.999, '24.00（超重）'], // 0.999=1
    [23.99, '23.99（体重正常）'],
    [23.5, '23.50（体重正常）'],
    // 正常界
    [19.061, '19.07（体重正常）'],
    [18.501, '18.51（体重正常）'],
    [18.5, '18.50（体重正常）'],
    [18.499, '18.50（体重正常）'], // 0.999=1
    [18.49, '18.49（体重过低）'],
    // 过低
    [18.0, '18.00（体重过低）'],
  ])('BMI 结果 %d getBMIString 的结果是 %s', (value, result) => {
    expect(getBMIString(value)).toBe(result)
  })
})
