import { extractToc } from './toc'

describe('从markdown content解析目录', () => {
  test('处理层级正常的heading', () => {
    const content = `
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

orange`
    const toc = extractToc(content)
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
  })
  test('处理层级混乱的heading', () => {
    const content = `
  # aaa
  
  ### bbb
  
  # ccc
    `
    const toc = extractToc(content)
    expect(toc).toStrictEqual({
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
  })
  test('处理空的heading', () => {
    const content = ''
    const toc = extractToc(content)
    expect(toc).toStrictEqual({
      list: [],
      nested: [],
    })
  })
})
