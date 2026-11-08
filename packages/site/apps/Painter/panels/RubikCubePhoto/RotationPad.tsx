import React, { useId, useRef } from 'react'

import styles from './RotationPad.module.scss'
import { clampView, DEFAULT_VIEW, VIEW_LIMITS } from './rubikView'
import type { RubikView } from './rubikView'

const PAD_INSET = 14

interface RotationPadProps {
  value: RubikView
  onChange: (value: RubikView) => void
}

const RotationPad = ({
  value,
  onChange,
}: RotationPadProps): React.JSX.Element => {
  const pointer = useRef<number | undefined>(undefined)
  const hintId = useId()
  const horizontal = VIEW_LIMITS.azimuth
  const vertical = VIEW_LIMITS.elevation
  const x = (value.azimuth - horizontal.min) / (horizontal.max - horizontal.min)
  const y = (vertical.max - value.elevation) / (vertical.max - vertical.min)

  const updatePointer = (
    event: React.PointerEvent<HTMLButtonElement>,
  ): void => {
    const rect = event.currentTarget.getBoundingClientRect()
    // Keep the handle inside the pad, including at the rotation limits.
    const inset = PAD_INSET
    const width = event.currentTarget.clientWidth - inset * 2
    const height = event.currentTarget.clientHeight - inset * 2
    if (width <= 0 || height <= 0) return
    onChange(
      clampView({
        azimuth:
          horizontal.min +
          ((event.clientX -
            rect.left -
            event.currentTarget.clientLeft -
            inset) /
            width) *
            (horizontal.max - horizontal.min),
        elevation:
          vertical.max -
          ((event.clientY - rect.top - event.currentTarget.clientTop - inset) /
            height) *
            (vertical.max - vertical.min),
      }),
    )
  }

  const stopPointer = (event: React.PointerEvent<HTMLButtonElement>): void => {
    if (pointer.current !== event.pointerId) return
    pointer.current = undefined
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return (
    <div className={styles.control}>
      <span>旋转角度</span>
      <button
        type='button'
        className={styles.pad}
        style={{ '--pad-inset': `${PAD_INSET}px` } as React.CSSProperties}
        aria-label={`旋转角度，水平 ${Math.round(value.azimuth)} 度，仰角 ${Math.round(value.elevation)} 度`}
        aria-describedby={hintId}
        onPointerDown={event => {
          if (event.button !== 0 || pointer.current !== undefined) return
          event.currentTarget.focus()
          event.currentTarget.setPointerCapture(event.pointerId)
          pointer.current = event.pointerId
          updatePointer(event)
        }}
        onPointerMove={event => {
          if (pointer.current === event.pointerId) updatePointer(event)
        }}
        onPointerUp={stopPointer}
        onPointerCancel={stopPointer}
        onLostPointerCapture={stopPointer}
        onBlur={() => {
          pointer.current = undefined
        }}
        onClick={event => {
          if (event.detail === 0) onChange(DEFAULT_VIEW)
        }}
        onKeyDown={event => {
          const step = event.shiftKey ? 5 : 1
          const next = { ...value }
          switch (event.key) {
            case 'ArrowLeft':
              next.azimuth -= step
              break
            case 'ArrowRight':
              next.azimuth += step
              break
            case 'ArrowUp':
              next.elevation += step
              break
            case 'ArrowDown':
              next.elevation -= step
              break
            case 'Home':
              onChange(DEFAULT_VIEW)
              event.preventDefault()
              return
            default:
              return
          }
          event.preventDefault()
          onChange(clampView(next))
        }}
      >
        <span
          className={styles.handle}
          aria-hidden='true'
          style={{
            left: `calc(var(--pad-inset) + (100% - 2 * var(--pad-inset)) * ${x})`,
            top: `calc(var(--pad-inset) + (100% - 2 * var(--pad-inset)) * ${y})`,
          }}
        />
      </button>
      <span id={hintId} className={styles.hint}>
        拖动调整角度 · 方向键微调 · 回车复位
      </span>
    </div>
  )
}

export default RotationPad
