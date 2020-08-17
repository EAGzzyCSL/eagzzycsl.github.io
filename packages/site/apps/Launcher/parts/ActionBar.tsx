import Button from '@material-ui/core/Button'
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded'
import StopRoundedIcon from '@material-ui/icons/StopRounded'
import React from 'react'

import styles from './ActionBar.module.scss'

const ActionBar = (): JSX.Element => {
  return (
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
}

export default ActionBar
