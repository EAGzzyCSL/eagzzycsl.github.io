import React from 'react'

import cx from 'classnames'
import hljs from 'highlight.js/lib/core'

import { Typography } from '@/ui/material'

import styles from './CodeView.module.scss'
import './highlightConfig'

export interface CodeViewProps {
  children: string
  language?: string
}

const CodeView = ({
  children,
  language = '',
}: CodeViewProps): React.JSX.Element => {
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

export const InlineCodeView = ({
  children,
}: {
  children: string
}): React.JSX.Element => (
  <Typography
    component='code'
    color='secondary'
    className={styles.inlineCodeView}
  >
    {children}
  </Typography>
)

export default CodeView
