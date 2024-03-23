import { test, expect } from 'vitest'

import yamlDemo from './yaml-demo.yaml'

test('transform-yaml', () => {
  expect(yamlDemo).toMatchInlineSnapshot(`
    {
      "fruits": [
        "apple",
        "banana",
        "cherry",
      ],
    }
  `)
})
