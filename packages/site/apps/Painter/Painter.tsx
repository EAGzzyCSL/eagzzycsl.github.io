import React from 'react'

import { GetStaticPropsResult } from 'next'
import dynamic from 'next/dynamic'

import { useHashChange } from '@/hooks'
import PanelSwitcher from '@/share/PanelSwitcher'
import AppBarTabs from '@/shell/AppBarTabs'
import AppPage from '@/shell/AppPage'
import SimpleAppBar from '@/shell/SimpleAppBar'
import { getHashContent } from '@/utils'

import styles from './Painter.module.scss'
import PanelCampNineSquare from './panels/CampNineSquare'
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
  {
    id: 'camp-nine-square',
    title: '阵营九宫格',
    component: PanelCampNineSquare,
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

  return (
    <AppPage title='出图' theme={theme} fullHeight>
      <section className={styles.painter}>
        <SimpleAppBar inverse title='出图'>
          <AppBarTabs
            tabs={panels}
            activeTabIndex={activeTabIndex}
            handleSwitchTab={handleSwitchTab}
          />
        </SimpleAppBar>
        <div className={styles.panel}>
          <PanelSwitcher panels={panels} selectedPanelIndex={activeTabIndex} />
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
