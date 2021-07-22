import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import React from 'react'

import AppBarHomeButton from './AppBarHomeButton'
import styles from './SimpleAppBar.module.scss'

interface SimpleAppBarProps {
  title?: string
  inverse?: boolean
  mainContent?: JSX.Element
  endIcon?: JSX.Element
  onEndIconClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const SimpleAppBar = ({
  title,
  inverse,
  mainContent,
  endIcon,
  onEndIconClick,
}: SimpleAppBarProps): JSX.Element => (
  <AppBar
    className={styles.simpleAppBar}
    position='static'
    elevation={inverse ? 0 : undefined}
    color={inverse ? 'transparent' : 'primary'}
  >
    <Toolbar>
      <AppBarHomeButton inverse={inverse} />

      <div className={styles.mainContent}>
        {mainContent}
        {title && (
          <Typography
            component='h1'
            variant='h6'
            color={inverse ? 'primary' : 'initial'}
          >
            {title}
          </Typography>
        )}
      </div>

      {endIcon && (
        <IconButton
          edge='end'
          color={inverse ? 'primary' : 'inherit'}
          onClick={onEndIconClick}
        >
          {endIcon}
        </IconButton>
      )}
    </Toolbar>
  </AppBar>
)

SimpleAppBar.defaultProps = {
  title: '',
  inverse: false,
  mainContent: undefined,
  endIcon: <MenuRoundedIcon />,
  onEndIconClick: () => {},
}
export default SimpleAppBar
