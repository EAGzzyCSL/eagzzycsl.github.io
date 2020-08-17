import ClearAllRoundedIcon from '@material-ui/icons/ClearAllRounded'
import DoubleArrowRoundedIcon from '@material-ui/icons/DoubleArrowRounded'
import React from 'react'

import styles from './StatusBar.module.scss'

const StatusBar = (): JSX.Element => {
  return (
    <section className={styles.statusBar}>
      <div className={styles.leftSentence}>
        <DoubleArrowRoundedIcon fontSize='small' />
        <span className={styles.sentence}>
          风老莺雏，雨肥梅子，午阴嘉树清圆
        </span>
      </div>
      <ClearAllRoundedIcon fontSize='small' />
    </section>
  )
}

export default StatusBar
