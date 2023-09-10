import React, { useState, useEffect } from 'react'

import AvatarPng from '@/assets/avatar.png'
import { useMyRouter } from '@/router'
import {
  LockOpenRoundedIcon,
  LockRoundedIcon,
  ComputerRoundedIcon,
} from '@/ui/icons'
import { Typography, Slide, IconButton } from '@/ui/material'
import { dayjs } from '@/utils/date'
import Logger from '@/utils/logger'

import notificationManager, {
  ENotificationId,
} from '../service/NotificationManager'
import { localStorageManager } from '../service/StorageManager'

import styles from './LockScreen.module.scss'
import Notification from './Notification'

interface Clock {
  time: string
  date: string
}

interface LockScreenProps {
  locked: boolean
  onUnlockScreen: () => void
}

const LockScreen = ({
  locked,
  onUnlockScreen,
}: LockScreenProps): JSX.Element => {
  const [clock, setClock] = useState<Clock>({
    time: '',
    date: '',
  })

  const updateClock = (): void => {
    setClock({
      time: dayjs().format('HH:MM'),
      date: dayjs().format('M月 D日 周dd'),
    })
  }

  useEffect(() => {
    updateClock()
    const timer = setInterval(updateClock, 1000 * 60)
    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    const keyDownListener = (event: KeyboardEvent): void => {
      if (event.key === ' ') {
        onUnlockScreen()
      }
      document.removeEventListener('keydown', keyDownListener)
    }

    document.addEventListener('keydown', keyDownListener)

    let yStart = 0
    let enableSwipeUp = false

    const touchStartListener = (event: TouchEvent): void => {
      const firstTouch = event.touches[0]
      // 多点滑动时不触发
      if (event.touches.length > 1) {
        return
      }
      yStart = firstTouch.clientY
      enableSwipeUp = true
    }

    const touchMoveListener = (event: TouchEvent): void => {
      if (enableSwipeUp) {
        const firstTouch = event.touches[0]
        const yNew = firstTouch.clientY
        const diff = yStart - yNew
        if (diff > 60) {
          onUnlockScreen()
        }
      }
    }

    document.addEventListener('touchmove', touchMoveListener)
    document.addEventListener('touchstart', touchStartListener)

    return () => {
      document.removeEventListener('keydown', keyDownListener)
      document.removeEventListener('touchstart', touchStartListener)
      document.removeEventListener('touchmove', touchMoveListener)
    }
  })

  const handleScreenWheel = (event: React.WheelEvent): void => {
    if (event.deltaY > 0) {
      onUnlockScreen()
    }
  }

  const myRouter = useMyRouter()

  const [notifications, setNotifications] = useState(
    notificationManager.getAllNotification(),
  )

  useEffect(() => {
    if (!localStorageManager.getBooleanItem('hasShowWelcomeNotification')) {
      notificationManager.registerNotification({
        id: ENotificationId.welcome,
        icon: <ComputerRoundedIcon fontSize='small' />,
        header: '芹也',
        title: '欢迎访问',
        content: '查看网站介绍',
        onClick: ({ router }) => {
          localStorageManager.setBooleanItem('hasShowWelcomeNotification', true)
          router.push('About', '/').catch(e => {
            Logger.myRouter.error('跳转失败', e)
          })
        },
      })
      setNotifications(notificationManager.getAllNotification())
    }
  }, [])

  return (
    <Slide in={locked} timeout={locked ? 0 : undefined} appear={false}>
      <section className={styles.lockScreen} onWheel={handleScreenWheel}>
        <div className={styles.header}>
          <img src={AvatarPng} className={styles.avatar} draggable='false' />
        </div>
        <div className={styles.centerClock}>
          <Typography component='h1' variant='h1'>
            {clock.time}
          </Typography>
          <Typography component='h2' variant='h5' gutterBottom>
            {clock.date}
          </Typography>
        </div>
        <div className={styles.notifications}>
          {notifications.map(n => (
            <Notification
              key={n.id}
              icon={n.icon}
              header={n.header}
              title={n.title}
              content={n.content}
              onClick={() => {
                notificationManager.unRegisterNotification(n)
                setNotifications(notificationManager.getAllNotification())
                n.onClick({ router: myRouter })
              }}
            />
          ))}
        </div>
        <div className={styles.bottomLock}>
          <IconButton
            className={styles.lockButton}
            onClick={onUnlockScreen}
            size='large'
          >
            {locked ? (
              <LockRoundedIcon fontSize='large' color='inherit' />
            ) : (
              <LockOpenRoundedIcon fontSize='large' />
            )}
          </IconButton>
        </div>
      </section>
    </Slide>
  )
}
export default LockScreen
