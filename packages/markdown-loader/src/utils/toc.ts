import markdownToc from 'markdown-toc'

import { Toc, NestedTocItem } from '../type'

/**
 * 从 markdown content 中获取目录
 * 结果包含嵌套和列表两种格式
 * - list: [{title: string, level: string}, ...]
 * - nested: [{title: string, level: number, sub: [{title: string, level: number, sub: {...}}]}]
 */
export const extractToc = (markdownContent: string): Toc => {
  const tocList = markdownToc(markdownContent).json

  const scoreboard: number[] = Array<number>(7).fill(0)

  const tocNested: NestedTocItem[] = []

  tocList.forEach(item => {
    if (scoreboard[item.lvl] !== 0) {
      scoreboard.fill(0, item.lvl + 1)
    }
    scoreboard[item.lvl] += 1
    // 以scoreboard作为路径创建树状目录
    for (let i = 1, parentToc = tocNested; i <= item.lvl; i += 1) {
      const currentTocIndex = scoreboard[i]
      // 虽然item.lvl已经作为了边界，但需要防范标题嵌套层级不合理情况
      if (currentTocIndex === 0) {
        break
      }
      // 遍历到第item.lvl级时设置标题
      if (i === item.lvl) {
        parentToc[currentTocIndex - 1] = {
          title: item.content,
          level: item.lvl,
          sub: [],
        }
        break
      }
      // 在标题嵌套层级正确的的情况下，遍历scoreboard即可找到当前标题的父级标题
      parentToc = parentToc[currentTocIndex - 1].sub
    }
  })
  return {
    list: tocList.map(({ content: title, lvl: level }) => ({
      title,
      level,
    })),
    nested: tocNested,
  }
}
