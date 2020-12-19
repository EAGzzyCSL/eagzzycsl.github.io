import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded'
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import Pagination from '@material-ui/lab/Pagination'
import cx from 'classnames'
import { GetStaticPropsResult } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import AppPage from '@/shell/AppPage'
import { camel2kebab } from '@/utils/string'

import styles from './Blog.module.scss'
import * as _exportedPosts from './data/index'
import BlogBrief from './parts/BlogBrief'
import theme from './theme'
import { Article } from './type'

const dataOfPosts = Object.entries(_exportedPosts)
  .map(([path, contents]) => ({
    path: camel2kebab(path),
    ...contents,
  }))
  .sort((pa, pb) => {
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
  const [isFocusOnLeft, setIsFocusOnLeft] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const router = useRouter()

  const handleTapBack = (): void => {
    router.back()
  }
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
    <AppPage title='芹也集' theme={theme}>
      <section
        className={cx(styles.blog, {
          [styles.focusOnLeft]: isFocusOnLeft,
        })}
      >
        <Box className={styles.leftSide}>
          <AppBar elevation={0} position='static' color='transparent'>
            <Toolbar className={styles.toolbar}>
              <IconButton color='primary' onClick={handleTapBack}>
                <ArrowBackRoundedIcon />
              </IconButton>
              {/* TODO: 实现搜索功能 */}
              <IconButton color='primary'>
                <SearchRoundedIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
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
        <Zoom in={!isFocusOnLeft}>
          <Fab
            color='primary'
            className={cx(styles.switchFab, styles.left)}
            onClick={() => setIsFocusOnLeft(true)}
          >
            <KeyboardArrowLeftRoundedIcon />
          </Fab>
        </Zoom>
        <Zoom in={isFocusOnLeft}>
          <Fab
            color='primary'
            className={cx(styles.switchFab, styles.right)}
            onClick={() => setIsFocusOnLeft(false)}
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

export default Blog

export const getStaticProps = (): GetStaticPropsResult<BlogProps> => ({
  props: {
    posts: dataOfPosts,
  },
})

// TODO: 真正实现数据的独立fetch
