import { ServerStyleSheets } from '@material-ui/core/styles'
import Document, { DocumentContext, DocumentInitialProps } from 'next/document'
import React from 'react'

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
}
