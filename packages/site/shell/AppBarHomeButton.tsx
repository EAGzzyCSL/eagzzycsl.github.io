/**
 * 用于页面AppBar上的返回按钮
 * 如果页面是从上层页面跳转进入，按钮呈现为返回icon，否则呈现为home icon
 */
import React from 'react'

import { useMyRouter } from '@/router'
import { ArrowBackRoundedIcon, HomeRoundedIcon } from '@/ui/icons'
import { IconButton } from '@/ui/material'
import Logger from '@/utils/logger'

interface AppBarHomeButtonProps {
  inverse?: boolean
}

const AppBarHomeButton = (props: AppBarHomeButtonProps): JSX.Element => {
  const { inverse } = props

  const router = useMyRouter()

  const handleBack = (): void => {
    router.backToParent().catch(e => {
      Logger.myRouter.error('跳转失败', e)
    })
  }

  return (
    <IconButton
      edge='start'
      color={inverse ? 'primary' : 'inherit'}
      onClick={handleBack}
    >
      {router.couldBack() ? <ArrowBackRoundedIcon /> : <HomeRoundedIcon />}
    </IconButton>
  )
}

AppBarHomeButton.defaultProps = {
  inverse: false,
}
export default AppBarHomeButton
