import AppBar from '@material-ui/core/AppBar'
import colorBlue from '@material-ui/core/colors/blue'
import colorDeepOrange from '@material-ui/core/colors/deepOrange'
import colorPink from '@material-ui/core/colors/pink'
import { createMuiTheme } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { GetStaticPropsResult } from 'next'
import React, { useEffect } from 'react'

import AppBarHomeButton from '@/shell/AppBarHomeButton'
import AppPage from '@/shell/AppPage'

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

const theme = createMuiTheme({
  palette: {
    type: 'light',
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
  useEffect(() => {
    const hashListener = (): void => {
      setActiveTabIndex(getPanelIndexFromHash())
    }
    window.addEventListener('hashchange', hashListener)
    return () => {
      window.removeEventListener('hashchange', hashListener)
    }
  }, [])

  const handleSwitchTab = (
    event: React.ChangeEvent<unknown>,
    newValue: number,
  ): void => {
    setActiveTabIndex(newValue)
    document.location.hash = panels[newValue].id
  }

  const ActivePanel = panels[activeTabIndex].component

  return (
    <AppPage title='计算器' theme={theme}>
      <section className={styles.calculator}>
        <AppBar position='static' color='transparent'>
          <Toolbar>
            <AppBarHomeButton inverse />
            <Typography component='h1' variant='h6' color='primary'>
              计算器
            </Typography>
            <div className={styles.tabs}>
              <Tabs
                value={activeTabIndex}
                onChange={handleSwitchTab}
                centered
                indicatorColor='primary'
                textColor='primary'
              >
                {panels.map(item => (
                  <Tab label={item.title} key={item.id} />
                ))}
              </Tabs>
            </div>
          </Toolbar>
        </AppBar>
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
