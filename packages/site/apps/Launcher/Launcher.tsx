import { observer } from 'mobx-react-lite'
import { GetStaticPropsResult } from 'next'
import React from 'react'

import useStore from '@/hooks/useStore'
import AppPage from '@/shell/AppPage'
import sitemap from '@/sitemap'
import { preLoadImages, sleep } from '@/utils'

import Wallpaper from './assets/wallpaper.svg'
import styles from './Launcher.module.scss'
import ActionBar from './parts/ActionBar'
import BootLoading from './parts/BootLoading'
import Desktop from './parts/Desktop'
import LockScreen from './parts/LockScreen'
import StatusBar from './parts/StatusBar'

const imagesShouldPreLoad = [Wallpaper, ...sitemap.map(item => item.icon)]

const Launcher = (): JSX.Element => {
  const store = useStore()

  const handleUnlockScreen = (): void => {
    store.shellStore.unlockScreen()
  }

  if (!store.shellStore.desktopImagePreLoaded) {
    // 只在browser端执行预加载，避免ssr问题
    if (typeof window !== 'undefined') {
      // 避免loading一闪而过太突兀，至少让loading跑到触及右边（动画时间的4/5）
      Promise.all([
        preLoadImages(imagesShouldPreLoad, 1500),
        sleep(400),
      ]).finally(() => {
        store.shellStore.markDesktopImageLoaded()
      })
    }
  }
  return (
    <AppPage title='首页'>
      {!store.shellStore.desktopImagePreLoaded ? (
        <BootLoading />
      ) : (
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
      )}
    </AppPage>
  )
}

export default observer(Launcher)

export const getStaticProps = (): GetStaticPropsResult<unknown> => ({
  props: {},
})
