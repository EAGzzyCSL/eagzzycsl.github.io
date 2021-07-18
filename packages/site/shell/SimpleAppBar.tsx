import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import React from 'react'

import AppBarHomeButton from './AppBarHomeButton'
import styles from './SimpleAppBar.module.scss'

interface SimpleAppBarProps {
  title: string
  inverse?: boolean
}

const SimpleAppBar = ({ title, inverse }: SimpleAppBarProps): JSX.Element => (
  <AppBar
    className={styles.simpleAppBar}
    position='static'
    elevation={inverse ? 0 : undefined}
    color={inverse ? 'transparent' : 'primary'}
  >
    <Toolbar>
      <AppBarHomeButton inverse={inverse} />
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

SimpleAppBar.defaultProps = {
  inverse: false,
}
export default SimpleAppBar
