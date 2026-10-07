import React from 'react'

import cx from 'classnames'

import styles from './MiSquare.module.scss'

interface MiSquareProps {
  children: React.JSX.Element
  noBorderTop?: boolean
  noBorderRight?: boolean
  noBorderBottom?: boolean
  noBorderLeft?: boolean
}

const MiSquare = ({
  children,
  noBorderTop = false,
  noBorderRight = false,
  noBorderBottom = false,
  noBorderLeft = false,
}: MiSquareProps): React.JSX.Element => (
  <div
    className={cx(styles.miSquare, {
      [styles.noBorderTop]: noBorderTop,
      [styles.noBorderRight]: noBorderRight,
      [styles.noBorderBottom]: noBorderBottom,
      [styles.noBorderLeft]: noBorderLeft,
    })}
  >
    <div className={styles.square}>
      <div className={styles.bg}>
        <div className={styles.lineHorizontal} />
        <div className={styles.lineVertical} />
        <div className={styles.lineLt2Rb} />
        <div className={styles.lineRt2Lb} />
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  </div>
)

export default MiSquare
