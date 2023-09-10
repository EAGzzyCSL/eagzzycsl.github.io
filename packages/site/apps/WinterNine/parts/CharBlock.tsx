/* eslint-disable import/extensions */
import React, { useRef, useEffect } from 'react'

import { sleep } from '@/utils'

import char亭 from '../data/亭.json'
import char前 from '../data/前.json'
import char垂 from '../data/垂.json'
import char待 from '../data/待.json'
import char春 from '../data/春.json'
import char柳 from '../data/柳.json'
import char珍 from '../data/珍.json'
import char重 from '../data/重.json'
import char風 from '../data/風.json'
import { CharDescription } from '../type'
import { smoothPoints } from '../utils'

import styles from './CharBlock.module.scss'

const sentence = [
  char亭,
  char前,
  char垂,
  char柳,
  char珍,
  char重,
  char待,
  char春,
  char風,
] as CharDescription[]

const STROKE_TABLET_ORIGIN_SIZE = 2048
const TRACK_STROKE_SIZE = 200

/**
 * chrome的clip没有抗锯齿，因此使用红色和灰色模糊边缘的锯齿（目前的组合效果便不错）
 */
const colorPlaceholder = '#bbb'
const colorFill = '#c33'

class CharWriter {
  private char: CharDescription

  private scaleRatio

  private nextStrokeIndex = 0

  private canvas: HTMLCanvasElement

  private canvasContext: CanvasRenderingContext2D

  private isAnimatingStroke = false

  private isDestroyed = false

  constructor(char: CharDescription, canvas: HTMLCanvasElement) {
    this.char = char
    const scaleRatio = canvas.width / STROKE_TABLET_ORIGIN_SIZE
    this.scaleRatio = scaleRatio
    this.canvas = canvas
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.canvasContext = canvas.getContext('2d')!
    // 设置为dpr的一倍，避免锯齿出现
    this.canvasContext.lineWidth = window.devicePixelRatio
  }

  /**
   * 绘制整体文字占位
   */
  private drawChar(): void {
    for (let i = 0; i < this.char.strokes.length; i += 1) {
      this.drawStroke(i, true)
    }
  }

  /**
   * 绘制单笔轮廓
   */
  private drawStrokeOutline(strokeIndex: number, isTrans = false): void {
    this.canvasContext.save()
    this.canvasContext.beginPath()
    this.canvasContext.strokeStyle = isTrans ? 'transparent' : colorPlaceholder
    this.char.strokes[strokeIndex].outline.forEach(point => {
      if (point.type === 'M') {
        const { x, y } = point
        this.canvasContext.moveTo(x * this.scaleRatio, y * this.scaleRatio)
      } else if (point.type === 'L') {
        const { x, y } = point
        this.canvasContext.lineTo(x * this.scaleRatio, y * this.scaleRatio)
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      } else if (point.type === 'Q') {
        const { cp1x, cp1y, x, y } = point
        this.canvasContext.quadraticCurveTo(
          cp1x * this.scaleRatio,
          cp1y * this.scaleRatio,
          x * this.scaleRatio,
          y * this.scaleRatio,
        )
      }
    })
    this.canvasContext.stroke()
    this.canvasContext.closePath()
    this.canvasContext.restore()
  }

  /**
   * 绘制单笔笔画
   */
  private drawStroke(strokeIndex: number, isPlaceholder = false): void {
    this.canvasContext.save()
    this.canvasContext.fillStyle = isPlaceholder ? colorPlaceholder : colorFill
    this.drawStrokeOutline(strokeIndex, !isPlaceholder)
    this.canvasContext.fill()
    this.canvasContext.restore()
  }

  private async drawStrokeWithAnimation(strokeIndex: number): Promise<void> {
    const smoothedTrack = smoothPoints(this.char.strokes[strokeIndex].track)

    return new Promise(resolve => {
      let frameCursor = 0
      this.canvasContext.save()
      this.drawStrokeOutline(strokeIndex, true)
      this.canvasContext.clip()
      this.canvasContext.strokeStyle = colorFill
      this.canvasContext.lineWidth = this.scaleRatio * TRACK_STROKE_SIZE
      const drawFrame = (): void => {
        if (this.isDestroyed) {
          resolve()
          // 如果已销毁，则后续的绘制不要再进行了
          return
        }
        this.canvasContext.beginPath()
        const { x, y, size } = smoothedTrack[frameCursor]
        this.canvasContext.arc(
          x * this.scaleRatio,
          y * this.scaleRatio,
          size * this.scaleRatio,
          0,
          Math.PI * 2,
          true,
        )
        this.canvasContext.stroke()
        frameCursor += 1
        if (frameCursor < smoothedTrack.length) {
          requestAnimationFrame(() => {
            drawFrame()
          })
        } else {
          this.canvasContext.restore()
          resolve()
        }
      }
      drawFrame()
    })
  }

  /**
   * 书写前X笔（从1开始记，public api 从 1 开始计下标，其余 private 函数依旧从 0 开始）
   */
  writeFirstXStrokes(x: number): void {
    this.drawChar()
    for (let i = 0; i < x; i += 1) {
      this.drawStroke(i, false)
    }
    this.nextStrokeIndex = x
  }

  /**
   * 书写接下来的一笔
   */
  async writeNext(): Promise<void> {
    if (this.nextStrokeIndex < this.char.strokes.length) {
      if (this.isAnimatingStroke) {
        return
      }
      this.isAnimatingStroke = true
      await this.drawStrokeWithAnimation(this.nextStrokeIndex)
      this.isAnimatingStroke = false
      this.nextStrokeIndex += 1
    }
  }

  /**
   * 清空画布
   */
  public clearCanvas(): void {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  /**
   * 释放绘制
   * (用于避免两个动画的绘制并发发生
   */
  public destroy(): void {
    this.isDestroyed = true
  }
}

interface CharBlockProps {
  charIndex: number
  /**
   * 当前绘制到第x笔（最后一笔可以选择以动画方式绘制）
   */
  currentStroke: number
  /**
   * 是否以动画方式绘制最后一笔（已经写满的字没有以动画方式绘制最后一笔的需求）
   */
  animateLastStroke?: boolean
  /**
   * 最后一笔的动画延迟出现的时间
   */
  lastAnimateStrokeTimeout: number
}

const CharBlock = ({
  charIndex,
  currentStroke,
  animateLastStroke,
  lastAnimateStrokeTimeout,
}: CharBlockProps): JSX.Element => {
  const tablet = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!tablet.current) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {}
    }
    const { offsetHeight, offsetWidth } = tablet.current
    tablet.current.width = devicePixelRatio * offsetWidth
    tablet.current.height = devicePixelRatio * offsetHeight

    const charWriter = new CharWriter(sentence[charIndex], tablet.current)
    if (animateLastStroke) {
      charWriter.writeFirstXStrokes(currentStroke - 1)
      // 有动画的一画延迟一点出来避免没有重点
      sleep(lastAnimateStrokeTimeout)
        .then(() => {
          charWriter.writeNext().catch(() => {
            //
          })
        })
        .catch(() => {
          //
        })
    } else {
      charWriter.writeFirstXStrokes(currentStroke)
    }
    return () => {
      charWriter.destroy()
      charWriter.clearCanvas()
    }
  })
  return (
    <section className={styles.charBlock}>
      <canvas ref={tablet} className={styles.canvas} />
    </section>
  )
}

CharBlock.defaultProps = {
  animateLastStroke: false,
}

export default CharBlock
