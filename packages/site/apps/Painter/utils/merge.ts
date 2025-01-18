export const mergeImages = async (
  images: string[],
  options: { width: number; height: number },
) => {
  const list = await Promise.all<HTMLImageElement>(
    images.map(
      url =>
        new Promise(resolve => {
          const img = document.createElement('img')
          img.src = url
          img.onload = () => {
            resolve(img)
          }
        }),
    ),
  )

  const canvas = document.createElement('canvas')
  canvas.width = options.width
  canvas.height = options.height
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ctx = canvas.getContext('2d')!
  list.forEach(item => {
    ctx.drawImage(item, 0, 0, options.width, options.height)
  })
  return canvas.toDataURL('image/png')
}
