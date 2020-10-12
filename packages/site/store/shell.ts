import { makeAutoObservable } from 'mobx'

export default class ShellStore {
  isScreenLocked = true

  constructor() {
    makeAutoObservable(this)
  }

  unlockScreen(): void {
    this.isScreenLocked = false
  }

  lockScreen(): void {
    this.isScreenLocked = true
  }
}
