import globalAcknowledgementItems from '@/constants/globalAcknowledge'
import sitemap from '@/sitemap'
import { IAcknowledgementItem } from '@/types/app'

import { DisplayData } from '../type'

/**
 * 汇总致谢名单并按类型分类导出
 */
const acknowledgementItems = sitemap.appList.reduce<IAcknowledgementItem[]>(
  (r, item) => [...r, ...(item.acknowledgements || [])],
  globalAcknowledgementItems,
)

export default {
  icons: acknowledgementItems.filter(item => item.type === 'icon'),
  images: acknowledgementItems.filter(item => item.type === 'image'),
  openSources: acknowledgementItems.filter(item => item.type === 'openSource'),
  projects: acknowledgementItems.filter(item => item.type === 'project'),
  icon8Icons: acknowledgementItems.filter(item => item.type === 'icon8-icon'),
} as DisplayData
