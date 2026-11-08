import React from 'react'
import type { PointerEvent } from 'react'

import type { Game } from './breakout'
import styles from './GameControls.module.scss'

interface DirectionButtonProps {
  direction: -1 | 1
  onPress: (pointerId: number, direction: -1 | 1) => void
  onRelease: (pointerId: number) => void
}

const DirectionButton = ({
  direction,
  onPress,
  onRelease,
}: DirectionButtonProps): React.JSX.Element => {
  const start = (event: PointerEvent<HTMLButtonElement>): void => {
    if (event.button !== 0) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    onPress(event.pointerId, direction)
  }
  const stop = (event: PointerEvent<HTMLButtonElement>): void => {
    onRelease(event.pointerId)
  }
  return (
    <button
      type='button'
      className={styles.directionButton}
      aria-label={direction === -1 ? '向左移动' : '向右移动'}
      onPointerDown={start}
      onPointerUp={stop}
      onPointerCancel={stop}
      onLostPointerCapture={stop}
    >
      {direction === -1 ? '←' : '→'}
    </button>
  )
}

const CONTROL_LABELS: Record<Game['status'], string> = {
  idle: '开始',
  playing: '暂停',
  paused: '继续',
  lost: '重新开始',
  won: '重新开始',
}

interface GameControlsProps {
  status: Game['status']
  onToggle: () => void
  onPressDirection: DirectionButtonProps['onPress']
  onReleaseDirection: DirectionButtonProps['onRelease']
}

const GameControls = ({
  status,
  onToggle,
  onPressDirection,
  onReleaseDirection,
}: GameControlsProps): React.JSX.Element => (
  <div className={styles.controls} role='group' aria-label='游戏操作'>
    <DirectionButton
      direction={-1}
      onPress={onPressDirection}
      onRelease={onReleaseDirection}
    />
    <button type='button' className={styles.controlButton} onClick={onToggle}>
      {CONTROL_LABELS[status]}
    </button>
    <DirectionButton
      direction={1}
      onPress={onPressDirection}
      onRelease={onReleaseDirection}
    />
  </div>
)

export default GameControls
