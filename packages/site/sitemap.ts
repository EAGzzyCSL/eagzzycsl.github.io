/**
 * 定义site所有的静态页面
 *
 * FIXME: 这里引入的名称需要与所在的文件夹严格对应
 *
 */
import About from '@/apps/About/manifest'
import Acknowledgements from '@/apps/Acknowledgements/manifest'
import Blog from '@/apps/Blog/manifest'
import Booklet from '@/apps/Booklet/manifest'
import BulletChat from '@/apps/BulletChat/manifest'
import Calculator from '@/apps/Calculator/manifest'
import Changelog from '@/apps/Changelog/manifest'
import Launcher from '@/apps/Launcher/manifest'
import LittleCousinSpeakTheTruth from '@/apps/LittleCousinSpeakTheTruth/manifest'
import MetroConstellation from '@/apps/MetroConstellation/manifest'
import Painter from '@/apps/Painter/manifest'
import PureSearch from '@/apps/PureSearch/manifest'
import Template from '@/apps/Template/manifest'
import UtilityApps from '@/apps/UtilityApps/manifest'
import ViewInEarth from '@/apps/ViewInEarth/manifest'
import WinterNine from '@/apps/WinterNine/manifest'

import { registerApps } from './utils/app'

export default registerApps({
  Launcher,
  Acknowledgements,
  Changelog,
  About,
  Blog,
  LittleCousinSpeakTheTruth,
  Calculator,
  Painter,
  WinterNine,
  Template,
  UtilityApps,
  Booklet,
  ViewInEarth,
  PureSearch,
  MetroConstellation,
  BulletChat,
})
