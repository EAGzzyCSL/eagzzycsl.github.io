import { GitHub as GitHubIcon } from '@mui/icons-material'
import { Link, Typography } from '@mui/material'
import { pink as colorPink } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { GetStaticPropsResult } from 'next'
import React, { ReactNode } from 'react'

import AppPage from '@/shell/AppPage'
import SimpleAppBar from '@/shell/SimpleAppBar'

import styles from './Acknowledgements.module.scss'
import dataOfResources from './data'
import BasicDisplayCard from './parts/BasicDisplayCard'
import IconDisplayCard from './parts/IconDisplayCard'
import PictorialDisplayCard from './parts/PictorialDisplayCard'
import { DisplayData, PictorialDisplayItem } from './type'

const theme = createTheme({
  palette: {
    primary: {
      main: colorPink[500],
    },
  },
})

const Block = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}): JSX.Element => (
  <div className={styles.block}>
    <Typography component='h1' variant='h4' gutterBottom>
      <Typography component='span' color='primary' variant='inherit'>
        #
      </Typography>{' '}
      {title}
    </Typography>
    <div className={styles.itemList}>{children}</div>
  </div>
)

interface AcknowledgementsProps {
  resources?: DisplayData
}

const Acknowledgements = ({
  resources = dataOfResources,
}: AcknowledgementsProps): JSX.Element => (
  <AppPage title='版权与致谢' theme={theme}>
    <section className={styles.acknowledgements}>
      <SimpleAppBar title='版权与致谢' sticky />
      <div className={styles.declare}>
        <Typography
          component='h2'
          variant='h6'
          gutterBottom
          color='primary'
          align='center'
        >
          本站受益于以下开源项目与免费图片，特此表示感谢并作版权声明。
        </Typography>
        <Typography
          component='h3'
          variant='subtitle2'
          gutterBottom
          color='textSecondary'
          align='center'
        >
          为避免名单冗长，部分非常知名已成为js生态重要组成的项目并未在此列出，如eslint、react等。更多可查看package.json。
        </Typography>
      </div>
      <div className={styles.main}>
        <Block title='开源项目'>
          {resources.projects.map(item =>
            item.image ? (
              // eslint-disable-next-line react/no-array-index-key
              <PictorialDisplayCard
                key={item.title}
                data={item as PictorialDisplayItem}
              />
            ) : (
              // eslint-disable-next-line react/no-array-index-key
              <BasicDisplayCard key={item.title} data={item} />
            ),
          )}
        </Block>
        <Block title='icon'>
          {resources.icons.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <IconDisplayCard key={index} data={item} />
          ))}
        </Block>
        <Block title='图片'>
          {resources.images.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <PictorialDisplayCard key={index} data={item} fill />
          ))}
        </Block>
      </div>
      <div className={styles.bottom}>
        <GitHubIcon color='action' />
        <Link
          className={styles.more}
          color='textSecondary'
          target='_blank'
          rel='noopener'
          underline='hover'
          href='https://github.com/EAGzzyCSL/eagzzycsl.github.io'
        >
          查看更多...
        </Link>
      </div>
    </section>
  </AppPage>
)

Acknowledgements.defaultProps = {
  resources: dataOfResources,
}

export default Acknowledgements

export const getStaticProps =
  (): GetStaticPropsResult<AcknowledgementsProps> => ({
    props: {
      resources: dataOfResources,
    },
  })
