/**
 * 定义site所有的静态页面
 *
 * FIXME: 这里引入的名称需要与所在的文件夹严格对应
 *
 */
import Acknowledgements from '@/apps/Acknowledgements/manifest'
import Launcher from '@/apps/Launcher/manifest'

import { AppDescribe } from './type'
import { camel2kebab } from './utils/string'

const appMap = {
  Launcher,
  Acknowledgements,
}

const apps: AppDescribe[] = Object.entries(appMap).map(([key, app]) => ({
  ...app,
  // appId就是apps下的目录名
  appId: key,
  // 如果未声明root则使用appId作为root，且app的root均以/开头
  root: app.root || `/${camel2kebab(key)}`,
}))

export default apps
