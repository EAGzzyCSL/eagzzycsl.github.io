import React, { useMemo, useState, useCallback } from 'react'

import cx from 'classnames'

import { Tooltip } from '@/ui/material'

import { LINE_WIDTH, COLOR_BASE, COLOR_LINE_LIGHT } from '../constant'
import {
  BlinkLevel,
  IMetroStation,
  ILineNode,
  IMetroLinesMap,
  IMetroStationRaw,
} from '../type'

import styles from './MetroMap.module.scss'
import PositionAdjuster from './PositionAdjuster'

/**
 * 关于星座的绘制：
 * 参见：../doc/地铁星座绘制方式.png
 * 画板链接：https://www.geogebra.org/geometry/xhtwmj4s
 *
 * 1. star 本身的坐标代表 star 中心坐标，所以绘制 star 时需要 transform 100%-1px
 * 2. line 绘制时以 star 中心坐标连线，为了连接两个中心，长度需要为起点终点差值+1
 * 3. 如果线条是斜的，需要使用一个矩形来做对角线
 */

type TDirection = 'x' | 'y' | 'y=x' | 'y=-x'

type TStationPositionOverrides = Record<string, [number, number]>

export const calcLineProps = (
  startStation: IMetroStation,
  endStation: IMetroStation,
  stationPositionOverrides: TStationPositionOverrides,
): {
  alongAxis: boolean
  direction: TDirection
  left: number
  top: number
  width: number
  height: number
} => {
  const [startX, startY] =
    stationPositionOverrides[startStation.name] || startStation.pos
  const [endX, endY] =
    stationPositionOverrides[endStation.name] || endStation.pos

  const top = Math.min(startY, endY)
  const right = Math.max(startX, endX)
  const bottom = Math.max(startY, endY)
  const left = Math.min(startX, endX)

  const alongAxis = left === right || top === bottom

  // 如果使用 border，width 或者 height 为 0，另一个值为 lineWidth
  // 如果使用对角线，宽高要各自多加一个 px 让它在结尾的节点也居中
  const width = left === right ? 1 : right - left + 1
  const height = top === bottom ? 1 : bottom - top + 1

  // 对角线的方向或者本身的方向
  // eslint-disable-next-line no-nested-ternary
  const direction = alongAxis
    ? left === right
      ? 'y'
      : 'x'
    : (endY - startY) / (endX - startX) > 0
    ? 'y=x'
    : 'y=-x'

  return {
    alongAxis,
    direction,
    left,
    top,
    width,
    height,
  }
}

export const calcBackground = (
  lineColor: string,
  colorful: boolean,
  direction: TDirection,
  active: boolean,
): string | undefined => {
  // eslint-disable-next-line no-nested-ternary
  const color = colorful ? lineColor : active ? COLOR_LINE_LIGHT : COLOR_BASE

  if (direction === 'x' || direction === 'y') {
    return color
  }

  const width = active ? LINE_WIDTH : LINE_WIDTH / 2

  // 抗锯齿：
  // https://www.cnblogs.com/coco1s/p/16831364.html
  return [
    'linear-gradient(',
    direction === 'y=x' ? 'to bottom left,' : 'to bottom right,',
    'transparent 0%,',
    `transparent calc(49.5% - ${width}px),`,
    `${color} calc(50% - ${width}px),`,
    `${color} calc(50% + ${width}px),`,
    `transparent calc(50.5% + ${width}px),`,
    'transparent 100%',
    ')',
  ].join('')
}

interface MetroMapProps {
  metroLinesMap: IMetroLinesMap
  metroStationsRaw: IMetroStationRaw[]
  metroSize: [number, number]
  enableAdjust: boolean
}

const MetroMap = (props: MetroMapProps): JSX.Element => {
  const { metroLinesMap, metroStationsRaw, metroSize, enableAdjust } = props

  const metroStations: IMetroStation[] = useMemo(
    () =>
      metroStationsRaw.map(station => ({
        ...station,
        level:
          // eslint-disable-next-line no-nested-ternary
          station.lines.length > 2
            ? BlinkLevel.big
            : station.lines.length === 1
            ? BlinkLevel.small
            : BlinkLevel.mid,
        active: station.lines.some(line => metroLinesMap[line].active),
        colorful: station.lines.some(line => metroLinesMap[line].colorful),
      })),
    [metroStationsRaw, metroLinesMap],
  )

  // station 名字与其在 station 列表中的下标关系
  const stationMap: Record<string, number> = useMemo(
    () =>
      metroStationsRaw.reduce(
        (acc, s, index) => ({
          ...acc,
          [s.name]: index,
        }),
        {},
      ),
    [metroStationsRaw],
  )

  // 可以自定义 station 位置，以 name: [x, y] 形式记录
  const [stationPositionOverrides, setStationPositionOverrides] =
    useState<TStationPositionOverrides>({})

  const updateStation = useCallback(
    (name: string, pos: [number, number]) => {
      setStationPositionOverrides({
        ...stationPositionOverrides,
        [name]: pos,
      })
    },
    [stationPositionOverrides, setStationPositionOverrides],
  )

  const lineNodes: ILineNode[] = useMemo(
    () =>
      Object.values(metroLinesMap).reduce((acc, line) => {
        line.sections.forEach(section => {
          for (let i = 0; i < section.line.length - 1; i += 1) {
            acc.push({
              no: line.no,
              start: stationMap[section.line[i]],
              end: stationMap[section.line[i + 1]],
              color: line.color,
            })
          }
          if (section.isCircle) {
            acc.push({
              no: line.no,
              start: stationMap[section.line[section.line.length - 1]],
              end: stationMap[section.line[0]],
              color: line.color,
            })
          }
        })
        return acc
      }, [] as ILineNode[]),
    [metroLinesMap, stationMap],
  )

  return (
    <section className={styles.metroMap}>
      <div
        className={styles.container}
        style={{
          width: `${metroSize[0]}px`,
          height: `${metroSize[1]}px`,
        }}
      >
        {/* 线路部分 */}
        {lineNodes.map((line, index) => {
          const { active } = metroLinesMap[line.no]

          const { alongAxis, direction, top, width, height, left } =
            calcLineProps(
              metroStations[line.start],
              metroStations[line.end],
              stationPositionOverrides,
            )

          const { colorful } = metroLinesMap[line.no]
          return (
            <div
              className={cx(styles.line, {
                [styles.alongAxis]: alongAxis,
                [styles.alongY]: direction === 'y',
                [styles.alongX]: direction === 'x',
                [styles.active]: active,
              })}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              style={{
                left: `${left}px`,
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`,
                borderColor: colorful ? line.color : undefined,
                background: calcBackground(
                  line.color,
                  colorful,
                  direction,
                  active,
                ),
              }}
            />
          )
        })}
        {/* 站点部分 */}
        {metroStations.map(station => {
          const { level, pos } = station
          const [x, y] = stationPositionOverrides[station.name] || pos
          return (
            <Tooltip
              key={station.name}
              arrow
              title={
                <PositionAdjuster
                  name={station.name}
                  x={x}
                  y={y}
                  enableAdjust={enableAdjust}
                  updatePosition={(x, y) => {
                    updateStation(station.name, [x, y])
                  }}
                />
              }
            >
              <div
                className={cx(styles.star, {
                  [styles.big]: level === BlinkLevel.big,
                  [styles.mid]: level === BlinkLevel.mid,
                  [styles.small]: level === BlinkLevel.small,
                  [styles.active]: station.active,
                })}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                }}
              />
            </Tooltip>
          )
        })}
      </div>
    </section>
  )
}

export default MetroMap
