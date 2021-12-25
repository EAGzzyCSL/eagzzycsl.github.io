import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

import { AppDescribe } from '@/types/app'

import AppEntry from './AppEntry'
import styles from './Desktop.module.scss'
import DesktopTable from './DesktopTable'
import SearchBar from './SearchBar'

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
            <Card className={styles.widgetCard}>
              <CardContent>
                <Typography variant='h4' color='primary' gutterBottom>
                  摊破浣溪沙
                </Typography>
                <Typography gutterBottom variant='subtitle2'>
                  李璟
                </Typography>
                <Typography
                  variant='body1'
                  component='p'
                  color='textSecondary'
                  gutterBottom
                >
                  手卷真珠上玉钩，依前春恨锁重楼。
                </Typography>
                <Typography
                  variant='body1'
                  component='p'
                  color='textSecondary'
                  gutterBottom
                >
                  风里落花谁是主？思悠悠。
                </Typography>
                <Typography
                  variant='body1'
                  component='p'
                  color='textSecondary'
                  gutterBottom
                >
                  青鸟不传云外信，丁香空结雨中愁。
                </Typography>
                <Typography
                  variant='body1'
                  component='p'
                  color='textSecondary'
                  gutterBottom
                >
                  回首绿波三楚暮，接天流。
                </Typography>
              </CardContent>
            </Card>
          </div>,
        ]}
      />
    </section>
  )
}

export default Desktop
