import Head from 'next/head'
import React from 'react'

import styles from './AppPage.module.scss'

interface AppPageProps {
  title: string
  children: JSX.Element
}

const AppPage = ({ title, children }: AppPageProps): JSX.Element => {
  return (
    <main className={styles.appPage}>
      <Head>
        <title>芹也·{title}</title>
      </Head>
      {children}
    </main>
  )
}

export default AppPage
