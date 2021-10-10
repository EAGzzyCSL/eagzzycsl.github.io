import type {
  TocItem,
  NestedTocItem,
  Toc,
  MarkdownArticleModule,
} from '@mine/markdown-loader'

export type { TocItem, NestedTocItem, Toc }

export interface Article extends MarkdownArticleModule {
  path: string
}
