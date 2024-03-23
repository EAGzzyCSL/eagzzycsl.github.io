import { describe, test, expect } from 'vitest'

import { isNumberString } from './validate'

describe('isNumber', () => {
  test.each([
    '-0',
    '-123',
    '-123.4',
    '0',
    '0.0',
    '000',
    '0.1',
    '1234',
    '1234.00',
    '99.99',
    ' 123 ',
    '   123.456   ',
  ])('"%s"是合法的数字', s => {
    expect(isNumberString(s)).toBeTruthy()
  })

  test.each([
    '',
    '--0',
    '0.',
    '0.1.',
    'abc',
    '123a',
    'a123',
    '1e8',
    '1a8',
    'aaa',
  ])('"%s"不是合法的数字', s => {
    expect(isNumberString(s)).toBeFalsy()
  })
})
