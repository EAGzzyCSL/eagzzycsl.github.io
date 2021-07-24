import { Paper, Button, Fab, TextField, Tooltip } from '@material-ui/core'
import {
  green as colorGreen,
  orange as colorOrange,
} from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'
import { FormatPaintRounded as FormatPaintRoundedIcon } from '@material-ui/icons'
import { GetStaticPropsResult } from 'next'
import React, { useState, useRef } from 'react'

import AppPage from '@/shell/AppPage'
import SimpleAppBar from '@/shell/SimpleAppBar'

import styles from './Painter.module.scss'

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: colorOrange[800],
    },
    secondary: {
      main: colorGreen[600],
    },
  },
})

const Painter = (): JSX.Element => {
  const [microText, setMicroText] = useState('')
  const [macroText, setMacroText] = useState('')
  const mainCanvas = useRef<null | HTMLCanvasElement>(null)

  const setDemo = (mit: string, mat: string): void => {
    setMicroText(mit)
    setMacroText(mat)
  }

  const handleDraw = (mit: string, mat: string): void => {
    if (!mainCanvas.current) {
      return
    }
    const { offsetHeight, offsetWidth } = mainCanvas.current
    mainCanvas.current.width = devicePixelRatio * offsetWidth
    mainCanvas.current.height = devicePixelRatio * offsetHeight
    const context = mainCanvas.current.getContext('2d')
    if (!context) {
      return
    }
    /**
     * 首先绘制宏观文本，而后保留其imageData用做裁剪边界
     */
    const macroFontSize = Math.floor(
      // 左右各留一定空白
      (mainCanvas.current.width - 64) / mat.length,
    )
    Object.assign(context, {
      font: `bold ${macroFontSize}px monospace`,
      fillStyle: 'black',
      textAlign: 'center',
      textBaseline: 'middle',
    })
    context.fillText(
      mat,
      mainCanvas.current.width / 2,
      mainCanvas.current.height / 2,
    )
    const macroImageData = context.getImageData(
      0,
      0,
      mainCanvas.current.width,
      mainCanvas.current.height,
    )
    context.clearRect(0, 0, mainCanvas.current.width, mainCanvas.current.height)
    /**
     * 使用微观文本密铺画布
     */
    const mitFontSize = 24
    Object.assign(context, {
      font: `bold ${mitFontSize}px monospace`,
      fillStyle: 'black',
    })
    const mitWidth = context.measureText(mit).width
    for (let i = 0; i < mainCanvas.current.width / mitWidth; i += 1) {
      for (let j = 0; j < mainCanvas.current.height / mitFontSize; j += 1) {
        // 稍微间隔一点间隙避免过于密集
        context.fillText(mit, i * mitWidth, j * (mitFontSize + 4))
      }
    }
    /**
     * 获取微观文本imageData
     *
     * 利用宏观文本imageData对其做滤镜操作：宏观文本中透明的像素点在微观文本中同样透明
     */
    const microImageData = context.getImageData(
      0,
      0,
      mainCanvas.current.width,
      mainCanvas.current.height,
    )
    macroImageData.data.forEach((value, index) => {
      if (index % 4 === 3 && value === 0) {
        microImageData.data[index] = 0
      }
    })
    context.putImageData(microImageData, 0, 0)
  }

  return (
    <AppPage title='出图' theme={theme}>
      <section className={styles.painter}>
        <SimpleAppBar title='出图' inverse />
        <div className={styles.main}>
          <div className={styles.displayPanel}>
            <Paper elevation={3} className={styles.canvasBoard}>
              <canvas ref={mainCanvas} className={styles.canvas} />
            </Paper>
          </div>
          <div className={styles.operatingPanel}>
            <div className={styles.controlBoard}>
              <div className={styles.inputArea}>
                <TextField
                  variant='outlined'
                  className={styles.input}
                  size='small'
                  label='宏观文字'
                  value={macroText}
                  onChange={event => {
                    setMacroText(event.target.value)
                  }}
                />
                <TextField
                  variant='outlined'
                  className={styles.input}
                  size='small'
                  label='微观文字'
                  value={microText}
                  onChange={event => {
                    setMicroText(event.target.value)
                  }}
                />
              </div>
              <Fab
                disabled={!microText || !macroText}
                variant='extended'
                color='primary'
                onClick={() => {
                  handleDraw(microText, macroText)
                }}
              >
                <FormatPaintRoundedIcon />
                生成
              </Fab>
            </div>

            <div className={styles.quickDemo}>
              <Tooltip
                arrow
                title='我翻开历史一查，这历史没有年代，...，才从字缝里看出字来，满本都写着两个字是“吃人”！'
              >
                <Button
                  variant='contained'
                  size='small'
                  color='secondary'
                  className={styles.demoButton}
                  onClick={() => {
                    setDemo('吃人', '历史')
                    handleDraw('吃人', '历史')
                  }}
                >
                  吃人
                </Button>
              </Tooltip>
              <Tooltip arrow title='一定来一定来，不会咕，不会咕'>
                <Button
                  variant='contained'
                  size='small'
                  color='secondary'
                  className={styles.demoButton}
                  onClick={() => {
                    setDemo('咕', '一定来')
                    handleDraw('咕', '一定来')
                  }}
                >
                  咕
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>
    </AppPage>
  )
}
export default Painter

export const getStaticProps = (): GetStaticPropsResult<unknown> => ({
  props: {},
})
