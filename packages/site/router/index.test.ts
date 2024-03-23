import { describe, test, expect } from 'vitest'

import { getParentAppPath, getAppName } from './index'

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

describe('使用getAppName获取页面的 appName', () => {
  test.each([
    ['launch首页', '/', 'Launcher'],
    ['404页面', '/404', 'NotFound'],
    ['blog首页', '/blog', 'Blog'],
    ['blog详情页面', '/blog/[postId]', 'Blog'],
  ])('%s "%s" appName "%s"', (name, route, parent) => {
    expect(getAppName(route)).toBe(parent)
  })
})
