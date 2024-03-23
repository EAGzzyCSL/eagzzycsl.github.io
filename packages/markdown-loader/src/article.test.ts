import { test, expect } from 'vitest'

import { articleProcessor } from './article'

test('处理结构完整的markdown', () => {
  expect(
    articleProcessor(
      {
        title: 'blog-title',
        createdAt: '2020-08-08 20:08',
        updatedAt: '2020-08-08 20:30',
        introduction: '内容介绍',
        tags: 'html, js, css',
      },
      '正文',
    ),
  ).toStrictEqual({
    title: 'blog-title',
    createdAt: '2020-08-08 20:08',
    updatedAt: '2020-08-08 20:30',
    introduction: '内容介绍',
    tags: ['html', 'js', 'css'],
    toc: {
      list: [],
      nested: [],
    },
    content: '正文',
  })
})

test('处理空markdown', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
  expect(articleProcessor({} as any, '')).toStrictEqual({
    title: '',
    createdAt: '',
    updatedAt: '',
    introduction: '',
    tags: [],
    toc: {
      list: [],
      nested: [],
    },
    content: '',
  })
})
