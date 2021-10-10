import { Article } from '../type'

export default [
  'accelerate-homebrew',
  'beautify-eclipse',
  'epitaph-research',
  'gnome-experience',
  'line-continue',
  'nginx-issues',
  'rebuild-site',
  'turtle-soup-collection',
  'ux501-arch-win10',
].map(fileName => {
  // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires, global-require
  const markdownModule = require(`./${fileName}.md`).default
  return {
    path: fileName,
    ...markdownModule,
  } as Article
}) as Article[]
