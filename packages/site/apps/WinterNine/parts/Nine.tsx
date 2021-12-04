import React from 'react'

import CharBlock from './CharBlock'
import styles from './Nine.module.scss'

interface NineProps {
  // 表示入九第几天，取值[1-81]
  dayIndex: number
  lastAnimateStrokeTimeout: number
}

const Nine = ({
  dayIndex,
  lastAnimateStrokeTimeout,
}: NineProps): JSX.Element => (
  <section className={styles.nine}>
    <section className={styles.nineContainer}>
      {Array(9)
        .fill(0)
        .map((item, index) => {
          // 假设前一个字都填满笔画了，还剩下left画未填
          const left = dayIndex - index * 9
          // 每个字上填最少0画最多9画
          const currentStroke = Math.max(0, Math.min(left, 9))
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              {/* 这里不对，得写个ut算 */}
              <CharBlock
                charIndex={index}
                currentStroke={currentStroke}
                // 只有剩余[1,9]画才说明是最后一个字
                animateLastStroke={left <= 9 && left > 0}
                lastAnimateStrokeTimeout={lastAnimateStrokeTimeout}
              />
            </div>
          )
        })}
    </section>
  </section>
)
export default Nine
