/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import React, { useRef, useEffect } from 'react'

import { Tuple } from '@/types/utility'

import { createBranchOutline } from '../data/branch'
import { createThePlumOutline } from '../data/petal'
import {
  plumBranchData,
  PlumBranchDefine,
  plumFlowerData,
  PlumFlowerDefine,
} from '../data/track'
import { createTrackFromPoints, flattenTrack } from '../utils'

import styles from './PlumPainting.module.scss'

const PAINTER_ORIGIN_SIZE = 1200

const branchColor = '#383532'
const flowerColor = '#CA392C'

class PlumPainter {
  private scaleRatio: number

  private petalCount: number

  private petalHasDraw = 0

  private isDestroyed = false

  private canvasContext: Pick<
    CanvasRenderingContext2D,
    | 'save'
    | 'clearRect'
    | 'beginPath'
    | 'stroke'
    | 'restore'
    | 'closePath'
    | 'fill'
    | 'fillStyle'
    | 'moveTo'
    | 'lineTo'
    | 'arc'
    | 'bezierCurveTo'
    | 'quadraticCurveTo'
  >

  private canvas: HTMLCanvasElement

  private output: CanvasRenderingContext2D

  private mask: CanvasRenderingContext2D

  private brush: CanvasRenderingContext2D

  private frame: CanvasRenderingContext2D

  private background: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement, petalCount: number) {
    this.scaleRatio = canvas.width / PAINTER_ORIGIN_SIZE
    this.canvas = canvas
    this.petalCount = petalCount

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.output = canvas.getContext('2d')!
    const createLayer = (): CanvasRenderingContext2D => {
      const layer = document.createElement('canvas')
      layer.width = canvas.width
      layer.height = canvas.height
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return layer.getContext('2d')!
    }
    this.mask = createLayer()
    this.brush = createLayer()
    this.frame = createLayer()
    this.background = createLayer()
    const ctx = this.mask
    this.canvasContext = {
      save: ctx.save.bind(ctx),
      clearRect: ctx.clearRect.bind(ctx),
      beginPath: ctx.beginPath.bind(ctx),
      stroke: ctx.stroke.bind(ctx),
      restore: ctx.restore.bind(ctx),
      closePath: ctx.closePath.bind(ctx),
      fill: ctx.fill.bind(ctx),
      set fillStyle(value) {
        ctx.fillStyle = value
      },
      get fillStyle(): CanvasFillStrokeStyles['fillStyle'] {
        return ctx.fillStyle
      },
      moveTo: (...args: number[]) => {
        ctx.moveTo(
          ...(args.map(item => item * this.scaleRatio) as Tuple<number, 2>),
        )
      },
      lineTo: (...args: number[]) => {
        ctx.lineTo(
          ...(args.map(item => item * this.scaleRatio) as Tuple<number, 2>),
        )
      },
      arc: (
        x: number,
        y: number,
        radius: number,
        startAngle: number,
        endAngle: number,
      ) => {
        ctx.arc(
          x * this.scaleRatio,
          y * this.scaleRatio,
          radius * this.scaleRatio,
          startAngle,
          endAngle,
        )
      },
      bezierCurveTo: (...args: number[]) => {
        ctx.bezierCurveTo(
          ...(args.map(item => item * this.scaleRatio) as Tuple<number, 6>),
        )
      },
      quadraticCurveTo: (...args: number[]) => {
        ctx.quadraticCurveTo(
          ...(args.map(item => item * this.scaleRatio) as Tuple<number, 4>),
        )
      },
    }
  }

  /** 保存已完成的图案，当前图案的笔迹在独立图层累积。 */
  private beginShape(): void {
    const { width, height } = this.canvas
    this.background.clearRect(0, 0, width, height)
    this.background.drawImage(this.canvas, 0, 0)
    this.mask.clearRect(0, 0, width, height)
    this.brush.clearRect(0, 0, width, height)
  }

  private paintDot(x: number, y: number, radius: number, color: string): void {
    const { brush, frame, output, scaleRatio } = this
    const { width, height } = this.canvas
    brush.beginPath()
    brush.arc(
      x * scaleRatio,
      y * scaleRatio,
      radius * scaleRatio,
      0,
      2 * Math.PI,
    )
    brush.fillStyle = color
    brush.fill()

    // 每帧从未裁剪的笔迹重新合成，轮廓的抗锯齿透明度只应用一次。
    frame.clearRect(0, 0, width, height)
    frame.drawImage(brush.canvas, 0, 0)
    frame.globalCompositeOperation = 'destination-in'
    frame.drawImage(this.mask.canvas, 0, 0)
    frame.globalCompositeOperation = 'source-over'

    output.clearRect(0, 0, width, height)
    output.drawImage(this.background.canvas, 0, 0)
    output.drawImage(frame.canvas, 0, 0)
  }

  /**
   * 清空画布
   */
  public clearCanvas(): void {
    this.output.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  /**
   * 根据控制点画出骨架线（测试使用）
   * @param points
   * @param width
   */
  public drawSkeleton(points: number[][]): void {
    const { canvasContext: ctx } = this
    ctx.save()

    ctx.beginPath()
    ctx.moveTo(points[0][0] * this.scaleRatio, points[0][1] * this.scaleRatio)
    for (let i = 1; i < points.length; i += 1) {
      ctx.lineTo(points[i][0], points[i][1])
    }
    ctx.stroke()
    this.output.drawImage(this.mask.canvas, 0, 0)

    ctx.restore()
  }

  /**
   * 根据起止点和折点画一条枝出来
   */
  private async drawOneBranch(
    plumBranchDefine: PlumBranchDefine,
    fastForDebug = false,
  ): Promise<void> {
    const { canvasContext: ctx } = this

    this.beginShape()
    ctx.save()

    ctx.fillStyle = branchColor

    ctx.beginPath()

    const { outline, width } = createBranchOutline(plumBranchDefine)

    ctx.moveTo(outline[0].x, outline[0].y)

    // 勾勒上部的点
    for (let i = 1; i < outline.length - 1; i += 1) {
      const { x, y } = outline[i]
      ctx.lineTo(x, y)
    }

    /**
     * 轮廓只栅格化一次，作为动画笔迹的透明度蒙版
     */
    ctx.closePath()

    if (fastForDebug) {
      // 调试看效果时只描个轮廓即可
      ctx.stroke()
      this.output.drawImage(this.mask.canvas, 0, 0)
      ctx.restore()
      return
    }

    ctx.fill()

    /**
     * 根据控制点生成绘制轨迹，调用requestAnimationFrame完整路径的填充
     */
    await new Promise<void>(resolve => {
      const track = createTrackFromPoints(plumBranchDefine.points, width, 4)
      let frameIndex = 0

      const fillPathWithAnimation = (): void => {
        if (this.isDestroyed) {
          resolve()
          // 如果已销毁，则后续的绘制不要再进行了
          return
        }
        const { x, y } = track[frameIndex]
        frameIndex += 1
        this.paintDot(x, y, width * 1.414, branchColor)

        if (frameIndex < track.length) {
          requestAnimationFrame(() => {
            fillPathWithAnimation()
          })
        } else {
          resolve()
        }
      }
      fillPathWithAnimation()
    })

    ctx.restore()
  }

  /**
   * 画全部的梅花枝条
   */
  private async drawAllBranch(fastForDebug = false): Promise<void> {
    // eslint-disable-next-line no-restricted-syntax
    for (const define of plumBranchData) {
      if (this.isDestroyed) {
        // 如果已销毁，则后续的绘制不要再进行了
        return
      }
      await this.drawOneBranch(define, fastForDebug)
    }
  }

  /**
   * 画一朵梅花
   */
  private async drawOnePlum(
    { x, y, size }: PlumFlowerDefine,
    fastForDebug = false,
  ): Promise<void> {
    const { canvasContext: ctx } = this

    const outlines = createThePlumOutline({ x, y }, size)
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < outlines.length; i++) {
      if (this.petalHasDraw >= this.petalCount) {
        return
      }
      if (this.isDestroyed) {
        // 如果已销毁，则后续的绘制不要再进行了
        return
      }

      const outline = outlines[i]
      this.beginShape()
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(...flattenTrack<2>(outline.moveTo))
      ctx.bezierCurveTo(...flattenTrack<6>(outline.leftBezier))
      ctx.bezierCurveTo(...flattenTrack<6>(outline.topBezier))
      ctx.bezierCurveTo(...flattenTrack<6>(outline.rightBezier))
      ctx.quadraticCurveTo(...flattenTrack<4>(outline.bottomQuadratic))
      ctx.closePath()
      if (fastForDebug) {
        // 调试时只绘制轮廓
        ctx.stroke()
        this.output.drawImage(this.mask.canvas, 0, 0)
        ctx.restore()
        // eslint-disable-next-line no-continue
        continue
      }
      ctx.fillStyle = flowerColor
      ctx.fill()

      await new Promise<void>(resolve => {
        const track = outline.fillTrack
        let frameIndex = 0

        const fillPathWithAnimation = (): void => {
          if (this.isDestroyed) {
            resolve()
            // 如果已销毁，则后续的绘制不要再进行了
            return
          }
          const { x, y, size } = track[frameIndex]
          frameIndex += 1
          this.paintDot(x, y, size, flowerColor)

          if (frameIndex < track.length) {
            requestAnimationFrame(() => {
              fillPathWithAnimation()
            })
          } else {
            resolve()
          }
        }
        fillPathWithAnimation()
      })

      ctx.restore()
      this.petalHasDraw++
    }
  }

  /**
   * 画全部梅花
   */
  private async drawAllPlum(fastForDebug = false): Promise<void> {
    // eslint-disable-next-line no-restricted-syntax
    for (const define of plumFlowerData) {
      // eslint-disable-next-line no-await-in-loop
      if (this.isDestroyed) {
        // 如果已销毁，则后续的绘制不要再进行了
        return
      }
      await this.drawOnePlum(define, fastForDebug)
    }
  }

  public async draw(): Promise<void> {
    const fastForDebug = false
    await this.drawAllBranch(fastForDebug)
    await this.drawAllPlum(fastForDebug)
  }

  /**
   * 释放绘制
   * (用于避免两个动画的绘制并发发生
   */
  public destroy(): void {
    this.isDestroyed = true
  }
}

export interface PlumPaintingProps {
  // 绘制的花瓣数量
  petalCount: number
}

const PlumPainting = ({ petalCount }: PlumPaintingProps): React.JSX.Element => {
  const board = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!board.current) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {}
    }
    if (petalCount === 0) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {}
    }
    const { offsetHeight, offsetWidth } = board.current
    board.current.width = devicePixelRatio * offsetWidth
    board.current.height = devicePixelRatio * offsetHeight

    const plumPainter = new PlumPainter(board.current, petalCount)
    setTimeout(() => {
      // destroy后要等Promise结束才restore，所以这里等一下避免restore的干扰
      plumPainter.draw().catch(() => {
        //
      })
    }, 0)
    return () => {
      plumPainter.destroy()
      plumPainter.clearCanvas()
    }
  })
  return (
    <section className={styles.plumPainting}>
      <canvas ref={board} className={styles.canvas} />
    </section>
  )
}

export default PlumPainting
