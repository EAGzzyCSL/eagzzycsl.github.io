import { Link, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'

import { useMyRouter } from '@/router'

import styles from './BlogBrief.module.scss'
import BlogTags from './BlogTags'

interface BlogBriefProps {
  postPath: string
  title: string
  introduction: string
  updatedAt: string
  tags: string[]
}

const BlogBrief = ({
  postPath,
  title,
  introduction,
  updatedAt,
  tags,
}: BlogBriefProps): JSX.Element => {
  const router = useMyRouter()

  const date = dayjs(updatedAt).format('YYYY-MM-DD')

  const handleNav = (event: React.MouseEvent): void => {
    event.preventDefault()
    router.push('Blog', '/[postId]', postPath)
  }
  return (
    <section className={styles.blogBrief}>
      <Typography component='h1' variant='h4' color='primary' gutterBottom>
        <Link href='#' underline='hover' onClick={handleNav}>
          {title}
        </Link>
      </Typography>
      <Typography
        color='secondary'
        component='p'
        variant='subtitle2'
        gutterBottom
      >
        <Typography color='textSecondary' component='span'>
          last update：
        </Typography>
        {date}
      </Typography>
      <BlogTags tags={tags} />
      <Typography className={styles.introduction} component='p' gutterBottom>
        {introduction}
      </Typography>
      <Typography
        className={styles.viewFull}
        color='secondary'
        component='span'
      >
        <Link href='#' underline='hover' onClick={handleNav} color='secondary'>
          阅读全文…
        </Link>
      </Typography>
    </section>
  )
}

export default BlogBrief
