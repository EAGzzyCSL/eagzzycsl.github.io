import { observable, action } from 'mobx'

export default class ShellStore {
  @observable isScreenLocked = true

  @action
  unlockScreen(): void {
    this.isScreenLocked = false
  }

  @action
  lockScreen(): void {
    this.isScreenLocked = true
  }
}
