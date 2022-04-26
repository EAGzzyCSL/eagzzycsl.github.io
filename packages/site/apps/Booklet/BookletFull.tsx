import React, { useState } from 'react'

import {
  Subject as SubjectIcon,
  ShortText as ShortTextIcon,
  ViewSidebarRounded as ViewSidebarRoundedIcon,
  PrintRounded as PrintRoundedIcon,
} from '@mui/icons-material'
import { Drawer, Typography } from '@mui/material'
import { GetStaticPropsResult } from 'next'

import Catalogue from '@/share/Catalogue'
import AppPage from '@/shell/AppPage'
import Discussion from '@/shell/Discussion'
import SimpleAppBar from '@/shell/SimpleAppBar'
import { StaticPathsResponse, StaticPath } from '@/types/app'

import styles from './BookletFull.module.scss'
import _exportedBooklets from './data'
import BookletDisplay from './parts/BookletDisplay'
import theme from './theme'
import { IBookletItem } from './type'

interface BookletFullProps {
  bookletId: string
}

const BookletFull = (props: BookletFullProps): JSX.Element => {
  const { bookletId } = props

  // 假定一定可以查找到，如果找不到的话ssg也不会产生页面
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const bookletContent: IBookletItem = _exportedBooklets.find(
    b => b.path === bookletId,
  )!

  const [catalogueSideVisible, setCatalogueSideVisible] = useState(false)

  const handleTapMenu = (): void => {
    setCatalogueSideVisible(true)
  }

  const [originalOnly, setOriginalOnly] = useState(false)

  const handleSwitchOriginalOnly = (): void => {
    setOriginalOnly(!originalOnly)
  }

  const handlePrint = (): void => {
    window.print()
  }

  return (
    <AppPage title={bookletId} theme={theme}>
      <section className={styles.bookletFull}>
        <SimpleAppBar
          title={bookletContent.title}
          inverse
          sticky
          whiteBg
          extraIcons={[
            {
              visible: 'always',
              component: <PrintRoundedIcon />,
              tooltip: '打印',
              onClick: handlePrint,
            },
            {
              visible: 'always',
              component: originalOnly ? <SubjectIcon /> : <ShortTextIcon />,
              tooltip: originalOnly ? '显示注释' : '隐藏注释',
              onClick: handleSwitchOriginalOnly,
            },
            {
              visible: bookletContent.showCatalogue ? 'portraitOnly' : 'never',
              component: <ViewSidebarRoundedIcon />,
              tooltip: '显示目录',
              onClick: handleTapMenu,
            },
          ]}
        />
        <div className={styles.main}>
          <div className={styles.leftSide}>
            <BookletDisplay
              markdown={bookletContent.content}
              originalOnly={originalOnly}
            />
            <div className={styles.changelog}>
              <Typography variant='subtitle2' color='text.secondary'>
                最后更新时间：{bookletContent.lastModified}
              </Typography>
            </div>
            <Discussion title={bookletContent.path} />
          </div>
          {bookletContent.showCatalogue && (
            <div className={styles.rightSide}>
              <div className={styles.catalogueContainer}>
                <Catalogue toc={bookletContent.toc} noLevelId />
              </div>
            </div>
          )}

          <Drawer
            anchor='right'
            open={catalogueSideVisible}
            onClose={() => setCatalogueSideVisible(false)}
          >
            <div className={styles.drawerCatalogueContainer}>
              <Catalogue
                toc={bookletContent.toc}
                onItemClick={() => {
                  setCatalogueSideVisible(false)
                }}
                noLevelId
              />
            </div>
          </Drawer>
        </div>
      </section>
    </AppPage>
  )
}

export default BookletFull

export function getStaticPaths(): StaticPathsResponse<BookletFullProps> {
  return {
    paths: _exportedBooklets.map(item => ({
      params: {
        bookletId: item.path,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = (
  options: StaticPath<BookletFullProps>,
): GetStaticPropsResult<BookletFullProps> => ({ props: options.params })
