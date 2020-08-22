import colorPink from '@material-ui/core/colors/pink'
import Link from '@material-ui/core/Link'
import { createMuiTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import GitHubIcon from '@material-ui/icons/GitHub'
import { GetStaticPropsResult } from 'next'
import React, { ReactNode } from 'react'

import AppPage from '@/shell/AppPage'
import SimpleAppBar from '@/shell/SimpleAppBar'

import styles from './Acknowledgements.module.scss'
import dataOfResources, { DisplayData, PictorialDisplayItem } from './data'
import BasicDisplayCard from './parts/BasicDisplayCard'
import PictorialDisplayCard from './parts/PictorialDisplayCard'

const theme = createMuiTheme({
  palette: {
    type: 'light',
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
}): JSX.Element => {
  return (
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
}

interface AcknowledgementsProps {
  resources?: DisplayData
}

const Acknowledgements = ({
  resources = dataOfResources,
}: AcknowledgementsProps): JSX.Element => {
  return (
    <AppPage title='版权与致谢' theme={theme}>
      <section className={styles.acknowledgements}>
        <SimpleAppBar title='版权与致谢' />
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
            {resources.projects.map(item => {
              return item.image ? (
                // eslint-disable-next-line react/no-array-index-key
                <PictorialDisplayCard
                  key={item.title}
                  data={item as PictorialDisplayItem}
                />
              ) : (
                // eslint-disable-next-line react/no-array-index-key
                <BasicDisplayCard key={item.title} data={item} />
              )
            })}
          </Block>
          <Block title='icon'>
            {resources.icons.map((item, index) => {
              // eslint-disable-next-line react/no-array-index-key
              return <PictorialDisplayCard key={index} data={item} landscape />
            })}
          </Block>
          <Block title='图片'>
            {resources.images.map((item, index) => {
              // eslint-disable-next-line react/no-array-index-key
              return <PictorialDisplayCard key={index} data={item} fill />
            })}
          </Block>
        </div>
        <div className={styles.bottom}>
          <GitHubIcon color='action' />
          <Link
            className={styles.more}
            color='textSecondary'
            target='_blank'
            rel='noopener'
            href='https://github.com/EAGzzyCSL/eagzzycsl.github.io'
          >
            查看更多...
          </Link>
        </div>
      </section>
    </AppPage>
  )
}

Acknowledgements.defaultProps = {
  resources: dataOfResources,
}

export default Acknowledgements

export const getStaticProps = (): GetStaticPropsResult<
  AcknowledgementsProps
> => {
  return {
    props: {
      resources: dataOfResources,
    },
  }
}