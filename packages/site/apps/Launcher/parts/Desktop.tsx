import React from 'react'

import { AppDescribe } from '@/types/app'

import AppEntry from './AppEntry'
import styles from './Desktop.module.scss'
import SearchBar from './SearchBar'

export const jointGoogleSearchUrl = (keyword: string): string =>
  `https://www.google.com/search?q=${encodeURIComponent(keyword)}`
interface DesktopInterface {
  apps: AppDescribe[]
}

const Desktop = ({ apps }: DesktopInterface): JSX.Element => {
  const handleSearch = (keyword: string): void => {
    window.open(jointGoogleSearchUrl(`${keyword} site:eagzzycsl.github.io`))
  }

  return (
    <section className={styles.desktop}>
      <div className={styles.top}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles.main}>
        <div className={styles.widgetArea} />
        <div className={styles.entryArea}>
          {apps.map(app => (
            <AppEntry app={app} key={app.appId} />
          ))}
        </div>
      </div>
    </section>
  )
}
export default Desktop
