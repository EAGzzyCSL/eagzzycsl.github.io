import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded'
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import React, { useState } from 'react'

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
                  <IconButton onClick={() => onReportItem(row.id)}>
                    <EditRoundedIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemoveItem(row)}>
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
