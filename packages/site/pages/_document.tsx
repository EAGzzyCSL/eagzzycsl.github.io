import React from 'react'

import { ServerStyleSheets } from '@mui/styles'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'

export default class MyDocument extends Document {
  /**
   * material-ui针对next.js的SSG优化
   * 参考：https://material-ui.com/zh/styles/advanced/#next-js
   */
  static getInitialProps = async (
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> => {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        // eslint-disable-next-line react/jsx-props-no-spreading, react/display-name
        enhanceApp: App => props => sheets.collect(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    }
  }

  render(): JSX.Element {
    return (
      <Html data-greet='Welcome to inspect!'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
