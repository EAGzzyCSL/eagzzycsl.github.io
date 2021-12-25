import {
  NavigateBeforeRounded as NavigateBeforeRoundedIcon,
  NavigateNextRounded as NavigateNextRoundedIcon,
  StopRounded as StopRoundedIcon,
} from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

import styles from './ActionBar.module.scss'

interface ActionBarProps {
  onTablePrevious: () => void
  onTableNext: () => void
}

const ActionBar = (props: ActionBarProps): JSX.Element => {
  const { onTablePrevious, onTableNext } = props
  return (
    <div className={styles.actionBar}>
      <Button className={styles.navButton} onClick={() => onTablePrevious()}>
        <NavigateBeforeRoundedIcon fontSize='large' />
      </Button>
      <Button className={styles.navButton}>
        <StopRoundedIcon fontSize='large' />
      </Button>
      <Button className={styles.navButton} onClick={() => onTableNext()}>
        <NavigateNextRoundedIcon fontSize='large' />
      </Button>
    </div>
  )
}

export default ActionBar
