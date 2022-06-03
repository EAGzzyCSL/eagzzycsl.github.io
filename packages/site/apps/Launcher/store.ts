import { makeAutoObservable } from 'mobx'

import { createStore } from '@/store'

class LauncherStore {
  isScreenLocked = true

  desktopImagePreLoaded = false

  desktopCurrentTableIndex = 0

  desktopTableCount = 0

  shellMaskVisible = false

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

  updateShellMaskVisible = (visible: boolean): void => {
    this.shellMaskVisible = visible
  }
}

export default createStore<LauncherStore>(new LauncherStore())
