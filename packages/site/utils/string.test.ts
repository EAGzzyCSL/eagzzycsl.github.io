import { camel2snake, camel2kebab } from './string'

test('camel2snake', () => {
  expect(camel2snake('')).toBe('')
  expect(camel2snake('camelCase')).toBe('camel_case')
})

test('camel2kebab', () => {
  expect(camel2kebab('')).toBe('')
  expect(camel2kebab('camelCase')).toBe('camel-case')
})
