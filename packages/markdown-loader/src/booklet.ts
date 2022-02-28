import { MarkdownBookletModule, MatterData } from './type'
import { createLoader, CustomerProcessor } from './utils'
import { extractToc } from './utils/toc'

type MatterStringKey = 'title' | 'lastModified'

type MatterBooleanKey = 'showCatalogue'

export const bookletProcessor: CustomerProcessor<
  MarkdownBookletModule,
  MatterStringKey,
  MatterBooleanKey
> = (
  matterData: MatterData<MatterStringKey, MatterBooleanKey>,
  content: string,
) => {
  const toc = extractToc(content)
  const { title = '', showCatalogue = false, lastModified = '' } = matterData
  return {
    title,
    toc,
    content,
    showCatalogue,
    lastModified,
  }
}

const loadBooklet = createLoader(bookletProcessor)

export default loadBooklet
