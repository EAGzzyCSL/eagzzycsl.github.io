import React from 'react'

import { Button, Link } from '@mui/material'
import cx from 'classnames'

import styles from './AckChip.module.scss'

interface AckChipProps {
  icon: string
  label: string
  url: string
}

const AckChip = (props: AckChipProps): JSX.Element => {
  const { icon, label, url } = props

  const handleClick = (): void => {
    window.open(url)
  }

  return (
    <div
      className={cx(styles.ackChip, {
        [styles.leftPadding]: !icon,
      })}
    >
      {icon && (
        <Button className={styles.icon} onClick={handleClick}>
          <img className={styles.image} src={icon} />
        </Button>
      )}
      <Link href='url' variant='caption' underline='hover' color='CaptionText'>
        {label}
      </Link>
    </div>
  )
}

export default AckChip
