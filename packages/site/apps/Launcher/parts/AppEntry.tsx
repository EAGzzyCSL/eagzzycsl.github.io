import React from 'react'

import { useMyRouter } from '@/router'
import { AppDescribe } from '@/types/app'
import { Typography, Paper, ButtonBase } from '@/ui/material'

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
    <div className={styles.appEntry}>
      <Paper className={styles.iconWrapper} elevation={3}>
        <ButtonBase
          className={styles.buttonBase}
          sx={{
            backgroundImage: `url(${app.icon})`,
          }}
          onClick={handleNav}
        />
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
