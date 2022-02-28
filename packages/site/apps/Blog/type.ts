import type { MarkdownArticleModule } from '@mine/markdown-loader'

export interface Article extends MarkdownArticleModule {
  path: string
}
