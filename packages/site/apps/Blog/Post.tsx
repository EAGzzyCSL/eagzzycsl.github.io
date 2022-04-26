import React, { useState } from 'react'

import { ViewSidebarRounded as ViewSidebarRoundedIcon } from '@mui/icons-material'
import { Alert, Typography, Drawer } from '@mui/material'
import { GetStaticPropsResult } from 'next'

import { useMyRouter } from '@/router'
import Catalogue from '@/share/Catalogue'
import AppPage from '@/shell/AppPage'
import Discussion from '@/shell/Discussion'
import SimpleAppBar from '@/shell/SimpleAppBar'
import { StaticPathsResponse, StaticPath } from '@/types/app'
import { dayjs } from '@/utils/date'
import Logger from '@/utils/logger'

import _exportedPosts from './data/index'
import ArticleDisplay from './parts/ArticleDisplay'
import BlogTags from './parts/BlogTags'
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
  // 假定一定可以查找到，如果找不到的话ssg也不会产生页面
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const PostContent: Article = _exportedPosts.find(p => p.path === postId)!

  const outdatedDays = dayjs().diff(dayjs(PostContent.updatedAt), 'day')

  const handleTapMenu = (): void => {
    setCatalogueSideVisible(true)
  }

  return (
    <AppPage title={PostContent.title} theme={theme}>
      <main className={styles.post}>
        <SimpleAppBar
          inverse
          sticky
          whiteBg
          title={PostContent.title}
          extraIcons={[
            {
              visible: 'portraitOnly',
              component: <ViewSidebarRoundedIcon />,
              onClick: handleTapMenu,
              tooltip: '显示目录',
            },
          ]}
        />

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
            <div className={styles.catalogueContainer}>
              <Catalogue toc={PostContent.toc} />
            </div>
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
    paths: _exportedPosts.map(item => ({
      params: {
        postId: item.path,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = (
  options: StaticPath<PostProps>,
): GetStaticPropsResult<PostProps> => ({ props: options.params })
