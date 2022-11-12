import { MyRouter } from '@/router'

export interface INotification {
  icon: JSX.Element
  header: string
  title: string
  content: string
  onClick: (ctx: { router: MyRouter }) => void
}
