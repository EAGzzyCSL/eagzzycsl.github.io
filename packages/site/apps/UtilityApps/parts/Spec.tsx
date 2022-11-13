import React from 'react'

import { IconButton, Tooltip, Typography } from '@/ui/material'

import { Specification } from '../type'

import styles from './Spec.module.scss'

export const SpecIcon = ({ icon }: { icon: string }): JSX.Element => (
  <IconButton size='small'>
    <img className={styles.specIcon} src={icon} />
  </IconButton>
)

export const SpecIcons = ({
  specs,
}: {
  specs: Specification[]
}): JSX.Element => (
  <div className={styles.infoIcons}>
    {specs.length ? (
      specs.map(spec => (
        <Tooltip key={spec.brief} title={spec.brief} arrow>
          <IconButton size='small'>
            <img className={styles.specIcon} src={spec.icon} />
          </IconButton>
        </Tooltip>
      ))
    ) : (
      <Typography color='lightgray'>—</Typography>
    )}
  </div>
)
