interface TocItem {
  title: string
  level: number
}

export interface NestedTocItem extends TocItem {
  sub: NestedTocItem[]
}

export interface Article {
  path: string
  title: string
  createdAt: string
  updatedAt: string
  tags: string[]
  introduction: string
  content: string
  toc: {
    list: TocItem[]
    nested: NestedTocItem[]
  }
}
