import { GetStaticPropsResult } from 'next'
import React from 'react'

import AppPage from '@/shell/AppPage'
import sitemap from '@/sitemap'

import Wallpaper from './assets/wallpaper.svg'
import styles from './Launcher.module.scss'
import ActionBar from './parts/ActionBar'
import Desktop from './parts/Desktop'
import StatusBar from './parts/StatusBar'

const Launcher = (): JSX.Element => {
  return (
    <AppPage title='首页'>
      <section
        style={{
          backgroundImage: `url(${Wallpaper})`,
        }}
        className={styles.launcher}
      >
        <div className={styles.main}>
          <StatusBar />
          <Desktop apps={sitemap} />
          <ActionBar />
        </div>
      </section>
    </AppPage>
  )
}

export default Launcher

export const getStaticProps = (): GetStaticPropsResult<unknown> => {
  return {
    props: {},
  }
}
