import React from 'react'

import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <React.StrictMode>
        <Html data-greet='Welcome to inspect!'>
          <Head />
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      </React.StrictMode>
    )
  }
}
