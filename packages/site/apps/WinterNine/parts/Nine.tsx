import React from 'react'

import CharBlock from './CharBlock'
import styles from './Nine.module.scss'

interface NineProps {
  // 表示入九第几天，取值[1-90]
  dayIndex: number
}
const Nine = ({ dayIndex }: NineProps): JSX.Element => {
  // 几九
  const nineOrder = Math.ceil(dayIndex / 9)
  // 第几天
  const dayOrder = 9 - (nineOrder * 9 - dayIndex)
  return (
    <section className={styles.nine}>
      <section className={styles.nineContainer}>
        {Array(9)
          .fill(0)
          .map((item, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              <CharBlock
                charIndex={index}
                currentStroke={
                  // 10表示完全绘制完毕，0表示不绘制，其余数字x表示先画完x-1笔再以动画形式展示第x笔
                  // eslint-disable-next-line no-nested-ternary
                  index < nineOrder - 1
                    ? 10
                    : index === nineOrder - 1
                    ? dayOrder
                    : 0
                }
              />
            </div>
          ))}
      </section>
    </section>
  )
}
export default Nine
