import React from 'react'

import { AppDescribe } from '@/types/app'

import { jointGoogleSearchUrl } from '../utils/index'

import AppEntry from './AppEntry'
import styles from './Desktop.module.scss'
import DesktopTable from './DesktopTable'
import CalendarCard from './widgets/CalendarCard'
import PoemCard from './widgets/PoemCard'
import SearchBar from './widgets/SearchBar'

interface DesktopProps {
  apps: AppDescribe[]
}

const Desktop = (props: DesktopProps): JSX.Element => {
  const { apps } = props

  const firstTableApps = apps.filter(app => app.tableIndex === 0)
  const secondTableApps = apps.filter(app => app.tableIndex === 1)

  const handleSearch = (keyword: string): void => {
    window.open(jointGoogleSearchUrl(`${keyword} site:eagzzycsl.github.io`))
  }

  return (
    <section className={styles.desktop}>
      {/* 多桌面支持 */}
      <DesktopTable
        tables={[
          <div className={styles.tableOne} key='one'>
            <div className={styles.top}>
              <SearchBar onSearch={handleSearch} apps={apps} />
            </div>
            <div className={styles.main}>
              <div className={styles.widgetArea} />
              <div className={styles.entryAreaFirst}>
                {firstTableApps.map(app => (
                  <AppEntry app={app} key={app.appId} />
                ))}
              </div>
            </div>
          </div>,
          <div className={styles.tableTwo} key='two'>
            <div className={styles.entryAreaSecond}>
              {secondTableApps.map(app => (
                <AppEntry app={app} key={app.appId} />
              ))}
            </div>
          </div>,
          <div className={styles.tableThree} key='three'>
            <PoemCard />
            <CalendarCard />
          </div>,
        ]}
      />
    </section>
  )
}

export default Desktop
