/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'

import chalk from 'chalk'
import fsExtra from 'fs-extra'
import inquirer from 'inquirer'
import logSymbols from 'log-symbols'

const templateDir = path.resolve(`./apps/Template`)

const kebab = s =>
  s
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase()

const lowerCaseFirstChar = s => s[0].toLowerCase() + s.slice(1)

inquirer
  .prompt([
    {
      name: 'appId',
      message: '输入 app 文件夹名：',
    },
    {
      name: 'appTitle',
      message: '输入 app 标题：',
    },
  ])
  .then(answers => {
    const { appId, appTitle } = answers
    const appDir = path.resolve(`./apps/${appId}`)
    if (fsExtra.existsSync(appDir)) {
      console.log(logSymbols.error, chalk.red(`app「${appId}」已存在！`))
      return
    }
    fsExtra.copySync(templateDir, appDir)
    const tsxPath = path.resolve(appDir, `${appId}.tsx`)
    const scssPath = path.resolve(appDir, `${appId}.module.scss`)
    const manifestPath = path.resolve(appDir, `manifest.ts`)

    fsExtra.renameSync(path.resolve(appDir, 'Template.module.scss'), scssPath)
    fsExtra.renameSync(path.resolve(appDir, 'Template.tsx'), tsxPath)

    fsExtra.writeFileSync(
      tsxPath,
      fsExtra
        .readFileSync(tsxPath)
        .toString()
        .replace(/Template/g, appId)
        .replace(/template/g, lowerCaseFirstChar(appId))
        .replace(/模板/g, appTitle),
    )
    fsExtra.writeFileSync(
      scssPath,
      fsExtra
        .readFileSync(scssPath)
        .toString()
        .replace(/template/g, kebab(appId)),
    )

    fsExtra.writeFileSync(
      manifestPath,
      fsExtra
        .readFileSync(manifestPath)
        .toString()
        .replace(/Template/g, appId)
        .replace(/模板/g, appTitle),
    )

    console.log(logSymbols.success, chalk.green(`app「 ${appId} 」创建完成！`))
    console.log(
      logSymbols.info,
      `Please add "import ${appId} from '@/apps/${appId}/manifest'" in sitemap.ts"`,
    )
    console.log(logSymbols.info, `then run "npm run site:route"`)
  })
