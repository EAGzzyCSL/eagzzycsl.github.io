import React from 'react'

import cx from 'classnames'
import { DiscussionEmbed } from 'disqus-react'
import { useRouter } from 'next/router'

import { SITE_URL } from '@/constants'
import Logger from '@/utils/logger'

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

  const routerPath = router.asPath.split('#')[0]

  Logger.discussion.log('discussion.identifier', routerPath)

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
            url: `${SITE_URL}${routerPath}`,
            identifier: routerPath,
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
