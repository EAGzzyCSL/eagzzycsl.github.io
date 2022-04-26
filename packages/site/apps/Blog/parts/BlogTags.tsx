import React from 'react'

import { Typography } from '@mui/material'

import styles from './BlogTags.module.scss'

interface BlogTagsProps {
  tags: string[]
}

const BlogTags = ({ tags }: BlogTagsProps): JSX.Element => (
  <div className={styles.blogTags}>
    {tags.map(tag => (
      <Typography
        className={styles.tag}
        component='span'
        variant='subtitle2'
        color='secondary'
        key={tag}
      >
        #{tag}
      </Typography>
    ))}
  </div>
)

export default BlogTags
