import Head from 'next/head'
import React from 'react'
import 'mobx-react-lite/batchingForReactDom'
import './app.scss'

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: typeof React.Component
  pageProps: Record<string, unknown>
}): JSX.Element => {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <title>芹也</title>
      </Head>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
