import { FormatPaintRounded as FormatPaintRoundedIcon } from '@mui/icons-material'
import { Button, Fab, TextField, Tooltip } from '@mui/material'
import React, { useState, useRef } from 'react'

import { getRestrictValue } from '@/utils'

import PanelContainer from '../parts/PanelContainer'
import Saver from '../parts/Saver'

import styles from './WordInWord.module.scss'

const WordInWord = (): JSX.Element => {
  const [microText, setMicroText] = useState('话')
  const [macroText, setMacroText] = useState('话里有话')
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
    const macroFontSize = getRestrictValue(
      0,
      Math.floor(
        // 左右各留一定空白
        (mainCanvas.current.width - 64) / mat.length,
      ),
      mainCanvas.current.height,
    )
    Object.assign(context, {
      font: `bold ${macroFontSize}px monospace`,
      fillStyle: 'black',
      textAlign: 'center',
    })

    context.fillText(
      mat,
      // 设置了textAlign所以居中不需要手动计算
      mainCanvas.current.width / 2,
      // 手动计算一下使垂直方向趋近居中
      (mainCanvas.current.height - macroFontSize * 1.3) / 2 + macroFontSize,
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
    const mitFontSize = getRestrictValue(14, macroFontSize / 15, 24)
    Object.assign(context, {
      font: `normal ${mitFontSize}px monospace`,
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
    <section className={styles.wordInWord}>
      <PanelContainer
        board={
          <Saver
            saveAction='saveOnly'
            fileName={macroText}
            imgUrlGetter={() =>
              mainCanvas.current ? mainCanvas.current.toDataURL() : ''
            }
          >
            <canvas ref={mainCanvas} className={styles.canvas} />
          </Saver>
        }
        control={
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
                  示例1：吃人
                </Button>
              </Tooltip>
              <Tooltip arrow title='一定来，咕咕咕'>
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
                  示例2：咕
                </Button>
              </Tooltip>
            </div>
          </div>
        }
      />
    </section>
  )
}

export default WordInWord
