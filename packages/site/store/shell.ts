import { makeAutoObservable } from 'mobx'

export default class ShellStore {
  isScreenLocked = true

  desktopImagePreLoaded = false

  desktopCurrentTableIndex = 0

  desktopTableCount = 0

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

  updateDesktopCurrentTableIndex(tableIndex: number): void {
    this.desktopCurrentTableIndex = tableIndex
  }

  reportDesktopTableCount(tableCount: number): void {
    this.desktopTableCount = tableCount
  }
}
