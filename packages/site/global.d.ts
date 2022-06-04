declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.webp'

declare module '*.mp3'

/**
 * markdown 模块
 */
interface TocItem {
  title: string
  level: number
}

declare module '*.md' {
  export default unknown
}

declare module '*.yml' {
  export default unknown
}
declare module '*.yaml' {
  export default unknown
}
