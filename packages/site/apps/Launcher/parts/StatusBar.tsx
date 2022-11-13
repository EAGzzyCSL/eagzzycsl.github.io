import React from 'react'

import { observer } from 'mobx-react-lite'

import { ClearAllRoundedIcon, DoubleArrowRoundedIcon } from '@/ui/icons'
import { Backdrop } from '@/ui/material'

import useStore from '../store'

import styles from './StatusBar.module.scss'

const StatusBar = (): JSX.Element => {
  const { shellMaskVisible } = useStore()

  return (
    <section className={styles.statusBar}>
      <div className={styles.leftSentence}>
        <DoubleArrowRoundedIcon fontSize='small' />
        <span className={styles.sentence}>
          风老莺雏，雨肥梅子，午阴嘉树清圆
        </span>
      </div>
      <ClearAllRoundedIcon fontSize='small' />
      <Backdrop open={shellMaskVisible} />
    </section>
  )
}

export default observer(StatusBar)
