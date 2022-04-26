import React, { useState, useEffect } from 'react'

import {
  LockOpenRounded as LockOpenRoundedIcon,
  LockRounded as LockRoundedIcon,
} from '@mui/icons-material'
import { Typography, Avatar, Slide, IconButton } from '@mui/material'

import AvatarPng from '@/assets/avatar.png'
import { dayjs } from '@/utils/date'

import styles from './LockScreen.module.scss'

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

  return (
    <Slide in={locked} timeout={locked ? 0 : undefined}>
      <section className={styles.lockScreen} onWheel={handleScreenWheel}>
        <div className={styles.header}>
          <Avatar alt='avatar' src={AvatarPng} className={styles.avatar} />
        </div>
        <div className={styles.centerClock}>
          <Typography component='h1' variant='h1'>
            {clock.time}
          </Typography>
          <Typography component='h2' variant='h5' gutterBottom>
            {clock.date}
          </Typography>
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
