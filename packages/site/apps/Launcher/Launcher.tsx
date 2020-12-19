import { observer } from 'mobx-react-lite'
import { GetStaticPropsResult } from 'next'
import React from 'react'

import useStore from '@/hooks/useStore'
import AppPage from '@/shell/AppPage'
import sitemap from '@/sitemap'

import Wallpaper from './assets/wallpaper.svg'
import styles from './Launcher.module.scss'
import ActionBar from './parts/ActionBar'
import Desktop from './parts/Desktop'
import LockScreen from './parts/LockScreen'
import StatusBar from './parts/StatusBar'

const Launcher = (): JSX.Element => {
  const store = useStore()

  const handleUnlockScreen = (): void => {
    store.shellStore.unlockScreen()
  }
  return (
    <AppPage title='首页'>
      <section
        style={{
          backgroundImage: `url(${Wallpaper})`,
        }}
        className={styles.launcher}
      >
        <div className={styles.main}>
          <StatusBar />
          <Desktop apps={sitemap} />
          <ActionBar />
        </div>
        <LockScreen
          locked={store.shellStore.isScreenLocked}
          onUnlockScreen={handleUnlockScreen}
        />
      </section>
    </AppPage>
  )
}

export default observer(Launcher)

export const getStaticProps = (): GetStaticPropsResult<unknown> => ({
  props: {},
})
