import { makeAutoObservable } from 'mobx'

export default class BlogStore {
  focusOnLeft = true

  constructor() {
    makeAutoObservable(this)
  }

  disableFocusOnLeft(): void {
    this.focusOnLeft = false
  }

  enableFocusOnLeft(): void {
    this.focusOnLeft = true
  }
}
