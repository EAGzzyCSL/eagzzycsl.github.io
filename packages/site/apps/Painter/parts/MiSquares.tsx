import React from 'react'

import styles from './MiSquares.module.scss'

interface MiSquareProps {
  text: string
}

const MiSquare = ({ text }: MiSquareProps): JSX.Element => (
  <div className={styles.miSquares}>
    {text.split('').map((char, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div className={styles.squareBorder} key={index}>
        <div className={styles.square}>
          <div className={styles.bg}>
            <div className={styles.lineHorizontal} />
            <div className={styles.lineVertical} />
            <div className={styles.lineLt2Rb} />
            <div className={styles.lineRt2Lb} />
          </div>
          <div className={styles.char}>{char}</div>
        </div>
      </div>
    ))}
  </div>
)

export default MiSquare
