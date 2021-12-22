import sitemap from '@/sitemap'
import { IAcknowledgementItem } from '@/types/app'

import { DisplayData } from '../type'

import projectMaterialUi from './images/material-ui.svg'
import projectNext from './images/next.svg'

const globalAcknowledgementItems: IAcknowledgementItem[] = [
  {
    type: 'project',
    title: 'NEXT',
    image: projectNext,
    url: 'https://nextjs.org/',
    brief: '基于 React 的前端框架',
  },
  {
    type: 'project',
    title: 'MATERIAL-UI',
    image: projectMaterialUi,
    url: 'https://material-ui.com/',
    brief: '基于 React 与 Material Design 的 UI 库',
  },
]

/**
 * 汇总致谢名单并按类型分类导出
 */
const acknowledgementItems = sitemap.reduce<IAcknowledgementItem[]>(
  (r, item) => [...r, ...(item.acknowledgements || [])],
  globalAcknowledgementItems,
)

export default {
  icons: acknowledgementItems.filter(item => item.type === 'icon'),
  images: acknowledgementItems.filter(item => item.type === 'image'),
  projects: acknowledgementItems.filter(item => item.type === 'project'),
} as DisplayData
