import { Typography } from '@mui/material'
import React, { ReactNode } from 'react'

import theme from '../theme'

import styles from './QuoteView.module.scss'

const QuoteView = ({ children }: { children: ReactNode }): JSX.Element => (
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

export default QuoteView
