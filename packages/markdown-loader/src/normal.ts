import { MarkdownNormalModule, MatterData } from './type'
import { createLoader, CustomerProcessor } from './utils'

export const normalProcessor: CustomerProcessor<
  MarkdownNormalModule,
  never,
  never
> = (matterData: MatterData<never, never>, content: string) => ({
  content,
})

const loadNormal = createLoader(normalProcessor)

export default loadNormal
