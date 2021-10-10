import grayMatter from 'gray-matter'

import { MatterData } from '../type'

type LoaderFunction = (source: string) => string

export type CustomerProcessor<R> = (
  matterData: MatterData,
  content: string,
) => R

/**
 * 用于创建一个自定义的loader的工具函数
 */
export const createLoader =
  <R>(customerProcessor: CustomerProcessor<R>): LoaderFunction =>
  (source: string): string => {
    const { data, content } = grayMatter(source)
    // 使用自定义的处理器处理拆分后的matterData和content部分
    const result = customerProcessor(data, content)
    return `export default ${JSON.stringify(result)}`
  }
