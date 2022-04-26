import React from 'react'

import { Typography } from '@mui/material'
import cx from 'classnames'
import hljs from 'highlight.js/lib/core'

import styles from './CodeView.module.scss'
import './highlightConfig'

export interface CodeViewProps {
  children: string
  language?: string
}

const CodeView = ({ children, language }: CodeViewProps): JSX.Element => {
  const hlResult = language
    ? hljs.highlight(children, {
        language,
      })
    : hljs.highlightAuto(children)
  return (
    <pre className={styles.codeView}>
      <code
        className={cx('hljs', styles.code)}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: hlResult.value,
        }}
      />
    </pre>
  )
}

CodeView.defaultProps = {
  language: '',
}

export const InlineCodeView = ({
  children,
}: {
  children: string
}): JSX.Element => (
  <Typography
    component='code'
    color='secondary'
    className={styles.inlineCodeView}
  >
    {children}
  </Typography>
)

export default CodeView
