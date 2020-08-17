import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useRouter } from 'next/router'
import React from 'react'

import { AppDescribe } from '@/type'

import styles from './AppEntry.module.scss'

interface AppEntryInterface {
  app: AppDescribe
}

const AppEntry = ({ app }: AppEntryInterface): JSX.Element => {
  const router = useRouter()
  const handleNav = (): void => {
    if (app.root !== '/') {
      router.push(app.root)
    }
  }

  return (
    <div className={styles.appEntry} onClick={handleNav}>
      <Paper className={styles.iconWrapper} elevation={3}>
        <img className={styles.iconImg} src={app.icon} />
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
