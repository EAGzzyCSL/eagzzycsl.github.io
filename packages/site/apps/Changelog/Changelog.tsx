import React from 'react'

import Timeline from '@mui/lab/Timeline'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import { Typography } from '@mui/material'
import { brown as colorBrown, pink as colorPink } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { GetStaticPropsResult } from 'next'

import AppPage from '@/shell/AppPage'
import SimpleAppBar from '@/shell/SimpleAppBar'

import styles from './Changelog.module.scss'
import changelogData from './data/index'

const theme = createTheme({
  palette: {
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
      <SimpleAppBar title='更新记录' inverse sticky whiteBg />
      <div className={styles.main}>
        <Timeline position='alternate'>
          {changelogData.map(item => (
            <TimelineItem key={item.date}>
              <TimelineOppositeContent>
                <Typography color='secondary'>{item.date}</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  className={styles.dot}
                  style={{
                    borderColor: item.color,
                  }}
                >
                  <img className={styles.appIcon} src={item.icon} />
                </TimelineDot>
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
