/* eslint-disable no-console */
import { execSync } from 'child_process'

const result = execSync('git ls-files').toString()

const fileTypes = [
  ...new Set(result.split('\n').map(item => item.slice(item.lastIndexOf('.')))),
]
  .filter(item => !!item)
  .sort()

console.log(`当前项目中共有以下 ${fileTypes.length} 种文件类型：`)
console.log(fileTypes)
