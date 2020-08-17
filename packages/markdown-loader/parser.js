const grayMatter = require('gray-matter')
const markdownToc = require('markdown-toc')

/**
 * 从 markdown 原文件中解析获取 matter 和 content
 */
const splitMarkdown = markdownSource => {
  const { data, content } = grayMatter(markdownSource)
  const {
    title = '',
    createdAt = '',
    updatedAt = '',
    introduction = '',
    tags,
  } = data
  return {
    matter: {
      title,
      createdAt,
      updatedAt,
      introduction,
      tags: tags ? tags.split(', ') : [],
    },
    content,
  }
}

/**
 * 从 markdown content 中获取目录
 */
const extractToc = markdownContent => {
  const tocList = markdownToc(markdownContent).json

  const scoreboard = Array(7).fill(0)

  const tocNested = []

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

/**
 * 从 markdown 原文件中解析获取 matter、toc、content
 *
 * 预设范式如下：
 * ```
 * ---
 * title: 文章标题
 * createdAt：创建时间（格式：2020-08-08 20:08）
 * updatedAt：更新时间（格式同上）
 * tags: 标签（以英文逗号分隔）
 * ---
 * # 一级标题
 * ## 二级标题
 * ```
 *
 *
 * 最终会返回如下字段：
 * - title：string
 * - createdAt：string
 * - updatedAt：string
 * - tags：string[]
 * - introduction：string
 * - content: string
 * - toc: 返回值包含两个属性，一种为列表格式，一种为嵌套格式
 *   - list: [{title: string, level: string}, ...]
 *   - nested: [{title: string, level: number, sub: [{title: string, level: number, sub: {...}}]}]
 */
const parseMarkdown = markdownSource => {
  const { matter, content } = splitMarkdown(markdownSource)
  const toc = extractToc(content)
  return {
    ...matter,
    toc,
    content,
  }
}

module.exports = {
  splitMarkdown,
  extractToc,
  parseMarkdown,
}
