import React from 'react'

import { Typography, Paper, ButtonBase } from '@mui/material'
import { blueGrey as colorBlueGrey } from '@mui/material/colors'

import { INotification } from '../types'

import styles from './Notification.module.scss'

interface NotificationProps extends INotification {
  onClick: () => void
}

const headerColor = colorBlueGrey[500]

const Notification = (props: NotificationProps): JSX.Element => {
  const { icon, header, title, content, onClick } = props

  return (
    <ButtonBase className={styles.notification} onClick={onClick}>
      <Paper className={styles.container}>
        <div className={styles.header}>
          <div
            className={styles.icon}
            style={{
              color: headerColor,
            }}
          >
            {icon}
          </div>
          <Typography variant='body2' component='span' color={headerColor}>
            {header}
          </Typography>
        </div>
        <Typography variant='subtitle2'>{title}</Typography>
        <Typography color='text.secondary' variant='body2'>
          {content}
        </Typography>
      </Paper>
    </ButtonBase>
  )
}

export default Notification
