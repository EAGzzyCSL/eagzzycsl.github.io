import React from 'react'

import { Typography } from '@mui/material'
import { GetStaticPropsResult } from 'next'
import dynamic from 'next/dynamic'

import { useHashChange } from '@/hooks'
import AppBarTabs from '@/shell/AppBarTabs'
import AppPage from '@/shell/AppPage'
import SimpleAppBar from '@/shell/SimpleAppBar'
import { getHashContent } from '@/utils'

import styles from './Painter.module.scss'
import PanelDictionary from './panels/Dictionary'
import PanelImpossibleTrinity from './panels/ImpossibleTrinity'
import PanelWordInWord from './panels/WordInWord'
import theme from './theme'

const panels = [
  {
    id: 'dictionary',
    title: '字典',
    component: PanelDictionary,
  },
  {
    id: 'word-in-word',
    title: '话里有话',
    component: PanelWordInWord,
  },
  {
    id: 'impossible-trinity',
    title: '不可能三角',
    component: PanelImpossibleTrinity,
  },
]

const getPanelIndexFromHash = (): number => {
  const panelId = getHashContent()
  const matchedIndx = panels.findIndex(panel => panel.id === panelId)
  return matchedIndx >= 0 ? matchedIndx : 0
}

const Painter = (): JSX.Element => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(
    getPanelIndexFromHash(),
  )

  // 监听hash变化，实现路由返回时tab随之切换
  useHashChange(() => {
    setActiveTabIndex(getPanelIndexFromHash())
  })

  const handleSwitchTab = (activeTabIndex: number): void => {
    setActiveTabIndex(activeTabIndex)
    document.location.hash = panels[activeTabIndex].id
  }

  const ActivePanel = panels[activeTabIndex].component

  return (
    <AppPage title='出图' theme={theme} fullHeight>
      <section className={styles.painter}>
        <SimpleAppBar
          inverse
          mainContent={
            <div className={styles.appBarContent}>
              <Typography
                component='h1'
                variant='h6'
                color='primary'
                className={styles.title}
              >
                出图
              </Typography>
              <div className={styles.tabs}>
                <AppBarTabs
                  tabs={panels}
                  activeTabIndex={activeTabIndex}
                  handleSwitchTab={handleSwitchTab}
                />
              </div>
            </div>
          }
        />
        <div className={styles.panel}>
          {/* FIXME: 需要保留面板状态 */}
          <ActivePanel />
        </div>
      </section>
    </AppPage>
  )
}

// ssr会导致页面加载时tab不能响应hash
export default dynamic(() => Promise.resolve(Painter), {
  ssr: false,
})

export const getStaticProps = (): GetStaticPropsResult<unknown> => ({
  props: {},
})
