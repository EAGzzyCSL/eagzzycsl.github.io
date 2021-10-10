import { MatterData } from '../type'

import { createLoader } from './index'

test('loader工作情况', () => {
  const loader = createLoader((matterData: MatterData, content) => {
    const { title, foo } = matterData
    return {
      title,
      foo,
      content,
    }
  })

  expect(
    loader(
      `---
title: mock-title
foo: bar
---
正文
`,
    ),
  ).toStrictEqual(
    `export default ${JSON.stringify({
      title: 'mock-title',
      foo: 'bar',
      content: '正文\n',
    })}`,
  )
})
