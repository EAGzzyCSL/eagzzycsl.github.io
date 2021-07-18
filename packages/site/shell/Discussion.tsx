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

const isDev = process.env.NODE_ENV === 'development'

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
      {isDev ? (
        <div className={styles.discussionDev}>
          development 模式下 disqus 不加载以避免网络错误
        </div>
      ) : (
        <DiscussionEmbed
          shortname='eagzzycsl'
          config={{
            url: `${SITE_URL}${router.asPath}`,
            identifier: router.asPath,
            title,
          }}
        />
      )}
    </div>
  )
}

Discussion.defaultProps = {
  sidesMargin: false,
}
export default Discussion
