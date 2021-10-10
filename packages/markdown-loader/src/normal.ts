import { MarkdownNormalModule, MatterData } from './type'
import { createLoader, CustomerProcessor } from './utils'

export const normalProcessor: CustomerProcessor<MarkdownNormalModule> = (
  matterData: MatterData,
  content: string,
) => ({
  content,
})

const loadArticle = createLoader<MarkdownNormalModule>(normalProcessor)

export default loadArticle
