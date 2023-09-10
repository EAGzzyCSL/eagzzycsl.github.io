import { IBookletItem } from '../type'

export default ['gu_shi_shi_jiu_shou'].map(fileName => {
  // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires, global-require, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const markdownModule = require(`./${fileName}.md`).default
  return {
    path: fileName,
    ...markdownModule,
  } as IBookletItem
})
