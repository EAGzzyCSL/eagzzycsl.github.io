import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import React from 'react'

import styles from './Catalogue.module.scss'

import { Article } from '../type'

interface CatalogueProps {
  toc: Article['toc']
}

const Catalogue = ({ toc: { nested } }: CatalogueProps): JSX.Element => {
  return (
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
        {/* 渲染嵌套的目录，最大层级为三 */}
        <ol className={styles.list}>
          {nested.map((h1, h1Index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={h1Index} className={styles.listItem}>
                <Link
                  color='inherit'
                  variant='inherit'
                  className={styles.link}
                  href={`#${h1Index + 1}|${h1.title}`}
                >
                  {h1.title}
                </Link>
                <ol className={styles.list}>
                  {h1.sub.map((h2, h2Index) => {
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <li key={h2Index} className={styles.listItem}>
                        <Link
                          color='inherit'
                          variant='inherit'
                          className={styles.link}
                          href={`#${h1Index + 1}.${h2Index + 1}|${h2.title}`}
                        >
                          {h2.title}
                        </Link>
                        <ol className={styles.list}>
                          {h2.sub.map((h3, h3Index) => {
                            return (
                              // eslint-disable-next-line react/no-array-index-key
                              <li key={h3Index} className={styles.listItem}>
                                <Link
                                  color='inherit'
                                  variant='inherit'
                                  className={styles.link}
                                  href={`#${h1Index + 1}.${h2Index + 1}.${
                                    h3Index + 1
                                  }|${h3.title}`}
                                >
                                  {h3.title}
                                </Link>
                              </li>
                            )
                          })}
                        </ol>
                      </li>
                    )
                  })}
                </ol>
              </li>
            )
          })}
        </ol>
      </div>
    </Typography>
  )
}

export default Catalogue
