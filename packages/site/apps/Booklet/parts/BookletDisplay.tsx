import React, { ReactNode } from 'react'

import ReactMarkdown, { Components } from 'react-markdown'
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

import { LinkRoundedIcon } from '@/ui/icons'
import { Typography, Link } from '@/ui/material'
import Logger from '@/utils/logger'

import styles from './BookletDisplay.module.scss'

interface InvalidRendererProps {
  children: ReactNode
}

// 理论上不会出现的元素
const InvalidRenderer = ({
  children,
}: ReactMarkdownProps | InvalidRendererProps): JSX.Element => {
  Logger.bookletFull.error('booklet渲染出错', '出现了不应该出现的元素')
  return <div className={styles.invalidElement}>{children}</div>
}

// 空Render
// eslint-disable-next-line react/jsx-no-useless-fragment
const NullRenderer = (): JSX.Element => <></>

/**
 * 用列表来渲染注释
 */
const AnnotationRenderer = ({
  children,
  ordered,
}: ReactMarkdownProps & {
  ordered: boolean
}): JSX.Element => (
  <Typography
    className={styles.annotationView}
    component={ordered ? 'ol' : 'ul'}
  >
    {children}
  </Typography>
)

const ListItemRenderer = ({ children }: ReactMarkdownProps): JSX.Element => (
  <Typography component='li' color='text.secondary' variant='body2'>
    {children}
  </Typography>
)

/**
 * 用代码来渲染原文
 */
interface OriginalRendererProps {
  children: ReactNode
  inline?: boolean
}

const OriginalRenderer = ({
  children,
  inline,
}: OriginalRendererProps): JSX.Element =>
  inline ? (
    <InvalidRenderer>{children}</InvalidRenderer>
  ) : (
    <Typography
      component='section'
      variant='body1'
      className={styles.originalView}
    >
      {String(children)}
    </Typography>
  )

OriginalRenderer.defaultProps = {
  inline: false,
}

/**
 * 用引用来渲染评注
 */
const CommentRenderer = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => (
  <Typography
    component='section'
    className={styles.commentView}
    color='text.secondary'
    variant='subtitle2'
  >
    {children}
  </Typography>
)

const ParagraphRenderer = ({ children }: ReactMarkdownProps): JSX.Element => (
  <p>{children}</p>
)

const LinkRenderer = ({
  children,
  href,
}: ReactMarkdownProps & {
  href?: string
}): JSX.Element => (
  <Link
    className={styles.link}
    href={href}
    underline='hover'
    variant='inherit'
    rel='noreferrer'
    target='_blank'
    color='secondary'
  >
    {children}
  </Link>
)

LinkRenderer.defaultProps = {
  href: '',
}

interface HeadingType {
  level: number
  children: ReactNode
}

const AnchorSymbol = ({ id }: { id: string }): JSX.Element => (
  <div className={styles.anchorSymbol}>
    <div id={id} className={styles.anchor} />
    <Typography
      id={id}
      href={`#${id}`}
      component='a'
      color='inherit'
      className={styles.anchorIcon}
    >
      <LinkRoundedIcon />
    </Typography>
  </div>
)

const HeadingRenderer = ({ children, level }: HeadingType): JSX.Element => {
  const h = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  const variant = `h${Math.min(level, 4) + 2}` as 'h3' | 'h4' | 'h5' | 'h6'

  const headingText = String(children)

  return (
    <Typography
      className={styles.heading}
      component={h}
      variant={variant}
      color='primary'
      gutterBottom
    >
      <AnchorSymbol id={headingText} />
      {children}
    </Typography>
  )
}

/**
 * 类型参考：https://github.com/remarkjs/react-markdown#appendix-b-components
 */
const createRenderer = (originalOnly: boolean): Components => ({
  // 段落
  p: ParagraphRenderer,
  // 表格
  table: InvalidRenderer,
  thead: InvalidRenderer,
  tbody: InvalidRenderer,
  tr: InvalidRenderer,
  th: InvalidRenderer,
  td: InvalidRenderer,
  // 列表
  ol: InvalidRenderer,
  ul: originalOnly ? NullRenderer : AnnotationRenderer,
  li: ListItemRenderer,
  // 图片
  img: InvalidRenderer,
  // 代码
  code: OriginalRenderer,
  // 引用
  blockquote: originalOnly ? NullRenderer : CommentRenderer,
  // 链接
  a: LinkRenderer,
  // 强调
  em: InvalidRenderer,
  strong: InvalidRenderer,
  // 标题
  h1: HeadingRenderer,
  h2: HeadingRenderer,
  h3: HeadingRenderer,
  h4: HeadingRenderer,
  h5: HeadingRenderer,
  h6: HeadingRenderer,
})

interface BookletDisplayProps {
  markdown: string
  originalOnly: boolean
}

const BookletDisplay = ({
  markdown,
  originalOnly,
}: BookletDisplayProps): JSX.Element => (
  <article className={styles.bookletDisplay}>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={createRenderer(originalOnly)}
    >
      {markdown}
    </ReactMarkdown>
  </article>
)

export default BookletDisplay
