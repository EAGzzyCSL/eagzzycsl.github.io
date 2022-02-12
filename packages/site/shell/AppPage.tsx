import { cyan as colorCyan, red as colorRed } from '@mui/material/colors'
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles'
import cx from 'classnames'
import Head from 'next/head'
import React from 'react'

import styles from './AppPage.module.scss'

interface AppPageProps {
  title: string
  theme?: Theme
  fullHeight?: boolean
  children: JSX.Element
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
  fullHeight,
  theme = defaultTheme,
}: AppPageProps): JSX.Element => (
  <main
    className={cx(styles.appPage, {
      [styles.fullHeight]: fullHeight,
    })}
  >
    <Head>
      <title>芹也·{title}</title>
    </Head>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </main>
)

AppPage.defaultProps = {
  theme: defaultTheme,
  fullHeight: false,
}

export default AppPage
