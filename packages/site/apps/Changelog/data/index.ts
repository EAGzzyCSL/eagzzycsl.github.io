import avatar from '@/assets/favicon.png'
import sitemap from '@/sitemap'
import { IChangelogItem } from '@/types/app'

import { getColorOfDate } from '../utils/index'

export interface IChangelogItemWithIcon extends IChangelogItem {
  icon: string
}

export interface IChangeLogItemForDisplay extends IChangelogItemWithIcon {
  color: string
}

const globalChangelog: IChangelogItemWithIcon[] = [
  {
    date: '2020-08-22',
    content: '仲夏，第一版发布',
    icon: avatar,
  },
  {
    date: '2020-07-12',
    content: '初始化站点',
    icon: avatar,
  },
]

/**
 * 择取所有的changelog，按照日期排序后添加颜色
 */
export default sitemap.appList
  .reduce<IChangelogItemWithIcon[]>(
    (r, app) => [
      ...r,
      ...(app.changelog ?? []).map(item => ({ ...item, icon: app.icon })),
    ],
    globalChangelog,
  )
  .sort((a, b) => b.date.localeCompare(a.date))
  .map<IChangeLogItemForDisplay>(item => ({
    ...item,
    color: getColorOfDate(item.date),
  }))
