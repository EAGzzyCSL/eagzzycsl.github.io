import React from 'react'

import styles from './PanelContainer.module.scss'

interface PanelContainerProps {
  board: JSX.Element
  control: JSX.Element
}
const PanelContainer = (props: PanelContainerProps): JSX.Element => {
  const { board, control } = props
  return (
    <div className={styles.panelContainer}>
      <div className={styles.content}>
        <div className={styles.board}>{board}</div>
        <div className={styles.control}>{control}</div>
      </div>
    </div>
  )
}

export default PanelContainer
