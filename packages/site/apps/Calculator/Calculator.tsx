import React from 'react'

import { Typography } from '@mui/material'
import {
  blue as colorBlue,
  deepOrange as colorDeepOrange,
  pink as colorPink,
} from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { GetStaticPropsResult } from 'next'

import { useHashChange } from '@/hooks'
import AppBarTabs from '@/shell/AppBarTabs'
import AppPage from '@/shell/AppPage'
import SimpleAppBar from '@/shell/SimpleAppBar'

import styles from './Calculator.module.scss'
import FunctionBMI from './panels/BMI'
import FunctionDPI from './panels/DPI'

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
  const panelId = process.browser ? document.location.hash.slice(1) : ''
  const matchedIndx = panels.findIndex(panel => panel.id === panelId)
  return matchedIndx >= 0 ? matchedIndx : 0
}

const theme = createTheme({
  palette: {
    primary: {
      main: colorBlue[500],
    },
    secondary: {
      main: colorDeepOrange[500],
    },
    error: {
      main: colorPink[500],
    },
  },
})

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
        <SimpleAppBar
          inverse
          mainContent={
            <div className={styles.appBarContent}>
              <Typography component='h1' variant='h6' color='primary'>
                计算器
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

export default Calculator

export const getStaticProps = (): GetStaticPropsResult<unknown> => ({
  props: {},
})
