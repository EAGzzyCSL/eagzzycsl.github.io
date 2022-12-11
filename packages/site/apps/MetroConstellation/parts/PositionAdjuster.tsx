import React from 'react'

import {
  ArrowUpwardRoundedIcon,
  ArrowDownwardRoundedIcon,
  ArrowForwardRoundedIcon,
  ArrowBackRoundedIcon,
} from '@/ui/icons'
import { IconButton, Typography } from '@/ui/material'

import styles from './PositionAdjuster.module.scss'

interface PositionAdjusterProps {
  name: string
  x: number
  y: number
  enableAdjust: boolean
  updatePosition: (x: number, y: number) => void
}

const PositionAdjuster = (props: PositionAdjusterProps): JSX.Element => {
  const { name, x, y, updatePosition, enableAdjust } = props

  return (
    <div className={styles.positionAdjuster}>
      <Typography variant='caption'>{name}</Typography>
      {enableAdjust && (
        <div className={styles.adjuster}>
          {/* 上 */}
          <IconButton
            size='small'
            color='secondary'
            onClick={() => {
              updatePosition(x, y - 1)
            }}
          >
            <ArrowUpwardRoundedIcon fontSize='small' />
          </IconButton>
          {/* 左右 */}
          <div className={styles.row}>
            <IconButton
              size='small'
              color='secondary'
              onClick={() => {
                updatePosition(x - 1, y)
              }}
            >
              <ArrowBackRoundedIcon fontSize='small' />
            </IconButton>
            <Typography variant='button'>
              ({x}, {y})
            </Typography>
            <IconButton
              size='small'
              color='secondary'
              onClick={() => {
                updatePosition(x + 1, y)
              }}
            >
              <ArrowForwardRoundedIcon fontSize='small' />
            </IconButton>
          </div>
          {/* 下 */}
          <IconButton
            size='small'
            color='secondary'
            onClick={() => {
              updatePosition(x, y + 1)
            }}
          >
            <ArrowDownwardRoundedIcon fontSize='small' />
          </IconButton>
        </div>
      )}
    </div>
  )
}

export default PositionAdjuster
