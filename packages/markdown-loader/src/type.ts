export type MatterData<
  S extends string | never,
  B extends string | never,
> = Record<S, string> & Record<B, boolean>

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

export interface MarkdownArticleModule extends MarkdownNormalModule {
  title: string
  createdAt: string
  updatedAt: string
  tags: string[]
  introduction: string
  toc: Toc
}

/**
 * Booklet类型
 */
export interface MarkdownBookletModule extends MarkdownNormalModule {
  title: string
  showCatalogue: boolean
  lastModified: string
  toc: Toc
}
