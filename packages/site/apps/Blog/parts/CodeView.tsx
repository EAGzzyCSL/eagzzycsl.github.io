import { Typography } from '@material-ui/core'
import cx from 'classnames'
import hljs from 'highlight.js/lib/core'
import React from 'react'

import './highlightConfig'

import styles from './CodeView.module.scss'

export interface CodeViewProps {
  code: string
  language: string
}

const CodeView = ({ code, language }: CodeViewProps): JSX.Element => {
  const hlResult = language
    ? hljs.highlight(code, {
        language,
      })
    : hljs.highlightAuto(code)
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
