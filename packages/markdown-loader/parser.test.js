// FIXME: eslintrc中配置了env jest但未生效
/* eslint-env jest */

import { splitMarkdown, extractToc, parseMarkdown } from './parser'

test('处理结构完整的markdown', () => {
  const md = `---
title: blog-title
createdAt: 2020-08-08 20:08
updatedAt: 2020-08-08 20:30
introduction: 内容介绍
tags: html, js, css
---
# 是什么

foo bar

## 历史起源

hello world

## 现状

apple

# 为什么

strawberry

## 历史包袱

lemon

### 兼容性

watermelon

# 怎么做

orange
`
  // 拆分matter和content
  const spiltResult = splitMarkdown(md)
  expect(spiltResult).toStrictEqual({
    matter: {
      title: 'blog-title',
      createdAt: '2020-08-08 20:08',
      updatedAt: '2020-08-08 20:30',
      introduction: '内容介绍',
      tags: ['html', 'js', 'css'],
    },
    content: md.split('---\n')[2],
  })
  // 提取目录
  const toc = extractToc(spiltResult.content)
  expect(toc).toStrictEqual({
    list: [
      {
        title: '是什么',
        level: 1,
      },
      {
        title: '历史起源',
        level: 2,
      },
      {
        title: '现状',
        level: 2,
      },
      {
        title: '为什么',
        level: 1,
      },
      {
        title: '历史包袱',
        level: 2,
      },
      {
        title: '兼容性',
        level: 3,
      },
      {
        title: '怎么做',
        level: 1,
      },
    ],
    nested: [
      {
        title: '是什么',
        level: 1,
        sub: [
          {
            title: '历史起源',
            level: 2,
            sub: [],
          },
          {
            title: '现状',
            level: 2,
            sub: [],
          },
        ],
      },
      {
        title: '为什么',
        level: 1,
        sub: [
          {
            title: '历史包袱',
            level: 2,
            sub: [
              {
                title: '兼容性',
                level: 3,
                sub: [],
              },
            ],
          },
        ],
      },
      {
        title: '怎么做',
        level: 1,
        sub: [],
      },
    ],
  })
  // 完整解析
  expect(parseMarkdown(md)).toStrictEqual({
    ...spiltResult.matter,
    toc,
    content: spiltResult.content,
  })
})

test('解析层级关系混乱的heading', () => {
  expect(
    extractToc(`
# aaa

### bbb

# ccc
  `),
  ).toStrictEqual({
    list: [
      {
        title: 'aaa',
        level: 1,
      },
      {
        title: 'bbb',
        level: 3,
      },
      {
        title: 'ccc',
        level: 1,
      },
    ],
    nested: [
      {
        title: 'aaa',
        level: 1,
        sub: [],
      },
      {
        title: 'ccc',
        level: 1,
        sub: [],
      },
    ],
  })

  expect(
    extractToc(`
# aaa

### bbb

## ccc

### ddd
  `),
  ).toStrictEqual({
    list: [
      {
        title: 'aaa',
        level: 1,
      },
      {
        title: 'bbb',
        level: 3,
      },
      {
        title: 'ccc',
        level: 2,
      },
      {
        title: 'ddd',
        level: 3,
      },
    ],
    nested: [
      {
        title: 'aaa',
        level: 1,
        sub: [
          {
            title: 'ccc',
            level: 2,
            sub: [
              undefined,
              {
                title: 'ddd',
                level: 3,
                sub: [],
              },
            ],
          },
        ],
      },
    ],
  })

  expect(
    extractToc(`
## aaa

## bbb

# ccc

  `),
  ).toStrictEqual({
    list: [
      {
        title: 'aaa',
        level: 2,
      },
      {
        title: 'bbb',
        level: 2,
      },
      {
        title: 'ccc',
        level: 1,
      },
    ],
    nested: [
      {
        title: 'ccc',
        level: 1,
        sub: [],
      },
    ],
  })
})

test('处理结构残缺的markdown', () => {
  const md = `---
title: null-title
---
`
  // 拆分matter和content
  const spiltResult = splitMarkdown(md)
  expect(spiltResult).toStrictEqual({
    matter: {
      title: 'null-title',
      createdAt: '',
      updatedAt: '',
      introduction: '',
      tags: [],
    },
    content: '',
  })
  // 提取目录
  const toc = extractToc(spiltResult.content)
  expect(toc).toStrictEqual({
    list: [],
    nested: [],
  })
  // 完整解析
  expect(parseMarkdown(md)).toStrictEqual({
    ...spiltResult.matter,
    toc,
    content: spiltResult.content,
  })
})

test('处理空markdown', () => {
  const md = ''
  // 拆分matter和content
  const spiltResult = splitMarkdown(md)
  expect(spiltResult).toStrictEqual({
    matter: {
      title: '',
      createdAt: '',
      updatedAt: '',
      introduction: '',
      tags: [],
    },
    content: '',
  })
  // 提取目录
  const toc = extractToc(spiltResult.content)
  expect(toc).toStrictEqual({
    list: [],
    nested: [],
  })
  // 完整解析
  expect(parseMarkdown(md)).toStrictEqual({
    ...spiltResult.matter,
    toc,
    content: spiltResult.content,
  })
})
