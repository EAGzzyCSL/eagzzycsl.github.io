import React, { useMemo, useState } from 'react'

import cx from 'classnames'

import globalAcknowledgementItems from '@/constants/globalAcknowledge'
import { useMyRouter } from '@/router'
import sitemap from '@/sitemap'
import {
  LaunchRoundedIcon,
  CloseRoundedIcon,
  MinimizeRoundedIcon,
} from '@/ui/icons'
import { Paper, IconButton, Tooltip, Button, Typography } from '@/ui/material'
import Logger from '@/utils/logger'

import styles from './CornerFooter.module.scss'
import AckChip from './parts/AckChip'

interface ISimpleAcknowledge {
  image: string
  url: string
  label: string
}

const CornerFooter = (): JSX.Element => {
  const router = useMyRouter()

  const acknowledgements = useMemo<
    ISimpleAcknowledge[]
  >((): ISimpleAcknowledge[] => {
    const app = sitemap.appMap[router.getAppName()]

    const appAcknowledgements = app.acknowledgements
    return [
      ...globalAcknowledgementItems.map(item => ({
        image: item.image ?? '',
        url: item.url ?? '',
        label: item.title,
      })),
      ...(appAcknowledgements ?? [])
        .filter(item => item.type !== 'icon8-icon')
        .map(item => ({
          image: item.image ?? '',
          url: item.url ?? '',
          label: item.title,
        })),
    ]
  }, [router])

  const [visibleState, setVisibleState] = useState<
    'hidden' | 'corner' | 'fullVisible'
  >('corner')

  const [footerExpand, setFooterExpand] = useState(false)

  const handleFullVisibleClick = (): void => {
    setVisibleState('fullVisible')
    requestAnimationFrame(() => {
      setFooterExpand(true)
    })
  }

  const handleCloseClick = (): void => {
    setVisibleState('hidden')
  }

  const handleMinimizeClick = (): void => {
    setFooterExpand(false)
    setTimeout(() => {
      setVisibleState('corner')
    }, 400)
  }

  // eslint-disable-next-line no-nested-ternary
  return visibleState === 'fullVisible' ? (
    <section
      className={cx(styles.footer, {
        [styles.expand]: footerExpand,
      })}
    >
      <div className={styles.content}>
        <div className={styles.acknowledge}>
          <Typography variant='h6' color='text.secondary' gutterBottom>
            版权与致谢
          </Typography>
          <div className={styles.list}>
            {acknowledgements.map((item, key) => (
              <AckChip
                // eslint-disable-next-line react/no-array-index-key
                key={key}
                icon={item.image}
                label={item.label}
                url={item.url}
              />
            ))}
          </div>
        </div>
        <div className={styles.about}>
          <Button
            variant='text'
            color='inherit'
            onClick={() => {
              router.push('Acknowledgements', '/').catch(e => {
                Logger.myRouter.error('跳转失败', e)
              })
            }}
          >
            全部致谢
          </Button>
          <Button
            variant='text'
            color='inherit'
            onClick={() => {
              router.push('Launcher', '/').catch(e => {
                Logger.myRouter.error('跳转失败', e)
              })
            }}
          >
            回首页
          </Button>
          <Button
            variant='text'
            color='inherit'
            onClick={() => {
              router.push('About', '/').catch(e => {
                Logger.myRouter.error('跳转失败', e)
              })
            }}
          >
            关于
          </Button>
        </div>
      </div>

      <div className={styles.controllers}>
        <Tooltip title='关闭页脚，可通过刷新页面再次找到入口'>
          <IconButton size='small' color='inherit' onClick={handleCloseClick}>
            <CloseRoundedIcon fontSize='small' color='inherit' />
          </IconButton>
        </Tooltip>
        <Tooltip title='收起页脚，可通过页面左下角再次展开'>
          <IconButton
            size='small'
            color='inherit'
            onClick={handleMinimizeClick}
          >
            <MinimizeRoundedIcon fontSize='small' color='inherit' />
          </IconButton>
        </Tooltip>
      </div>
    </section>
  ) : (
    <Paper
      className={cx(styles.cornerFooter, {
        [styles.hidden]: visibleState === 'hidden',
      })}
      elevation={3}
    >
      <IconButton
        size='small'
        className={styles.expandButton}
        onClick={handleFullVisibleClick}
      >
        <LaunchRoundedIcon />
      </IconButton>
    </Paper>
  )
}

export default CornerFooter
