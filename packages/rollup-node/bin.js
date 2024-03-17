#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { rollup } from 'rollup'

const compileToJs = async (entryPath, tsConfigPath) => {
  const bundle = await rollup({
    input: path.resolve(entryPath),
    cache: false,
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: tsConfigPath,
        sourceMap: false,
      }),
      {
        name: 'plugin-static',
        load(id) {
          if (
            id &&
            ['.png', '.svg', '.jpg', '.jpeg', '.webp'].includes(
              path.extname(id),
            )
          ) {
            return 'export default {}'
          }
          return null
        },
      },
    ],
  })
  const result = await bundle.generate({
    format: 'iife',
    sourcemap: false,
  })
  const { code } = result.output[0]
  return code
}

const run = async (entryPath, tsConfigPath) => {
  const scriptContent = await compileToJs(entryPath, tsConfigPath)

  // 利用eval执行脚本获取返回值
  // eslint-disable-next-line no-eval
  return eval(scriptContent)
}

const [, , entryPath, tsConfigPath] = process.argv

const getPathAndCheck = (name, rPath) => {
  if (!rPath) {
    throw new Error(`${name} ${rPath} 未定义`)
  }

  const aPath = path.resolve(process.cwd(), rPath)

  if (fs.existsSync(aPath)) {
    return aPath
  }

  throw new Error(`${name} ${rPath} 不存在`)
}

run(
  getPathAndCheck('入口文件', entryPath),
  getPathAndCheck('tsconfig', tsConfigPath),
)
