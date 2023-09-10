import React, { useState } from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { Card } from '@/ui/material'
import { dayjs } from '@/utils/date'

import styles from './CalendarCard.module.scss'

const CalendarCard = (): JSX.Element => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs())

  return (
    <Card className={styles.calendarCard}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          // 暴力魔改日历样式
          classes={{
            root: styles.calendarPickerRoot,
            viewTransitionContainer:
              styles.calendarPickerViewTransitionContainer,
          }}
          value={date}
          onChange={newDate => {
            setDate(newDate)
          }}
        />
      </LocalizationProvider>
    </Card>
  )
}

export default CalendarCard
