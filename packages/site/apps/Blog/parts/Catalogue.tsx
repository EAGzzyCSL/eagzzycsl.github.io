import { Link, Typography } from '@material-ui/core'
import React from 'react'

import { Article, NestedTocItem } from '../type'

import styles from './Catalogue.module.scss'

interface CatalogueProps {
  toc: Article['toc']
  onItemClick?: () => void
}

// 递归渲染目录层级
const CatalogueStratum = ({
  nestedToc,
  onItemClick,
  parentIndexPrefix,
}: {
  nestedToc: NestedTocItem[]
  onItemClick?: () => void
  parentIndexPrefix: string
}): JSX.Element => (
  <ol className={styles.list}>
    {nestedToc.map((h, hIndex) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={hIndex} className={styles.listItem}>
        <Link
          color='inherit'
          variant='inherit'
          className={styles.link}
          href={`#${parentIndexPrefix}${hIndex + 1}|${h.title}`}
          onClick={() => {
            // 使用 replaceState 暂时避免前进后退时一直在hash间跳转
            window.history.replaceState(
              null,
              '',
              `#${parentIndexPrefix}${hIndex + 1}|${h.title}`,
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
          />
        )}
      </li>
    ))}
  </ol>
)

CatalogueStratum.defaultProps = {
  onItemClick: () => {},
}

const Catalogue = ({
  toc: { nested },
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
        onItemClick={onItemClick}
      />
    </div>
  </Typography>
)

Catalogue.defaultProps = {
  onItemClick: () => {},
}

export default Catalogue
