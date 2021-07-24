import {
  Typography,
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
} from '@material-ui/core'
import { MenuRounded as MenuRoundedIcon } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import dayjs from 'dayjs'
import { GetStaticPropsResult } from 'next'
import React, { useState } from 'react'

import { useMyRouter } from '@/router'
import AppBarHomeButton from '@/shell/AppBarHomeButton'
import AppPage from '@/shell/AppPage'
import Discussion from '@/shell/Discussion'
import { StaticPathsResponse, StaticPath } from '@/type'
import Logger from '@/utils/logger'
import { kebab2camel, camel2kebab } from '@/utils/string'

import * as postsData from './data/index'
import ArticleDisplay from './parts/ArticleDisplay'
import BlogTags from './parts/BlogTags'
import Catalogue from './parts/Catalogue'
import styles from './Post.module.scss'
import theme from './theme'
import { Article } from './type'

interface PostProps {
  postId: string
}

const Post = (props: PostProps): JSX.Element => {
  const { postId: postIdFromProps } = props
  const router = useMyRouter()

  const [catalogueSideVisible, setCatalogueSideVisible] = useState(false)

  // TODO: 这里的query好像还有点问题
  const query = router.getQuery<PostProps>()
  const postId = postIdFromProps || query.postId

  Logger.myRouter.log('postPageLoaded', {
    postIdFromProps,
    postIdFromQuery: query.postId,
  })

  // TODO: blog的404页面

  // eslint-disable-next-line import/namespace
  const PostContent: Article = (
    postsData as unknown as Record<string, Article>
  )[kebab2camel(postId)]

  const outdatedDays = dayjs().diff(dayjs(PostContent.updatedAt), 'day')

  const handleTapMenu = (): void => {
    setCatalogueSideVisible(true)
  }

  return (
    <AppPage title={PostContent.title} theme={theme}>
      <main className={styles.post}>
        <AppBar color='transparent' position='static'>
          <Toolbar className={styles.toolbar}>
            <AppBarHomeButton inverse />
            <Typography
              className={styles.blogName}
              component='h1'
              variant='h6'
              color='primary'
            >
              {PostContent.title}
            </Typography>
            <IconButton className={styles.menuButtonLandscape} color='primary'>
              <MenuRoundedIcon />
            </IconButton>

            <IconButton
              className={styles.menuButtonPortrait}
              color='primary'
              onClick={handleTapMenu}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={styles.main}>
          <div className={styles.leftSide}>
            <BlogTags tags={PostContent.tags} />
            {outdatedDays > 180 && (
              <Alert
                className={styles.outdatedAlert}
                variant='filled'
                severity='warning'
              >
                本文最后更新于{outdatedDays}
                天前，其中所描述的信息可能已发生改变，请谨慎参考。
              </Alert>
            )}
            <Typography
              component='p'
              variant='subtitle1'
              color='textSecondary'
              gutterBottom
            >
              {PostContent.introduction}
            </Typography>
            <ArticleDisplay markdown={PostContent.content} />
            <Discussion title={PostContent.title} />
          </div>
          <div className={styles.rightSide}>
            <Catalogue toc={PostContent.toc} />
          </div>
          <Drawer
            anchor='right'
            open={catalogueSideVisible}
            onClose={() => setCatalogueSideVisible(false)}
          >
            <div className={styles.drawerCatalogueContainer}>
              <Catalogue
                toc={PostContent.toc}
                onItemClick={() => {
                  setCatalogueSideVisible(false)
                }}
              />
            </div>
          </Drawer>
        </div>
      </main>
    </AppPage>
  )
}

export default Post

export function getStaticPaths(): StaticPathsResponse<PostProps> {
  return {
    paths: Object.keys(postsData).map(item => ({
      params: {
        postId: camel2kebab(item),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = (
  options: StaticPath<PostProps>,
): GetStaticPropsResult<PostProps> => ({ props: options.params })
