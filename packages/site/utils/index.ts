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
    img.onerror = () => {
      reject()
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
