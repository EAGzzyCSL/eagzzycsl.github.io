import { getParentAppPath } from '.'

describe('使用getParentAppPath获取路由父级页面', () => {
  test.each([
    ['launch首页', '/', '/'],
    ['404页面', '/404', '/'],
    ['blog首页', '/blog', '/'],
    ['blog详情页面', '/blog/[postId]', '/blog'],
  ])('%s "%s" 的父级页面是 "%s"', (name, route, parent) => {
    expect(getParentAppPath(route)).toBe(parent)
  })
})
