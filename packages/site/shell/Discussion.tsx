import cx from 'classnames'
import { DiscussionEmbed } from 'disqus-react'
import { useRouter } from 'next/router'
import React from 'react'

import { SITE_URL } from '@/constants'

import styles from './Discussion.module.scss'

interface DiscussionProps {
  title: string
  sidesMargin?: boolean
}

const Discussion = ({
  title,
  sidesMargin = false,
}: DiscussionProps): JSX.Element => {
  const router = useRouter()
  return (
    <div
      className={cx(styles.discussion, {
        [styles.sidesMargin]: sidesMargin,
      })}
    >
      <DiscussionEmbed
        shortname='eagzzycsl'
        config={{
          url: `${SITE_URL}${router.asPath}`,
          identifier: router.asPath,
          title,
        }}
      />
    </div>
  )
}

Discussion.defaultProps = {
  sidesMargin: false,
}
export default Discussion
