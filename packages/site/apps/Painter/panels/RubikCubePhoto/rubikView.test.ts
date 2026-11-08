import { expect, test } from 'vitest'

import { DEFAULT_VIEW, getCameraPosition, clampView } from './rubikView'

test('default view matches the original camera position', () => {
  getCameraPosition(DEFAULT_VIEW).forEach(value => {
    expect(value).toBeCloseTo(35)
  })
})

test.each([
  [-1000, -1000],
  [-1000, 1000],
  [1000, -1000],
  [1000, 1000],
])(
  'rotation limit %s / %s keeps all three original faces visible',
  (azimuth, elevation) => {
    const view = clampView({ azimuth, elevation })
    const position = getCameraPosition(view)
    position.forEach(value => {
      expect(value).toBeGreaterThan(15)
    })
    expect(Math.hypot(...position)).toBeCloseTo(Math.sqrt(3) * 35)
    expect(clampView(view)).toEqual(view)
  },
)

test('a view within the limits is unchanged', () => {
  expect(clampView(DEFAULT_VIEW)).toEqual(DEFAULT_VIEW)
})
