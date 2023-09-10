import { INotification } from '../types'

export enum ENotificationId {
  welcome = 'welcome',
}

export interface INotificationWithId extends INotification {
  id: ENotificationId
}

class NotificationManager {
  private notificationsMap: Record<string, INotificationWithId> = {}

  registerNotification(n: INotificationWithId): void {
    this.notificationsMap[n.id] = n
  }

  getAllNotification(): INotificationWithId[] {
    return Object.values(this.notificationsMap)
  }

  unRegisterNotification(n: INotificationWithId): void {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.notificationsMap[n.id]
  }
}

const notificationManager = new NotificationManager()

export default notificationManager
