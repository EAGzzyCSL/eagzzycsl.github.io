export const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })

const loadImg = (imgUrl: string): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
      resolve()
    }
    img.onerror = e => {
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      reject(e)
    }
  })

/**
 * 预加载多张图片
 * @param imgUrls 图片列表
 * @returns
 */
export const preLoadImages = (
  imgUrls: string[],
  timeout = 1000,
): Promise<void> =>
  Promise.any([
    (async (): Promise<void> => {
      await Promise.all(imgUrls.map(url => loadImg(url)))
    })(),
    sleep(timeout),
  ])

export const getHashContent = (): string =>
  typeof window === 'undefined' ? '' : document.location.hash.slice(1)

export const triggerDownload = (name: string, url: string): void => {
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
}

/**
 * 输入x，返回一个最接近x的y，且min<=y<=max
 */
export const getRestrictValue = (
  min: number,
  input: number,
  max: number,
): number => Math.max(min, Math.min(input, max))

/**
 * 从数组中随机取一个元素
 */
export const randomPick = <T>(array: T[]): T =>
  array[Math.floor(array.length * Math.random())]
