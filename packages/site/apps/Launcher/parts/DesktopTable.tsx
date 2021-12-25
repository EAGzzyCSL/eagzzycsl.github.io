import cx from 'classnames'
import throttle from 'lodash/throttle'
import React, { useEffect, useRef, useMemo } from 'react'

import useStore from '@/hooks/useStore'

import styles from './DesktopTable.module.scss'

interface DesktopTableProps {
  tables: JSX.Element[]
  currentTableIndex: number
  onTablePrevious: () => void
  onTableNext: () => void
  updateCurrentTableIndex: (index: number) => void
}

const WheelTriggerTableSwitchThreshold = 8

const WheelTriggerTableSwitchThrottleDuration = 500

const DesktopTable = (props: DesktopTableProps): JSX.Element => {
  const {
    tables,
    currentTableIndex,
    updateCurrentTableIndex,
    onTablePrevious,
    onTableNext,
  } = props
  const store = useStore()

  useEffect(() => {
    store.shellStore.reportDesktopTableCount(tables.length)
  }, [store.shellStore, tables])

  const onTablePreviousRef = useRef(() => {})
  onTablePreviousRef.current = onTablePrevious
  const onTableNextRef = useRef(() => {})
  onTableNextRef.current = onTableNext

  const throttledOnTablePrevious = useMemo(
    () =>
      throttle(
        () => {
          onTablePreviousRef.current()
        },
        WheelTriggerTableSwitchThrottleDuration,
        {
          trailing: false,
        },
      ),
    [onTablePreviousRef],
  )

  const throttledOnTableNext = useMemo(
    () =>
      throttle(
        () => {
          onTableNextRef.current()
        },
        WheelTriggerTableSwitchThrottleDuration,
        {
          trailing: false,
        },
      ),
    [onTableNextRef],
  )

  return (
    <section
      className={styles.desktopTable}
      // 支持左右滚动切换桌面
      onWheel={e => {
        const { deltaX } = e
        if (deltaX > WheelTriggerTableSwitchThreshold) {
          throttledOnTableNext()
        } else if (deltaX < -WheelTriggerTableSwitchThreshold) {
          throttledOnTablePrevious()
        }
      }}
    >
      <div className={styles.table}>
        <div
          className={styles.tableList}
          style={{
            width: `${tables.length * 100}%`,
            transform: `translateX(-${
              (100 / tables.length) * currentTableIndex
            }%)`,
          }}
        >
          {tables.map((table, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className={styles.tableItem} key={index}>
              {table}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.indicator}>
        <div className={styles.indicatorList}>
          {tables.map((table, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={cx(styles.indicatorItem, {
                [styles.active]: index === currentTableIndex,
              })}
              onClick={() => {
                updateCurrentTableIndex(index)
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default DesktopTable
