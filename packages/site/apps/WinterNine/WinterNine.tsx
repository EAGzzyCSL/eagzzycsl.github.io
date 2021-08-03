import { Typography } from '@material-ui/core'
import { green as colorAmber, red as colorRed } from '@material-ui/core/colors'
import { createTheme } from '@material-ui/core/styles'
import dayjs from 'dayjs'
import { GetStaticPropsResult } from 'next'
import React from 'react'

import AppPage from '@/shell/AppPage'
import SimpleAppBar from '@/shell/SimpleAppBar'

import Nine from './parts/Nine'
import { numberToChar } from './utils'
import styles from './WinterNine.module.scss'

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: colorRed[500],
    },
    secondary: {
      main: colorAmber[500],
    },
  },
})

const WinterNine = (): JSX.Element => {
  const dayIndex = dayjs().diff('2020-12-21', 'day') + 1
  // 几九
  const nineOrder = Math.ceil(dayIndex / 9)
  // 第几天
  const dayOrder = 9 - (nineOrder * 9 - dayIndex)
  return (
    <AppPage title='管城春满' theme={theme}>
      <section className={styles.winterNine}>
        <SimpleAppBar title='管城春满' inverse />
        <Nine dayIndex={dayIndex} />
        <Typography gutterBottom variant='h5' color='secondary'>
          {dayIndex > 81
            ? '出九'
            : `${numberToChar(nineOrder)}九第${numberToChar(dayOrder)}天`}
        </Typography>
      </section>
    </AppPage>
  )
}
export default WinterNine

export const getStaticProps = (): GetStaticPropsResult<unknown> => ({
  props: {},
})
