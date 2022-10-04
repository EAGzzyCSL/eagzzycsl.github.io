import {
  camel2snake,
  camel2kebab,
  snake2camel,
  kebab2camel,
  kebab2Pascal,
} from './string'

test('camel2snake', () => {
  expect(camel2snake('')).toBe('')
  expect(camel2snake('camelCase')).toBe('camel_case')
})

test('camel2kebab', () => {
  expect(camel2kebab('')).toBe('')
  expect(camel2kebab('camelCase')).toBe('camel-case')
})

test('snake2camel', () => {
  expect(snake2camel('')).toBe('')
  expect(snake2camel('snack_case')).toBe('snackCase')
})

test('kebab2camel', () => {
  expect(kebab2camel('')).toBe('')
  expect(kebab2camel('kebab-case')).toBe('kebabCase')
})

test('kebab2Pascal', () => {
  expect(kebab2Pascal('')).toBe('')
  expect(kebab2Pascal('kebab-case')).toBe('KebabCase')
})
