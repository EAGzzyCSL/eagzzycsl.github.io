import { MenuRounded as MenuRoundedIcon } from '@mui/icons-material'
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import cx from 'classnames'
import React, { useState } from 'react'

import { useMyRouter } from '@/router'

import AppBarHomeButton from './AppBarHomeButton'
import styles from './SimpleAppBar.module.scss'

const TOOLTIP_DELAY = 800

interface SimpleAppBarProps {
  inverse?: boolean
  whiteBg?: boolean
  sticky?: boolean
  title?: string
  mainContent?: JSX.Element
  hideMenuIcon?: boolean
  extraIcons?: {
    visible?: 'always' | 'never' | 'portraitOnly'
    component: JSX.Element
    tooltip: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  }[]
}

const SimpleAppBar = ({
  title,
  inverse,
  whiteBg,
  sticky,
  mainContent,
  hideMenuIcon,
  extraIcons,
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
      className={cx(styles.simpleAppBar, {
        [styles.whiteBg]: whiteBg,
      })}
      position={sticky ? 'sticky' : 'static'}
      elevation={inverse ? 0 : undefined}
      color={inverse ? 'transparent' : 'primary'}
    >
      <Toolbar>
        <AppBarHomeButton inverse={inverse} />

        <div className={styles.mainContent}>
          {/* 如果定义了mainContent就不展示title */}
          {mainContent}
          {title && (
            <Typography
              component='h1'
              variant='h6'
              className={styles.title}
              color={inverse ? 'primary' : 'inherit'}
            >
              {title}
            </Typography>
          )}
        </div>

        <div>
          {extraIcons
            ?.filter(item => item.visible !== 'never')
            .map((ei, index) => (
              <Tooltip
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                title={ei.tooltip}
                enterDelay={TOOLTIP_DELAY}
              >
                <IconButton
                  className={cx({
                    [styles.extraIconPortrait]: ei.visible === 'portraitOnly',
                  })}
                  color={inverse ? 'primary' : 'inherit'}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    if (ei.onClick) {
                      ei.onClick(event)
                    }
                  }}
                >
                  {ei.component}
                </IconButton>
              </Tooltip>
            ))}
          {!hideMenuIcon && (
            <Tooltip title='菜单项' enterDelay={TOOLTIP_DELAY}>
              <IconButton
                color={inverse ? 'primary' : 'inherit'}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  handleShowMenu(event)
                }}
              >
                <MenuRoundedIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>

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
  whiteBg: false,
  sticky: false,
  mainContent: undefined,
  hideMenuIcon: false,
  extraIcons: [],
}

export default SimpleAppBar
