import { Typography } from '@material-ui/core'
import {
  brown as colorBrown,
  pink as colorPink,
} from '@material-ui/core/colors'
import { createTheme } from '@material-ui/core/styles'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab'
import { GetStaticPropsResult } from 'next'
import React from 'react'

import AppPage from '@/shell/AppPage'
import SimpleAppBar from '@/shell/SimpleAppBar'

import styles from './Changelog.module.scss'
import changelogData from './data/index'

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: colorBrown[500],
    },
    secondary: {
      main: colorPink[600],
    },
  },
})

const Changelog = (): JSX.Element => (
  <AppPage title='更新记录' theme={theme}>
    <section className={styles.changelog}>
      <SimpleAppBar title='更新记录' inverse />
      <div className={styles.main}>
        <Timeline align='alternate'>
          {changelogData.map(item => (
            <TimelineItem key={item.date}>
              <TimelineOppositeContent>
                <Typography color='secondary'>{item.date}</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  style={{
                    backgroundColor: item.color,
                  }}
                />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography>{item.content}</Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  </AppPage>
)

export default Changelog

export const getStaticProps = (): GetStaticPropsResult<unknown> => ({
  props: {},
})
