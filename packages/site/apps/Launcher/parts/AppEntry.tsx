import React from 'react'

import { Typography, Paper } from '@mui/material'

import { useMyRouter } from '@/router'
import { AppDescribe } from '@/types/app'

import styles from './AppEntry.module.scss'

interface AppEntryInterface {
  app: AppDescribe
}

const AppEntry = ({ app }: AppEntryInterface): JSX.Element => {
  const router = useMyRouter()
  const handleNav = (): void => {
    router.navToApp(app)
  }

  return (
    <div className={styles.appEntry} onClick={handleNav}>
      <Paper className={styles.iconWrapper} elevation={3}>
        <img className={styles.iconImg} src={app.icon} draggable='false' />
      </Paper>
      <Typography
        className={styles.title}
        component='h1'
        variant='subtitle2'
        align='center'
      >
        {app.title}
      </Typography>
    </div>
  )
}

export default AppEntry
