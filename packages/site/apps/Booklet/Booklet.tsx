import React from 'react'

import { GetStaticPropsResult } from 'next'

import { useMyRouter } from '@/router'
import AppPage from '@/shell/AppPage'
import SimpleAppBar from '@/shell/SimpleAppBar'
import Logger from '@/utils/logger'

import styles from './Booklet.module.scss'
import data from './data/index'
import BookletCard from './parts/BookletCard'
import theme from './theme'

const Booklet = (): JSX.Element => {
  const router = useMyRouter()

  const handleNav = (bookletFullPath: string): void => {
    router
      .push('Booklet', '/[bookletId]', {
        pageAs: bookletFullPath,
      })
      .catch(e => {
        Logger.myRouter.error('跳转失败', e)
      })
  }

  return (
    <AppPage title='篇册' theme={theme} fullHeight>
      <section className={styles.booklet}>
        <SimpleAppBar title='篇册' inverse sticky />
        <div className={styles.main}>
          <div className={styles.bookletList}>
            {data.map(b => (
              <div key={b.path} className={styles.bookletCardWrapper}>
                <BookletCard
                  name={b.title}
                  onNav={() => {
                    handleNav(b.path)
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppPage>
  )
}

export default Booklet

export const getStaticProps = (): GetStaticPropsResult<unknown> => ({
  props: {},
})
