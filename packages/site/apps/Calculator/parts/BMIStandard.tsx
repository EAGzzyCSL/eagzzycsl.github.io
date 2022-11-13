import React, { useState } from 'react'

import { QuestionMarkRoundedIcon } from '@/ui/icons'
import {
  IconButton,
  Paper,
  Popover,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
} from '@/ui/material'

import theme from '../theme'

import styles from './BMIStandard.module.scss'

const standard = {
  title: 'WS/T 428-2013 成人体重判定',
  link: 'http://www.nhc.gov.cn/wjw/yingyang/201308/a233d450fdbc47c5ad4f08b7e394d1e8.shtml',
  table: [
    {
      type: '肥胖',
      range: 'BMI≥28.0',
    },
    {
      type: '超重',
      range: '24.0≤BMI<28.0',
    },
    {
      type: ' 体重正常',
      range: '18.5≤BMI<24.0',
    },
    {
      type: '体重过低',
      range: 'BMI<18.5',
    },
  ],
  notice: [
    '本标准适用于成人（18岁及以上）超重和肥胖判定。',
    '本标准不适用于特殊人群，如运动员、孕产妇等。',
  ],
} as const

const BMIStandard = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <div className={styles.bmiStandard}>
      <Paper className={styles.icon}>
        <IconButton size='small' onClick={handleClick}>
          <QuestionMarkRoundedIcon />
        </IconButton>
      </Paper>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={styles.panel}>
          <Link
            href={standard.link}
            variant='subtitle1'
            color='secondary'
            rel='noreferrer'
            target='_blank'
            underline='hover'
          >
            {standard.title}
          </Link>
          <TableContainer
            sx={{
              marginTop: '12px',
              borderTop: `solid 1px ${theme.palette.divider}`,
              borderLeft: `solid 1px ${theme.palette.divider}`,
              borderRight: `solid 1px ${theme.palette.divider}`,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>分类</TableCell>
                  <TableCell align='center'>
                    BMI值 kg/m<sup>2</sup>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {standard.table.map(item => (
                  <TableRow key={item.type}>
                    <TableCell component='th' scope='row' align='center'>
                      {item.type}
                    </TableCell>
                    <TableCell align='center'>{item.range}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ul className={styles.notice}>
            {standard.notice.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Popover>
    </div>
  )
}

export default BMIStandard
