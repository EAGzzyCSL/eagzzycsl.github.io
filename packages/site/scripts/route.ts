/**
 * 根据sitemap中配置的app信息生成最终适配next路由的pages目录
 */
import fs from 'fs'
import path from 'path'

import sitemap from '../sitemap'

const PAGES_ROOT = path.resolve('./pages')

const joinCode = (codes: string[]): string => `${codes.join('\n')}\n`

// 拼接pages下页面中的代码
// 导出 getStaticPaths 和 getStaticProps 方法以便静态导出
const getPageCode = (
  appName: string,
  match: string,
  fileName: string,
): string => {
  const filePath = `'@/apps/${appName}/${fileName}'`

  // 如果是[id]类型的页面需要导出getStaticPaths
  const nextStatic = match.endsWith(']')
    ? `export { getStaticProps, getStaticPaths } from ${filePath}`
    : `export { getStaticProps } from ${filePath}`

  return joinCode([
    `import ${fileName} from ${filePath}`,
    '',
    `export default ${fileName}`,
    nextStatic,
  ])
}

const trimEndTsx = (s: string): string => s.replace(/\.tsx$/, '')

// 对每一个app按照router中配置的每一条匹配创建对应的以页面文件
sitemap.appList.forEach(app => {
  const pages = Object.entries(app.router).map(([match, file]) => ({
    match,
    file,
  }))
  pages.forEach(page => {
    // 获取app应归属的目录
    const appDir = path.resolve(PAGES_ROOT, `./${app.root}`)
    // 如果目录不存在则创建该目录
    // 但并未支持match本身有目录嵌套的情况
    if (!fs.existsSync(appDir)) {
      fs.mkdirSync(appDir)
    }
    // 如果路径是 / 则页面文件名为 index，否则为router中定义的 match
    const targetFileName = page.match === '/' ? 'index' : `${page.match}`
    // 写入对应的页面文件
    fs.writeFileSync(
      path.resolve(appDir, `./${targetFileName}.tsx`),
      getPageCode(app.appId, page.match, trimEndTsx(page.file)),
    )
  })
})

/**
 * 生成一份apps的json列表供 commitlint 使用
 */
fs.writeFileSync(
  path.resolve('./scripts/apps-list.json'),
  `${JSON.stringify(
    sitemap.appList.map(app => ({
      appId: app.appId,
      shortId: app.shortId,
      title: app.title,
    })),
    undefined,
    2,
  )}\n`,
)
