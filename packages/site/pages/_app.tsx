import React, { useEffect } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import Head from 'next/head'
import { useRouter } from 'next/router'

import favicon from '@/assets/favicon.png'
import { useMyRouter } from '@/router'

import './app.scss'

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: typeof React.Component
  pageProps: Record<string, unknown>
}): JSX.Element => {
  const router = useRouter()
  const myRouter = useMyRouter()
  useEffect(() => {
    /**
     * 监听路由变化，记录路由加载时history的length，方便做返回按钮
     */
    const handleRouteChange = (url: string): void => {
      // 这里传入的url是带basePath的真实path部分，不带query
      // TODO: 目前这种做法使用path.resolve处理无碍，但使用route反向映射就不行了
      myRouter.recordRouteLoaded(
        url.replace(router.basePath, ''),
        'routeChange',
      )
    }
    router.events.on('routeChangeComplete', handleRouteChange)

    const handleWindowFirstLoad = (): void => {
      myRouter.recordRouteLoaded(router.route, 'windowLoad')
    }
    window.addEventListener('load', handleWindowFirstLoad)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      window.removeEventListener('load', handleWindowFirstLoad)
    }
  })
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <title>芹也</title>
        {/* favicon.icon 用于防止 404，这里用于在手机上展示更清晰的 icon */}
        <link rel='icon' href={favicon} />
      </Head>
      <CssBaseline />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
