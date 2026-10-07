/* eslint-disable no-console */
import { internalIpV4 } from 'internal-ip'
import qrcode from 'qrcode-terminal'

internalIpV4()
  .then(ip => {
    if (!ip) {
      throw new Error('无法获取本机 IPv4 地址，请检查网络连接后重试')
    }
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
  })
  .catch(error => {
    console.error(error.message)
    process.exitCode = 1
  })
