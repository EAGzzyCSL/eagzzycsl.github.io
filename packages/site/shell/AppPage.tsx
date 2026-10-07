import React from 'react'

import { cyan as colorCyan, red as colorRed } from '@mui/material/colors'
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles'
import cx from 'classnames'
import Head from 'next/head'

import styles from './AppPage.module.scss'
import CornerFooter from './CornerFooter'

interface AppPageProps {
  title: string
  theme?: Theme
  fullHeight?: boolean
  children: React.JSX.Element
  hideCornerFooter?: boolean
}

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: colorCyan[500],
    },
    secondary: {
      main: colorRed[500],
    },
  },
})

const AppPage = ({
  title,
  children,
  fullHeight = false,
  theme = defaultTheme,
  hideCornerFooter = false,
}: AppPageProps): React.JSX.Element => (
  <main
    className={cx(styles.appPage, {
      [styles.fullHeight]: fullHeight,
    })}
  >
    <Head>
      {/* issue：https://github.com/vercel/next.js/discussions/38256 */}
      <title>{`芹也·${title}`}</title>
    </Head>
    <ThemeProvider theme={theme}>
      {children}
      {!hideCornerFooter && <CornerFooter />}
    </ThemeProvider>
  </main>
)

export default AppPage
