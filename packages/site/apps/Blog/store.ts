import { makeAutoObservable } from 'mobx'

import { createStore } from '@/store'

class BlogStore {
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

export default createStore<BlogStore>(new BlogStore())
