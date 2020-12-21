/* eslint-disable import/extensions */
import React, { useRef, useEffect } from 'react'

import styles from './CharBlock.module.scss'

import char亭 from '../data/亭.json'
import char前 from '../data/前.json'
import char垂 from '../data/垂.json'
import char待 from '../data/待.json'
import char春 from '../data/春.json'
import char柳 from '../data/柳.json'
import char珍 from '../data/珍.json'
import char重 from '../data/重.json'
import char風 from '../data/風.json'
import { PointLineTo, PointMoveTo, PointQuadTo, CharDescription } from '../type'
import { smoothPoints } from '../utils'

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

interface CharBlockProps {
  charIndex: number
  // 挂载时渲染到哪一笔
  currentStroke: number
}

/**
 * chrome的clip没有抗锯齿，因此使用红色和灰色模糊边缘的锯齿
 */
const colorPlaceholder = '#bbb'
const colorFill = '#c33'

/**
 * 就现在这个代码和颜色搭配就不错，可以做到把锯齿藏起来
 *
 */
class CharWriter {
  private char: CharDescription

  private scaleRatio

  private nextStrokeIndex = 0

  private canvasContext: CanvasRenderingContext2D

  private isAnimatingStroke = false

  constructor(char: CharDescription, canvas: HTMLCanvasElement) {
    this.char = char
    const scaleRatio = canvas.width / STROKE_TABLET_ORIGIN_SIZE
    this.scaleRatio = scaleRatio
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
        const { x, y } = point as PointMoveTo
        this.canvasContext.moveTo(x * this.scaleRatio, y * this.scaleRatio)
      } else if (point.type === 'L') {
        const { x, y } = point as PointLineTo
        this.canvasContext.lineTo(x * this.scaleRatio, y * this.scaleRatio)
      } else if (point.type === 'Q') {
        const { cp1x, cp1y, x, y } = point as PointQuadTo
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
}

const CharBlock = ({
  charIndex,
  currentStroke,
}: CharBlockProps): JSX.Element => {
  const tablet = useRef<HTMLCanvasElement>(null)
  const charWriterRef = useRef<CharWriter>()
  const initCanvas = (): void => {
    if (!tablet.current) {
      return
    }
    const { offsetHeight, offsetWidth } = tablet.current
    tablet.current.width = devicePixelRatio * offsetWidth
    tablet.current.height = devicePixelRatio * offsetHeight

    charWriterRef.current = new CharWriter(sentence[charIndex], tablet.current)
    if (currentStroke === 0) {
      charWriterRef.current.writeFirstXStrokes(0)
    } else if (currentStroke === 10) {
      charWriterRef.current.writeFirstXStrokes(9)
    } else {
      charWriterRef.current.writeFirstXStrokes(currentStroke - 1)
      charWriterRef.current.writeNext()
    }
  }

  useEffect(() => {
    setTimeout(() => {
      initCanvas()
    }, 200)
  })
  return (
    <section className={styles.charBlock}>
      <canvas ref={tablet} className={styles.canvas} />
    </section>
  )
}

export default CharBlock
