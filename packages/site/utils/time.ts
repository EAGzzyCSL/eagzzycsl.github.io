/**
 * 使用 requestAnimationFrame 来模拟 setTimeout/setInterval
 * 这样实现出来的计时相当于渲染计时，可以用来实现对动画元素的安全清除
 * 不会出现页面放后台后再切前台，计时已经到期但动画元素还未完成
 */
interface ITimeFn {
  (callback: () => void, interval: number): () => void
}

export const createFrameTimeout: ITimeFn = (
  callback: () => void,
  timeout: number,
) => {
  let previewTs = 0
  let frameId = 0
  let hiddenStart = 0
  let hiddenCost = 0
  const frameFn = (ts: number): void => {
    if (previewTs === 0) {
      previewTs = ts
    }
    const totalTimePast = ts - previewTs - hiddenCost
    if (totalTimePast >= timeout) {
      callback()
      previewTs = 0
      hiddenCost = 0
    } else {
      frameId = requestAnimationFrame(frameFn)
    }
  }
  const visibilityChangeListener = (): void => {
    if (document.visibilityState === 'hidden') {
      hiddenStart = performance.now()
    } else if (document.visibilityState === 'visible') {
      hiddenCost += performance.now() - hiddenStart
    }
  }

  document.addEventListener('visibilitychange', visibilityChangeListener)
  frameId = requestAnimationFrame(frameFn)

  return () => {
    document.removeEventListener('visibilitychange', visibilityChangeListener)
    cancelAnimationFrame(frameId)
  }
}

export const createFrameInterval: ITimeFn = (
  callback: () => void,
  interval: number,
) => {
  let clear = (): void => {}
  const intervalFn = (): void => {
    callback()
    clear = createFrameTimeout(intervalFn, interval)
  }
  clear = createFrameTimeout(intervalFn, interval)
  // 返回一个函数，而不是直接返回 clear
  // 这样可以避免 useEffect 对返回的函数使用新的变量保存（永远指向了最初的 clear）
  // 从而导致而在清理副作用时使用了过期的 clear
  return () => clear()
}
