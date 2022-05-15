import { jointGoogleSearchUrl } from './index'

test('jointGoogleSearchUrl', () => {
  expect(jointGoogleSearchUrl('hello')).toBe(
    'https://www.google.com/search?q=hello',
  )
  expect(jointGoogleSearchUrl('site:example.com')).toBe(
    'https://www.google.com/search?q=site%3Aexample.com',
  )
  expect(jointGoogleSearchUrl('张三 site:example.com')).toBe(
    'https://www.google.com/search?q=%E5%BC%A0%E4%B8%89%20site%3Aexample.com',
  )
})
