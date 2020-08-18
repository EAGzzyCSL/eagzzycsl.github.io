import { Typography } from '@material-ui/core'
import React, { ReactNode } from 'react'

import styles from './QuoteView.module.scss'

import theme from '../theme'

const QuoteView = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <Typography
      component='blockquote'
      className={styles.quoteView}
      color='textSecondary'
      style={{
        borderLeft: `solid 4px ${theme.palette.secondary.light}`,
      }}
    >
      {children}
    </Typography>
  )
}

export default QuoteView
