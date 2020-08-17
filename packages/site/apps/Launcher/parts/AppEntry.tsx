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
    <div onClick={handleNav}>
      <div className={styles.appEntry}>
        <img className={styles.icon} src={app.icon} />
        <span className={styles.title}>{app.title}</span>
      </div>
    </div>
  )
}

export default AppEntry
