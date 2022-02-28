import { MarkdownArticleModule, MatterData } from './type'
import { createLoader, CustomerProcessor } from './utils'
import { extractToc } from './utils/toc'

type MatterStringKey =
  | 'title'
  | 'createdAt'
  | 'updatedAt'
  | 'introduction'
  | 'tags'

export const articleProcessor: CustomerProcessor<
  MarkdownArticleModule,
  MatterStringKey,
  never
> = (matterData: MatterData<MatterStringKey, never>, content: string) => {
  const toc = extractToc(content)
  const {
    title = '',
    createdAt = '',
    updatedAt = '',
    introduction = '',
    tags,
  } = matterData
  return {
    title,
    createdAt,
    updatedAt,
    introduction,
    tags: tags ? tags.split(', ') : [],
    toc,
    content,
  }
}

const loadArticle = createLoader(articleProcessor)

export default loadArticle
