import type {
  MarkdownArticleModule,
  NestedTocItem,
} from '@mine/markdown-loader'
import { Link, Typography } from '@mui/material'
import React from 'react'

import styles from './Catalogue.module.scss'

interface CatalogueStratumProps {
  nestedToc: NestedTocItem[]
  onItemClick?: () => void
  parentIndexPrefix: string
  noLevelId?: boolean
}

// 递归渲染目录层级
const CatalogueStratum = ({
  nestedToc,
  onItemClick,
  parentIndexPrefix,
  noLevelId,
}: CatalogueStratumProps): JSX.Element => (
  <ol className={styles.list}>
    {nestedToc.map((h, hIndex) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={hIndex} className={styles.listItem}>
        <Link
          color='inherit'
          variant='inherit'
          underline='none'
          className={styles.link}
          href={
            noLevelId
              ? `#${h.title}`
              : `#${parentIndexPrefix}${hIndex + 1}|${h.title}`
          }
          onClick={() => {
            // 使用 replaceState 暂时避免前进后退时一直在hash间跳转
            window.history.replaceState(
              null,
              '',
              noLevelId
                ? `#${h.title}`
                : `#${parentIndexPrefix}${hIndex + 1}|${h.title}`,
            )
            if (onItemClick) {
              onItemClick()
            }
          }}
        >
          {h.title}
        </Link>
        {/* 渲染嵌套目录，最大到三层 */}
        {h.level <= 2 && (
          <CatalogueStratum
            nestedToc={h.sub}
            parentIndexPrefix={`${parentIndexPrefix}${hIndex + 1}.`}
            onItemClick={onItemClick}
            noLevelId={noLevelId}
          />
        )}
      </li>
    ))}
  </ol>
)

CatalogueStratum.defaultProps = {
  onItemClick: () => {},
  noLevelId: false,
}

interface CatalogueProps {
  toc: MarkdownArticleModule['toc']
  onItemClick?: () => void
  noLevelId?: boolean
}

const Catalogue = ({
  toc: { nested },
  noLevelId,
  onItemClick,
}: CatalogueProps): JSX.Element => (
  <Typography
    component='section'
    className={styles.catalogue}
    color='textSecondary'
    variant='subtitle2'
  >
    <Typography
      className={styles.title}
      component='h1'
      color='primary'
      variant='h6'
    >
      目录
    </Typography>
    <div className={styles.content}>
      <CatalogueStratum
        nestedToc={nested}
        parentIndexPrefix=''
        noLevelId={noLevelId}
        onItemClick={onItemClick}
      />
    </div>
  </Typography>
)

Catalogue.defaultProps = {
  noLevelId: false,
  onItemClick: () => {},
}

export default Catalogue
