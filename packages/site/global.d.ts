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

declare module '*.mp3'

declare module '*.md' {
  type title = string
  const createdAt: string
  const updatedAt: string
  const tags: string[]
  const content: string
  const introduction: string

  interface TocItem {
    title: string
    level: number
  }

  interface NestedTocItem extends TocItem {
    sub: NestedTocItem[]
  }

  type toc = {
    list: TocItem[]
    nested: NestedTocItem[]
  }

  export default {
    title,
    createdAt,
    updatedAt,
    tags,
    introduction,
    toc,
    content,
  }
}

declare module '*.yml' {
  export default unknown
}
declare module '*.yaml' {
  export default unknown
}
