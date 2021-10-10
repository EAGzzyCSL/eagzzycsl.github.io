export type MatterData = Record<string, string>

/**
 * Normal类型
 */
export interface MarkdownNormalModule {
  content: string
}

/**
 * Article类型
 */
export interface TocItem {
  title: string
  level: number
}

export interface NestedTocItem extends TocItem {
  sub: NestedTocItem[]
}

export interface Toc {
  list: TocItem[]
  nested: NestedTocItem[]
}

export interface MarkdownArticleModule {
  title: string
  createdAt: string
  updatedAt: string
  tags: string[]
  introduction: string
  content: string
  toc: Toc
}
