import React from 'react'

import {
  Typography,
  CircularProgress,
  Dialog,
  DialogContent,
} from '@mui/material'

import styles from './SimpleLoading.module.scss'

interface SimpleLoadingProps {
  title: string
}

const SimpleLoading = ({ title }: SimpleLoadingProps): JSX.Element => (
  <Dialog open className={styles.simpleLoading}>
    <DialogContent>
      <div className={styles.content}>
        <CircularProgress color='primary' />
        <Typography
          className={styles.title}
          color='text.secondary'
          variant='body1'
        >
          {title}
        </Typography>
      </div>
    </DialogContent>
  </Dialog>
)

export default SimpleLoading
