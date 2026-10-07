import { MyRouter } from '@/router'

export interface INotification {
  icon: React.JSX.Element
  header: string
  title: string
  content: string
  onClick: (ctx: { router: MyRouter }) => void
}
