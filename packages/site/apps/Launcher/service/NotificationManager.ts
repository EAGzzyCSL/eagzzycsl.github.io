import { INotification, INotificationWithId } from '../types'

class NotificationManager {
  private notificationsMap: Record<string, INotificationWithId> = {}

  private idIndex = 0

  registerNotification(n: INotification): void {
    this.idIndex += 1
    const id = this.idIndex
    this.notificationsMap[id] = {
      id,
      ...n,
    }
  }

  getAllNotification(): INotificationWithId[] {
    return Object.values(this.notificationsMap)
  }

  unRegisterNotification(n: INotificationWithId): void {
    delete this.notificationsMap[n.id]
  }
}

const notificationManager = new NotificationManager()

export default notificationManager
