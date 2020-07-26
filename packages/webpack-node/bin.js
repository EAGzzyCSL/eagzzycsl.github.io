#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const run = require('./index')

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
