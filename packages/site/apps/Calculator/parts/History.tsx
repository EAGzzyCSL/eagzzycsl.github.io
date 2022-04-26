import React, { useState } from 'react'

import {
  CloseRounded as CloseRoundedIcon,
  DeleteOutlineRounded as DeleteOutlineRoundedIcon,
  EditRounded as EditRoundedIcon,
} from '@mui/icons-material'
import {
  Button,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

import styles from './History.module.scss'

export interface HistoryItem {
  id: number
  content: string[]
}

interface HistoryProps {
  data: {
    head: string[]
    list: HistoryItem[]
  }
  onRemoveItem: (id: number) => void
  onReportItem: (id: number) => void
  onInsertItem: (historyItem: HistoryItem) => void
}

const History = ({
  data,
  onRemoveItem,
  onReportItem,
  onInsertItem,
}: HistoryProps): JSX.Element => {
  const { head, list } = data
  const headLabels = ['序号', ...head, '操作']

  const [snackBarVisible, setSnackBarVisible] = useState(false)

  const [recentRemovedItem, setRecentRemovedItem] =
    useState<HistoryItem | null>(null)

  const handleCloseSnackBar = (): void => {
    setSnackBarVisible(false)
  }

  const handleShowSnackBar = (): void => {
    setSnackBarVisible(true)
  }

  const handleRecallItemRemove = (): void => {
    if (recentRemovedItem) {
      onInsertItem(recentRemovedItem)
    }
  }

  const handleRemoveItem = (historyItem: HistoryItem): void => {
    onRemoveItem(historyItem.id)
    setRecentRemovedItem(historyItem)
    handleShowSnackBar()
  }

  return (
    <section className={styles.history}>
      <Typography variant='h5' component='h1' color='primary' gutterBottom>
        历史记录
      </Typography>
      <TableContainer>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              {headLabels.map((label, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <TableCell key={index} align='center'>
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(row => (
              <TableRow key={row.id}>
                <TableCell component='th' align='center' color='secondary'>
                  <Typography
                    component='span'
                    variant='inherit'
                    color='secondary'
                  >
                    #{row.id}
                  </Typography>
                </TableCell>
                {row.content.map((cell, cellIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TableCell key={cellIndex} align='center'>
                    {cell}
                  </TableCell>
                ))}
                <TableCell align='center'>
                  <IconButton onClick={() => onReportItem(row.id)} size='large'>
                    <EditRoundedIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleRemoveItem(row)}
                    size='large'
                  >
                    <DeleteOutlineRoundedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {recentRemovedItem && (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={snackBarVisible}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
          message={`记录 #${recentRemovedItem.id} 已移除`}
          action={
            <>
              <Button
                color='secondary'
                size='small'
                onClick={handleRecallItemRemove}
              >
                撤销
              </Button>
              <IconButton
                size='small'
                color='inherit'
                onClick={handleCloseSnackBar}
              >
                <CloseRoundedIcon fontSize='small' />
              </IconButton>
            </>
          }
        />
      )}
    </section>
  )
}

export default History
