import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Button,
} from '@/ui/material'

import styles from './SimpleError.module.scss'

interface SimpleErrorProps {
  message: string
  onConfirm: () => void
}

const SimpleError = ({ message, onConfirm }: SimpleErrorProps): JSX.Element => (
  <Dialog open className={styles.simpleError}>
    <DialogTitle>发生错误</DialogTitle>
    <DialogContent className={styles.content}>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onConfirm} autoFocus>
        知道了
      </Button>
    </DialogActions>
  </Dialog>
)

export default SimpleError
