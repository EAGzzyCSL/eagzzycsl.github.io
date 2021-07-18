import { Manifest } from '@/type'

import icon from './icon.png'

export default {
  icon,
  title: 'blog',
  router: {
    '/': 'Blog.tsx',
    '/[postId]': 'Post.tsx',
  },
} as Manifest<'/' | '/[postId]'>
