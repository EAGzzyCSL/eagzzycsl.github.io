import type { JSX as ReactJSX } from 'react'

// react-markdown 8 的类型仍使用全局 JSX；升级 Markdown 后移除此兼容声明。
declare global {
  namespace JSX {
    type IntrinsicElements = ReactJSX.IntrinsicElements
  }
}
