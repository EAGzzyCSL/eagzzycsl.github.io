import { createLoader } from './index'

test('loader工作情况', () => {
  const loader = createLoader((matterData, content) => {
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
  ).toBe(
    `export default ${JSON.stringify({
      title: 'mock-title',
      foo: 'bar',
      content: '正文\n',
    })}`,
  )
})
