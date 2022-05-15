import React, { useEffect, useState } from 'react'

import SwiperClass, { Pagination, Keyboard, Mousewheel } from 'swiper'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination'
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react'

import { useStore } from '@/hooks'

import styles from './DesktopTable.module.scss'

interface DesktopTableProps {
  tables: JSX.Element[]
  currentTableIndex: number
  updateCurrentTableIndex: (index: number) => void
}

const DesktopTable = (props: DesktopTableProps): JSX.Element => {
  const { tables, currentTableIndex, updateCurrentTableIndex } = props
  const store = useStore()

  useEffect(() => {
    store.shellStore.reportDesktopTableCount(tables.length)
  }, [store.shellStore, tables])

  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

  useEffect(() => {
    swiper?.slideTo(currentTableIndex)
  }, [swiper, currentTableIndex])

  return (
    <section className={styles.desktopTable}>
      <Swiper
        className={styles.swiper}
        modules={[Pagination, Keyboard, Mousewheel]}
        pagination={{
          clickable: true,
          bulletClass: styles.bullet,
          bulletActiveClass: styles.bulletActive,
        }}
        mousewheel
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        onSwiper={swiper => {
          // 初始化时切到currentTableIndex
          swiper.slideTo(currentTableIndex, 0)
          setSwiper(swiper)
        }}
        onActiveIndexChange={swiper => {
          updateCurrentTableIndex(swiper.activeIndex)
        }}
      >
        {tables.map((table, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SwiperSlide key={index} className={styles.swiperSlide}>
            {table}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default DesktopTable
