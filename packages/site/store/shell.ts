import { makeAutoObservable } from 'mobx'

export default class ShellStore {
  isScreenLocked = true

  desktopImagePreLoaded = false

  constructor() {
    makeAutoObservable(this)
  }

  unlockScreen(): void {
    this.isScreenLocked = false
  }

  lockScreen(): void {
    this.isScreenLocked = true
  }

  markDesktopImageLoaded(): void {
    this.desktopImagePreLoaded = true
  }
}
