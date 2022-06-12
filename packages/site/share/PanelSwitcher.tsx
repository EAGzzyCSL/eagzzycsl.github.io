import React from 'react'

import cx from 'classnames'

import styles from './PanelSwitcher.module.scss'

interface PanelSwitcherProps {
  panels: { id: string; component: () => JSX.Element }[]
  selectedPanelIndex: number
}

const PanelSwitcher = (props: PanelSwitcherProps): JSX.Element => {
  const { panels, selectedPanelIndex } = props
  return (
    <div className={styles.panelSwitcher}>
      {panels.map((item, index) => {
        const Panel = item.component
        return (
          <div
            key={item.id}
            className={cx(styles.panelContainer, {
              [styles.show]: index === selectedPanelIndex,
            })}
          >
            <Panel />
          </div>
        )
      })}
    </div>
  )
}

export default PanelSwitcher
