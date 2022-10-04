import { Manifest } from '@/utils/app'

import icon from './icon.png'

export default Manifest.create({
  icon,
  title: 'blog',
  router: {
    '/': 'Blog.tsx',
    '/[postId]': 'Post.tsx',
  },
  tableIndex: 0,
  acknowledgements: [
    Manifest.acknowledgeIcon8icon(icon),
    {
      type: 'openSource',
      title: 'highlight.js',
      url: 'https://highlightjs.org/',
      brief: '用于web的代码高亮库',
    },
    {
      type: 'openSource',
      title: 'markdownlint',
      url: 'https://github.com/DavidAnson/markdownlint',
      brief: '适用于 Markdown 文件的 lint 工具',
    },
  ],
})
