import React from 'react'

import {
  NavigateBeforeRounded as NavigateBeforeRoundedIcon,
  NavigateNextRounded as NavigateNextRoundedIcon,
  StopRounded as StopRoundedIcon,
} from '@mui/icons-material'
import { Backdrop, Button } from '@mui/material'
import { observer } from 'mobx-react-lite'

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
      <Button className={styles.navButton} onClick={() => onTablePrevious()}>
        <NavigateBeforeRoundedIcon fontSize='large' />
      </Button>
      <Button className={styles.navButton}>
        <StopRoundedIcon fontSize='large' />
      </Button>
      <Button className={styles.navButton} onClick={() => onTableNext()}>
        <NavigateNextRoundedIcon fontSize='large' />
      </Button>
      <Backdrop open={shellMaskVisible} />
    </div>
  )
}

export default observer(ActionBar)
