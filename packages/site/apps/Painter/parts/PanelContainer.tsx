import React from 'react'

import cx from 'classnames'

import styles from './PanelContainer.module.scss'

interface PanelContainerProps {
  board: JSX.Element
  control: JSX.Element
  size?: 'small' | 'normal' | 'large'
}

const PanelContainer = (props: PanelContainerProps): JSX.Element => {
  const { board, control, size } = props
  return (
    <div className={styles.panelContainer}>
      <div className={styles.content}>
        <div
          className={cx(styles.board, {
            [styles.small]: size === 'small',
            [styles.normal]: size === 'normal',
            [styles.large]: size === 'large',
          })}
        >
          {board}
        </div>
        <div className={styles.control}>{control}</div>
      </div>
    </div>
  )
}

PanelContainer.defaultProps = {
  size: 'normal',
}

export default PanelContainer
