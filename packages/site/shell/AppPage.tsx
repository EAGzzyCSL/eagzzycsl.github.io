import colorCyan from '@material-ui/core/colors/cyan'
import colorRed from '@material-ui/core/colors/red'
import { createMuiTheme, Theme, ThemeProvider } from '@material-ui/core/styles'
import Head from 'next/head'
import React from 'react'

import styles from './AppPage.module.scss'

interface AppPageProps {
  title: string
  theme?: Theme
  children: JSX.Element
}

export const defaultTheme = createMuiTheme({
  palette: {
    type: 'light',
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
  theme = defaultTheme,
}: AppPageProps): JSX.Element => {
  return (
    <main className={styles.appPage}>
      <Head>
        <title>芹也·{title}</title>
      </Head>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </main>
  )
}

AppPage.defaultProps = {
  theme: defaultTheme,
}

export default AppPage
