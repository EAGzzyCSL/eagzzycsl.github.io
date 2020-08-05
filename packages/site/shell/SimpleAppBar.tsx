import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import { useRouter } from 'next/router'
import React from 'react'

import styles from './SimpleAppBar.module.scss'

interface SimpleAppBarProps {
  title: string
  inverse?: boolean
}

const SimpleAppBar = ({ title, inverse }: SimpleAppBarProps): JSX.Element => {
  const router = useRouter()

  const handleBack = (): void => {
    router.back()
  }

  return (
    <AppBar
      className={styles.simpleAppBar}
      position='static'
      elevation={inverse ? 0 : undefined}
      color={inverse ? 'transparent' : 'primary'}
    >
      <Toolbar>
        <IconButton
          edge='start'
          color={inverse ? 'primary' : 'inherit'}
          onClick={handleBack}
        >
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography
          className={styles.title}
          component='h1'
          variant='h6'
          color={inverse ? 'primary' : 'initial'}
        >
          {title}
        </Typography>
        <IconButton edge='end' color={inverse ? 'primary' : 'inherit'}>
          <MenuRoundedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

SimpleAppBar.defaultProps = {
  inverse: false,
}
export default SimpleAppBar
