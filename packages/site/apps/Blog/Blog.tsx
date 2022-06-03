import React, { useState } from 'react'

import {
  KeyboardArrowLeftRounded as KeyboardArrowLeftRoundedIcon,
  KeyboardArrowRightRounded as KeyboardArrowRightRoundedIcon,
  SearchRounded as SearchRoundedIcon,
} from '@mui/icons-material'
import {
  Box,
  Fab,
  Tab,
  Tabs,
  Typography,
  Zoom,
  Pagination,
} from '@mui/material'
import cx from 'classnames'
import { observer } from 'mobx-react-lite'
import { GetStaticPropsResult } from 'next'

import AppPage from '@/shell/AppPage'
import SimpleAppBar from '@/shell/SimpleAppBar'

import styles from './Blog.module.scss'
import _exportedPosts from './data/index'
import BlogBrief from './parts/BlogBrief'
import useStore from './store'
import theme from './theme'
import { Article } from './type'

const dataOfPosts = _exportedPosts.sort((pa, pb) => {
  if (pa.createdAt > pb.createdAt) {
    return -1
  }
  if (pa.createdAt < pb.createdAt) {
    return 1
  }
  return 0
})

const PAGE_SIZE = 5

interface BlogProps {
  posts?: Article[]
}

const Blog = ({ posts = dataOfPosts }: BlogProps): JSX.Element => {
  const store = useStore()

  const [currentPage, setCurrentPage] = useState(1)

  const handleTapPage = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ): void => {
    setCurrentPage(page)
  }

  const postsOfThisPage = posts.slice(
    PAGE_SIZE * (currentPage - 1),
    PAGE_SIZE * currentPage,
  )

  return (
    <AppPage title='芹也集' theme={theme} fullHeight>
      <section
        className={cx(styles.blog, {
          [styles.focusOnLeft]: store.focusOnLeft,
        })}
      >
        <Box className={styles.leftSide}>
          {/* TODO: 实现搜索功能 */}
          <SimpleAppBar
            inverse
            hideMenuIcon
            extraIcons={[
              {
                visible: 'always',
                component: <SearchRoundedIcon />,
                tooltip: '搜索',
              },
            ]}
          />
          <Box className={styles.content}>
            <Box>
              <Typography
                component='h1'
                variant='h2'
                color='textPrimary'
                gutterBottom
                align='center'
              >
                芹也集
              </Typography>
              <Typography component='p' variant='overline' color='secondary'>
                总归要随便写写不枉曾孳孳矻矻
              </Typography>
              <Typography component='p' variant='overline' color='secondary'>
                也就是瞎胡叨叨惟只有马马虎虎
              </Typography>
            </Box>
            {/* TODO: 实现标签与归档查看 */}
            <Tabs
              orientation='vertical'
              value={0}
              textColor='primary'
              indicatorColor='primary'
            >
              <Tab label='首页' />
              <Tab label='标签' />
              <Tab label='归档' />
            </Tabs>
          </Box>
        </Box>
        <Box className={styles.rightSide}>
          <div className={styles.briefList}>
            {postsOfThisPage.map(post => (
              <BlogBrief
                postPath={post.path}
                introduction={post.introduction}
                key={post.path}
                title={post.title}
                updatedAt={post.updatedAt}
                tags={post.tags}
              />
            ))}
          </div>
          <Pagination
            showFirstButton
            showLastButton
            count={Math.ceil(posts.length / PAGE_SIZE)}
            color='primary'
            onChange={handleTapPage}
          />
        </Box>
        <Zoom in={!store.focusOnLeft}>
          <Fab
            color='primary'
            className={cx(styles.switchFab, styles.left)}
            onClick={() => store.enableFocusOnLeft()}
          >
            <KeyboardArrowLeftRoundedIcon />
          </Fab>
        </Zoom>
        <Zoom in={store.focusOnLeft}>
          <Fab
            color='primary'
            className={cx(styles.switchFab, styles.right)}
            onClick={() => store.disableFocusOnLeft()}
          >
            <KeyboardArrowRightRoundedIcon />
          </Fab>
        </Zoom>
      </section>
    </AppPage>
  )
}

Blog.defaultProps = {
  posts: dataOfPosts,
}

export default observer(Blog)

export const getStaticProps = (): GetStaticPropsResult<BlogProps> => ({
  props: {
    posts: dataOfPosts,
  },
})

// TODO: 真正实现数据的独立fetch
