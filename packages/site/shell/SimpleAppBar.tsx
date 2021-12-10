import { MenuRounded as MenuRoundedIcon } from '@mui/icons-material'
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material'
import React, { useState } from 'react'

import { useMyRouter } from '@/router'

import AppBarHomeButton from './AppBarHomeButton'
import styles from './SimpleAppBar.module.scss'

interface SimpleAppBarProps {
  title?: string
  inverse?: boolean
  sticky?: boolean
  mainContent?: JSX.Element
  endIcon?: JSX.Element
  onEndIconClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const SimpleAppBar = ({
  title,
  inverse,
  sticky,
  mainContent,
  endIcon,
  onEndIconClick,
}: SimpleAppBarProps): JSX.Element => {
  const router = useMyRouter()

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)

  const handleShowMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setMenuAnchor(event.currentTarget)
  }
  const handleCloseMenu = (): void => {
    setMenuAnchor(null)
  }

  return (
    <AppBar
      className={styles.simpleAppBar}
      position={sticky ? 'sticky' : 'static'}
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
              color={inverse ? 'primary' : 'inherit'}
            >
              {title}
            </Typography>
          )}
        </div>

        {endIcon && (
          <IconButton
            edge='end'
            color={inverse ? 'primary' : 'inherit'}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              // 临时方案，如果endIcon是menu就展示默认菜单
              if (
                endIcon === SimpleAppBar.defaultProps.endIcon
                // endIcon?.type?.type?.render?.displayName === 'MenuRoundedIcon'
              ) {
                handleShowMenu(event)
              } else if (onEndIconClick) {
                onEndIconClick(event)
              }
            }}
          >
            {endIcon}
          </IconButton>
        )}
        <Menu
          anchorEl={menuAnchor}
          open={!!menuAnchor}
          onClose={() => {
            handleCloseMenu()
          }}
        >
          <MenuItem
            onClick={() => {
              router.push('About', '/')
              handleCloseMenu()
            }}
          >
            关于本站
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push('Acknowledgements', '/')
              handleCloseMenu()
            }}
          >
            版权致谢
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push('Launcher', '/')
              handleCloseMenu()
            }}
          >
            回到首页
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

SimpleAppBar.defaultProps = {
  title: '',
  inverse: false,
  sticky: false,
  mainContent: undefined,
  endIcon: <MenuRoundedIcon />,
  onEndIconClick: () => {},
}

export default SimpleAppBar
