import { GetStaticPropsResult } from 'next'
import React from 'react'

import AppPage from '@/shell/AppPage'
import sitemap from '@/sitemap'

import styles from './Launcher.module.scss'
import Desktop from './parts/Desktop'

const Launcher = (): JSX.Element => {
  return (
    <AppPage title='首页'>
      <section className={styles.launcher}>
        <Desktop apps={sitemap} />
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
