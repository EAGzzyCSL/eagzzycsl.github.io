import { Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import LinkRoundedIcon from '@material-ui/icons/LinkRounded'
import React, { ReactNode } from 'react'
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown'

import styles from './ArticleDisplay.module.scss'
import CodeView, { InlineCodeView } from './CodeView'
import ImageView from './ImageView'
import QuoteView from './QuoteView'

interface RendererProps {
  children: ReactNode
}

const RootRenderer = ({ children }: RendererProps): JSX.Element => (
  <Typography component='section' variant='body1'>
    {children}
  </Typography>
)

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
}: {
  children: ReactNode
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
}: {
  alt: string
  src: string
}): JSX.Element => <ImageView src={src} alt={alt} />

interface CodeRenderProps {
  value: string
  language: string
}

const CodeRenderer = ({ value, language }: CodeRenderProps): JSX.Element => (
  <CodeView code={value} language={language} />
)

const InlineCodeRender = ({
  value,
}: Pick<CodeRenderProps, 'value'>): JSX.Element => (
  <InlineCodeView>{value}</InlineCodeView>
)

const BlockquoteRenderer = ({ children }: RendererProps): JSX.Element => (
  <QuoteView>{children}</QuoteView>
)

const LinkRenderer = ({
  href,
  children,
}: {
  href: string
  children: ReactNode
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

const renderers = {
  root: RootRenderer,
  // 段落
  paragraph: ParagraphRenderer,
  // 表格
  table: TableRenderer,
  tableHead: TableHeadRenderer,
  tableBody: TableBodyRenderer,
  tableRow: TableRowRenderer,
  tableCell: TableCellRenderer,
  // 列表
  list: ListRenderer,
  listItem: ListItemRenderer,
  // 图片
  image: ImageRenderer,
  // 代码
  code: CodeRenderer,
  inlineCode: InlineCodeRender,
  // 引用
  blockquote: BlockquoteRenderer,
  // 链接
  link: LinkRenderer,
  // 强调
  emphasis: EmphasisRenderer,
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

const createRenderer = (): ReactMarkdownProps['renderers'] => {
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
    const headingText = (children as JSX.Element[])[0].props.value

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
    heading: HeadingRenderer,
  }
}

const ArticleDisplay = ({ markdown }: { markdown: string }): JSX.Element => (
  <article className={styles.articleDisplay}>
    <ReactMarkdown
      escapeHtml={false}
      source={markdown}
      renderers={createRenderer()}
    />
  </article>
)

export default ArticleDisplay
