import React, { useState, useEffect } from 'react'

import {
  LockOpenRounded as LockOpenRoundedIcon,
  LockRounded as LockRoundedIcon,
  ComputerRounded as ComputerRoundedIcon,
} from '@mui/icons-material'
import { Typography, Slide, IconButton } from '@mui/material'

import AvatarPng from '@/assets/avatar.png'
import { useMyRouter } from '@/router'
import { dayjs } from '@/utils/date'

import notificationManager from '../service/NotificationManager'
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
    return () => {
      document.removeEventListener('keydown', keyDownListener)
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
        icon: <ComputerRoundedIcon fontSize='small' />,
        header: '芹也',
        title: '欢迎访问',
        content: '查看网站介绍',
        onClick: ({ router }) => {
          localStorageManager.setBooleanItem('hasShowWelcomeNotification', true)
          router.push('About', '/')
        },
      })
      setNotifications(notificationManager.getAllNotification())
    }
  }, [])

  return (
    <Slide in={locked} timeout={locked ? 0 : undefined}>
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
