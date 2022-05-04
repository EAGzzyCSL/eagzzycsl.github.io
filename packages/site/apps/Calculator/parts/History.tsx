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

import { IHistoryItem } from '../types/history'

import styles from './History.module.scss'

interface HistoryProps {
  head: string[]
  list: IHistoryItem[]
  onRemoveItem: (itemIndex: number) => void
  onReUseItem: (itemIndex: number) => void
  onRepealItemDelete: (
    itemOriginalIndex: number,
    historyItem: IHistoryItem,
  ) => void
}

const History = ({
  head,
  list,
  onRemoveItem,
  onReUseItem: onReuseItem,
  onRepealItemDelete,
}: HistoryProps): JSX.Element => {
  const headLabels = ['序号', ...head, '操作']

  const [snackBarVisible, setSnackBarVisible] = useState(false)

  const [recentRemovedItem, setRecentRemovedItem] =
    useState<IHistoryItem | null>(null)

  const [recentRemovedItemIndex, setRecentRemovedItemIndex] = useState(0)

  const handleCloseSnackBar = (): void => {
    setSnackBarVisible(false)
  }

  // FIXME: 如果同时删除两个snackBar只会展示一个并用第二个的内容覆盖第一个
  const handleShowSnackBar = (): void => {
    setSnackBarVisible(true)
  }

  const handleRepealItemDelete = (
    itemOriginalIndex: number,
    historyItem: IHistoryItem,
  ): void => {
    if (historyItem) {
      onRepealItemDelete(itemOriginalIndex, historyItem)
    }
  }

  const handleRemoveItem = (itemIndex: number): void => {
    onRemoveItem(itemIndex)
    setRecentRemovedItem(list[itemIndex])
    setRecentRemovedItemIndex(itemIndex)
    handleShowSnackBar()
  }

  return (
    <section className={styles.history}>
      <Typography variant='h5' component='h1' color='primary' gutterBottom>
        历史记录
      </Typography>
      <TableContainer className={styles.table}>
        <Table stickyHeader size='small'>
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
            {list.map((row, index) => (
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
                  <IconButton onClick={() => onReuseItem(index)} size='large'>
                    <EditRoundedIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleRemoveItem(index)}
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
                onClick={() =>
                  handleRepealItemDelete(
                    recentRemovedItemIndex,
                    recentRemovedItem,
                  )
                }
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
