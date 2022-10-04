import projectIcon8 from '@/assets/icons8.svg'
import projectMaterialUi from '@/assets/material-ui.svg'
import projectNext from '@/assets/next.svg'
import { IAcknowledgementItem } from '@/types/app'

export default [
  {
    type: 'openSource',
    title: 'NEXT',
    image: projectNext,
    url: 'https://nextjs.org/',
    brief: '基于 React 的前端框架',
  },
  {
    type: 'openSource',
    title: 'MATERIAL-UI',
    image: projectMaterialUi,
    url: 'https://material-ui.com/',
    brief: '基于 React 与 Material Design 的 UI 库',
  },
  {
    type: 'project',
    title: 'ICONS8',
    image: projectIcon8,
    url: 'https://icons8.com/',
    brief: '图标、插图、照片、音乐和设计工具',
  },
] as IAcknowledgementItem[]
