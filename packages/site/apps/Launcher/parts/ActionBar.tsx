import { Button } from '@material-ui/core'
import {
  NavigateBeforeRounded as NavigateBeforeRoundedIcon,
  NavigateNextRounded as NavigateNextRoundedIcon,
  StopRounded as StopRoundedIcon,
} from '@material-ui/icons'
import React from 'react'

import styles from './ActionBar.module.scss'

const ActionBar = (): JSX.Element => (
  <div className={styles.actionBar}>
    <Button className={styles.navButton} size='large'>
      <NavigateBeforeRoundedIcon fontSize='large' />
    </Button>
    <Button className={styles.navButton} size='large'>
      <StopRoundedIcon fontSize='large' />
    </Button>
    <Button className={styles.navButton} size='large'>
      <NavigateNextRoundedIcon fontSize='large' />
    </Button>
  </div>
)

export default ActionBar
