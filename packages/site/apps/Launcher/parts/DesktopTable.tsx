import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react-lite'
import SwiperClass, { Pagination, Keyboard, Mousewheel } from 'swiper'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination'
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react'

import useStore from '../store'

import styles from './DesktopTable.module.scss'

interface DesktopTableProps {
  tables: JSX.Element[]
}

const DesktopTable = (props: DesktopTableProps): JSX.Element => {
  const { tables } = props
  const store = useStore()
  const { shellMaskVisible, desktopCurrentTableIndex } = store

  useEffect(() => {
    store.reportDesktopTableCount(tables.length)
  }, [store, tables])

  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

  useEffect(() => {
    swiper?.slideTo(desktopCurrentTableIndex)
  }, [swiper, desktopCurrentTableIndex])

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
          swiper.slideTo(desktopCurrentTableIndex, 0)
          setSwiper(swiper)
        }}
        onActiveIndexChange={swiper => {
          store.updateDesktopCurrentTableIndex(swiper.activeIndex)
        }}
        allowSlidePrev={!shellMaskVisible}
        allowSlideNext={!shellMaskVisible}
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

export default observer(DesktopTable)
