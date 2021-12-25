import sitemap from '@/sitemap'
import { IChangelogItem } from '@/types/app'

import { getColorOfDate } from '../utils/index'

export interface IChangeLogItemWithColor extends IChangelogItem {
  color: string
}

const globalChangelog = [
  {
    date: '2020-08-22',
    content: '仲夏，第一版发布',
  },
  {
    date: '2020-07-12',
    content: '初始化站点',
  },
]

/**
 * 择取所有的changelog，按照日期排序后添加颜色
 */
export default sitemap.appList
  .reduce<IChangelogItem[]>(
    (r, app) => [...r, ...(app.changelog || [])],
    globalChangelog,
  )
  .sort((a, b) => b.date.localeCompare(a.date))
  .map<IChangeLogItemWithColor>(item => ({
    ...item,
    color: getColorOfDate(item.date),
  }))
