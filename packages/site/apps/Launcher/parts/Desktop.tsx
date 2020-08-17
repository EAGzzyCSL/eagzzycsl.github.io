import React from 'react'

import { AppDescribe } from '@/type'

import AppEntry from './AppEntry'
import styles from './Desktop.module.scss'

interface DesktopInterface {
  apps: AppDescribe[]
}
const Desktop = ({ apps }: DesktopInterface): JSX.Element => {
  return (
    <section className={styles.desktop}>
      {apps.map(app => (
        <AppEntry app={app} key={app.appId} />
      ))}
    </section>
  )
}
export default Desktop
