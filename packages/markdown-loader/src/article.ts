import { MarkdownArticleModule, MatterData } from './type'
import { createLoader, CustomerProcessor } from './utils'
import { extractToc } from './utils/toc'

export const articleProcessor: CustomerProcessor<MarkdownArticleModule> = (
  matterData: MatterData,
  content: string,
) => {
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

const loadArticle = createLoader<MarkdownArticleModule>(articleProcessor)

export default loadArticle
