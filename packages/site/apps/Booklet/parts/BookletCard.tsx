import React from 'react'

import { Paper, Typography } from '@/ui/material'

import theme from '../theme'

import styles from './BookletCard.module.scss'

interface IBookletCard {
  name: string
  onNav: () => void
}

const BookletCard = (props: IBookletCard): JSX.Element => {
  const { name, onNav } = props
  return (
    <section
      className={styles.bookletCard}
      onClick={() => {
        onNav()
      }}
    >
      <Paper
        square
        className={styles.paper}
        style={{
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <div className={styles.binding} />
        <Typography variant='h4' className={styles.title}>
          {name}
        </Typography>
      </Paper>
    </section>
  )
}

export default BookletCard
