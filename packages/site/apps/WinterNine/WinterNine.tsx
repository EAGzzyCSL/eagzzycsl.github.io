import { Typography, Slide, Fade } from '@material-ui/core'
import { green as colorAmber, red as colorRed } from '@material-ui/core/colors'
import { createTheme } from '@material-ui/core/styles'
import dayjs from 'dayjs'
import { GetStaticPropsResult } from 'next'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'

import { transparentBase64 } from '@/constants/style'
import AppPage from '@/shell/AppPage'
import SimpleAppBar from '@/shell/SimpleAppBar'
import { getHashContent } from '@/utils'

import bgImage from './assets/bg.png'
import Nine from './parts/Nine'
import PlumPainting from './parts/PlumPainting'
import { getNineDescription } from './utils'
import styles from './WinterNine.module.scss'

const MemoNine = React.memo(Nine)
const MemoPlumPainting = React.memo(PlumPainting)

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

const WINTER_SOLSTICE_DATE = '2021-12-21'

const AnimationTimeConfig = {
  // 等待文字开始动画的时间
  wait_text: 200,
  // 文字动画时长
  text: 400,
  // 等待nine开始动画的时间（多加100毫秒用于间隔nine和文字）
  wait_nine: 200 + 400 + 100,
  // nine动画时长
  nine: 800,
  // 等待plum开始动画的时间（多加600毫秒用于等笔画画完并让nine和梅花间有点间隔）
  wait_plum: 200 + 400 + 100 + 800 + 600,
}

const WinterNine = (): JSX.Element => {
  const selectedDate = dayjs(getHashContent() || undefined)
  const displayDate = selectedDate.format('YYYY-MM-DD')
  const [dayDiff, setDayDiff] = useState(() =>
    selectedDate.diff(WINTER_SOLSTICE_DATE, 'day'),
  )

  const text = getNineDescription(dayDiff)

  // 留一个调试的小口子，可以直接通过hash指定日期
  useEffect(() => {
    const hashListener = (): void => {
      setDayDiff(dayjs(getHashContent()).diff(WINTER_SOLSTICE_DATE, 'day'))
    }
    window.addEventListener('hashchange', hashListener)
    return () => {
      window.removeEventListener('hashchange', hashListener)
    }
  }, [])

  const [textVisible, setTextVisible] = useState(false)
  const [nineVisible, setNineVisible] = useState(false)
  const [plumVisible, setPlumVisible] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setTextVisible(true)
    }, AnimationTimeConfig.wait_text)
    const timer2 = setTimeout(() => {
      setNineVisible(true)
    }, AnimationTimeConfig.wait_nine)
    const timer3 = setTimeout(() => {
      setPlumVisible(true)
    }, AnimationTimeConfig.wait_plum)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const drawIndex = Math.max(dayDiff + 1, 0)

  return (
    <AppPage title='管城春满' theme={theme}>
      <section
        className={styles.winterNine}
        style={{
          backgroundImage: `-webkit-cross-fade(url(${transparentBase64}), url(${bgImage}), 26%)`,
        }}
      >
        <SimpleAppBar title={`管城春满 · ${displayDate}`} inverse />
        <div className={styles.main}>
          {/* 梅花和字谁在上层谁在下层其实没有特别的差别，因为梅花是后加的，所以梅花就放上层了 */}
          <div className={styles.back}>
            <div className={styles.container}>
              <Fade in={nineVisible} timeout={AnimationTimeConfig.nine}>
                {/* 有forwardRef的问题，套个div解决一下 */}
                <div>
                  <MemoNine
                    dayIndex={drawIndex}
                    lastAnimateStrokeTimeout={
                      AnimationTimeConfig.wait_nine + AnimationTimeConfig.nine
                    }
                  />
                </div>
              </Fade>
              <Slide
                direction='up'
                timeout={AnimationTimeConfig.text}
                in={textVisible}
              >
                <Typography
                  className={styles.description}
                  gutterBottom
                  variant='h4'
                  color='secondary'
                >
                  {text}
                </Typography>
              </Slide>
            </div>
          </div>
          <div className={styles.front}>
            {plumVisible && <MemoPlumPainting petalCount={drawIndex} />}
          </div>
        </div>
      </section>
    </AppPage>
  )
}

export default dynamic(() => Promise.resolve(WinterNine), {
  ssr: false,
})

export const getStaticProps = (): GetStaticPropsResult<unknown> => ({
  props: {},
})
