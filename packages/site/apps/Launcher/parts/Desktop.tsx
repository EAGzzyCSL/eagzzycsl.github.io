import React from 'react'

import { AppDescribe } from '@/types/app'

import AppEntry from './AppEntry'
import styles from './Desktop.module.scss'
import DesktopTable from './DesktopTable'
import CalendarCard from './widgets/CalendarCard'
import PoemCard from './widgets/PoemCard'
import SearchBar from './widgets/SearchBar'

export const jointGoogleSearchUrl = (keyword: string): string =>
  `https://www.google.com/search?q=${encodeURIComponent(keyword)}`

interface DesktopProps {
  apps: AppDescribe[]
  currentTableIndex: number
  onTablePrevious: () => void
  onTableNext: () => void
  updateCurrentTableIndex: (index: number) => void
}

const Desktop = (props: DesktopProps): JSX.Element => {
  const {
    apps,
    currentTableIndex,
    updateCurrentTableIndex,
    onTablePrevious,
    onTableNext,
  } = props

  const firstTableApps = apps.filter(app => app.tableIndex === 0)
  const secondTableApps = apps.filter(app => app.tableIndex === 1)

  const handleSearch = (keyword: string): void => {
    window.open(jointGoogleSearchUrl(`${keyword} site:eagzzycsl.github.io`))
  }

  return (
    <section className={styles.desktop}>
      {/* 多桌面支持 */}
      <DesktopTable
        currentTableIndex={currentTableIndex}
        onTablePrevious={onTablePrevious}
        onTableNext={onTableNext}
        updateCurrentTableIndex={updateCurrentTableIndex}
        tables={[
          <div className={styles.tableOne} key='one'>
            <div className={styles.top}>
              <SearchBar onSearch={handleSearch} />
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
