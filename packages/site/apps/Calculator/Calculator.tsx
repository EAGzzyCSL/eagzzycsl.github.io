import React from 'react'

import { GetStaticPropsResult } from 'next'
import dynamic from 'next/dynamic'

import { useHashChange } from '@/hooks'
import AppBarTabs from '@/shell/AppBarTabs'
import AppPage from '@/shell/AppPage'
import SimpleAppBar from '@/shell/SimpleAppBar'
import { getHashContent } from '@/utils'

import styles from './Calculator.module.scss'
import FunctionBMI from './panels/BMI'
import FunctionDPI from './panels/DPI'
import theme from './theme'

const panels = [
  {
    id: 'dpi',
    title: 'DPI',
    component: FunctionDPI,
  },
  {
    id: 'bmi',
    title: 'BMI',
    component: FunctionBMI,
  },
]

const getPanelIndexFromHash = (): number => {
  const panelId = getHashContent()
  const matchedIndx = panels.findIndex(panel => panel.id === panelId)
  return matchedIndx >= 0 ? matchedIndx : 0
}

const Calculator = (): JSX.Element => {
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
    <AppPage title='计算器' theme={theme} fullHeight>
      <section className={styles.calculator}>
        <SimpleAppBar inverse title='计算器'>
          <AppBarTabs
            tabs={panels}
            activeTabIndex={activeTabIndex}
            handleSwitchTab={handleSwitchTab}
          />
        </SimpleAppBar>
        <div className={styles.panel}>
          {/* FIXME: 需要保留面板状态 */}
          <ActivePanel />
        </div>
      </section>
    </AppPage>
  )
}

export default dynamic(() => Promise.resolve(Calculator), {
  ssr: false,
})

export const getStaticProps = (): GetStaticPropsResult<unknown> => ({
  props: {},
})
