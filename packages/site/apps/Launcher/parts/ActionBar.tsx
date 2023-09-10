import React from 'react'

import { observer } from 'mobx-react-lite'

import {
  NavigateBeforeRoundedIcon,
  NavigateNextRoundedIcon,
  StopRoundedIcon,
} from '@/ui/icons'
import { Backdrop, Button } from '@/ui/material'

import useStore from '../store'

import styles from './ActionBar.module.scss'

interface ActionBarProps {
  onTablePrevious: () => void
  onTableNext: () => void
}

const ActionBar = (props: ActionBarProps): JSX.Element => {
  const { onTablePrevious, onTableNext } = props
  const { shellMaskVisible } = useStore()
  return (
    <div className={styles.actionBar}>
      <Button
        className={styles.navButton}
        onClick={() => {
          onTablePrevious()
        }}
      >
        <NavigateBeforeRoundedIcon fontSize='large' />
      </Button>
      <Button className={styles.navButton}>
        <StopRoundedIcon fontSize='large' />
      </Button>
      <Button
        className={styles.navButton}
        onClick={() => {
          onTableNext()
        }}
      >
        <NavigateNextRoundedIcon fontSize='large' />
      </Button>
      <Backdrop open={shellMaskVisible} />
    </div>
  )
}

export default observer(ActionBar)
