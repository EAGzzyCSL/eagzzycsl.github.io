import {
  Typography,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { LinkRounded as LinkRoundedIcon } from '@material-ui/icons'
import React, { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import { Components, NormalComponent } from 'react-markdown/src/ast-to-react'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

import styles from './ArticleDisplay.module.scss'
import CodeView, { InlineCodeView } from './CodeView'
import ImageView from './ImageView'
import QuoteView from './QuoteView'

interface RendererProps {
  // 规则本身有bug
  // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
  // eslint-disable-next-line react/no-unused-prop-types
  children: ReactNode
}

const ParagraphRenderer = ({ children }: RendererProps): JSX.Element => (
  <Typography className={styles.paragraph} component='p'>
    {children}
  </Typography>
)

const TableRenderer = ({ children }: RendererProps): JSX.Element => (
  <TableContainer className={styles.tableContainer}>
    <Table>{children}</Table>
  </TableContainer>
)

const TableHeadRenderer = ({ children }: RendererProps): JSX.Element => (
  <TableHead>{children}</TableHead>
)

const TableBodyRenderer = ({ children }: RendererProps): JSX.Element => (
  <TableBody>{children}</TableBody>
)

const TableRowRenderer = ({ children }: RendererProps): JSX.Element => (
  <TableRow>{children}</TableRow>
)

const TableCellRenderer = ({ children }: RendererProps): JSX.Element => (
  <TableCell align='center'>{children}</TableCell>
)

const ListRenderer = ({
  children,
  ordered,
}: RendererProps & {
  ordered: number
}): JSX.Element => (
  <Typography className={styles.list} component={ordered ? 'ol' : 'ul'}>
    {children}
  </Typography>
)

const ListItemRenderer = ({ children }: RendererProps): JSX.Element => (
  <Typography component='li'>{children}</Typography>
)

const ImageRenderer = ({
  alt,
  src,
}: RendererProps & {
  alt: string
  src: string
}): JSX.Element => <ImageView src={src} alt={alt} />

interface CodeRenderProps {
  children: ReactNode
  className: string
  inline: boolean
}

const CodeRenderer = ({
  children,
  inline,
  className,
}: CodeRenderProps): JSX.Element =>
  inline ? (
    <InlineCodeView>{String(children)}</InlineCodeView>
  ) : (
    <CodeView language={className}>{String(children)}</CodeView>
  )

const BlockquoteRenderer = ({ children }: RendererProps): JSX.Element => (
  <QuoteView>{children}</QuoteView>
)

const LinkRenderer = ({
  children,
  href,
}: RendererProps & {
  href: string
}): JSX.Element => (
  <Link
    className={styles.link}
    href={href}
    variant='inherit'
    rel='noreferrer'
    target='_blank'
    color='secondary'
  >
    {children}
  </Link>
)

const EmphasisRenderer = ({ children }: RendererProps): JSX.Element => (
  <Typography component='em' color='secondary' className={styles.emphasis}>
    {children}
  </Typography>
)

const StrongRenderer = ({ children }: RendererProps): JSX.Element => (
  <Typography component='strong' color='secondary' className={styles.strong}>
    {children}
  </Typography>
)

/**
 * 类型参考：https://github.com/remarkjs/react-markdown#appendix-b-components
 */
const renderers: Components = {
  // 段落
  p: ParagraphRenderer,
  // 表格
  table: TableRenderer,
  thead: TableHeadRenderer,
  tbody: TableBodyRenderer,
  tr: TableRowRenderer,
  th: TableCellRenderer,
  td: TableCellRenderer,
  // 列表
  ol: ListRenderer as unknown as NormalComponent,
  ul: ListRenderer as unknown as NormalComponent,
  li: ListItemRenderer,
  // 图片
  img: ImageRenderer as unknown as NormalComponent,
  // 代码
  code: CodeRenderer as unknown as NormalComponent,
  // 引用
  blockquote: BlockquoteRenderer,
  // 链接
  a: LinkRenderer as unknown as NormalComponent,
  // 强调
  em: EmphasisRenderer,
  strong: StrongRenderer,
}

const AnchorSymbol = ({
  autoId,
  headingText,
}: {
  autoId: string
  headingText: string
}): JSX.Element => {
  const id = `${autoId}|${headingText}`
  return (
    <Typography
      id={id}
      href={`#${id}`}
      component='a'
      color='inherit'
      className={styles.anchorSymbol}
    >
      <LinkRoundedIcon />
    </Typography>
  )
}

interface HeadingType {
  level: number
  children: ReactNode
}

const createRenderer = (): Components => {
  /**
   * 利用渲染顺序为heading生成1.2.3格式的id用以避免重复
   * 为了简化处理，假定标题层级关系一定正确（没有诸如一级标题下直接出现三级标题的情况）
   * 如果标题层级关系错乱会生成不正确的id
   *
   * 思路：
   * 利用记分牌作为标题index的记录，每当出现一次某级标题，则该标题的索引计数器+1
   * 某级标题计数器+1后，其后所有的子标题计数器都应当重新开始计数（即置0）
   * 为减少运算量，在该级标题计数器为0时子标题计数器也一定为0所以无需重置
   */
  const scoreboard = Array(7).fill(0)
  const HeadingRenderer = ({ children, level }: HeadingType): JSX.Element => {
    if (scoreboard[level] !== 0) {
      scoreboard.fill(0, level + 1)
    }
    scoreboard[level] += 1
    const autoId = scoreboard.filter(Boolean).join('.')

    const component = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    const variant = `h${Math.min(level, 4) + 2}` as 'h3' | 'h4' | 'h5' | 'h6'

    // 获取标题中的文本，假定标题中只有纯文本，不存在em、strong、del等情况
    // 复杂模式可参考：https://github.com/rexxars/react-markdown/issues/69
    const headingText = String(children)

    return (
      <Typography
        className={styles.heading}
        component={component}
        variant={variant}
        color='primary'
        gutterBottom
      >
        <AnchorSymbol autoId={autoId} headingText={headingText} />
        {children}
      </Typography>
    )
  }
  return {
    ...renderers,
    h1: HeadingRenderer,
    h2: HeadingRenderer,
    h3: HeadingRenderer,
    h4: HeadingRenderer,
    h5: HeadingRenderer,
    h6: HeadingRenderer,
  }
}

const ArticleDisplay = ({ markdown }: { markdown: string }): JSX.Element => (
  <article className={styles.articleDisplay}>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={createRenderer()}
    >
      {markdown}
    </ReactMarkdown>
  </article>
)

export default ArticleDisplay
