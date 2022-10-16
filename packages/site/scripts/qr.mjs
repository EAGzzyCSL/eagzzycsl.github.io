/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { internalIpV4Sync } from 'internal-ip'
import qrcode from 'qrcode-terminal'

const ip = internalIpV4Sync()
const url = `http://${ip}:3000`

console.log('\n\n')

console.log('        手机扫描二维码预览')
qrcode.generate(
  url,
  {
    small: true,
  },
  str => {
    console.log(
      str
        .split('\n')
        .map(item => `    ${item}`)
        .join('\n'),
    )
  },
)

console.log(`     ${url}`)
console.log('\n\n')
