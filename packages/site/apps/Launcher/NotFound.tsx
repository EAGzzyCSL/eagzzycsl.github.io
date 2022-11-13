import React from 'react'

import { GetStaticPropsResult } from 'next'

import { SentimentDissatisfiedRoundedIcon } from '@/ui/icons'
import { Typography } from '@/ui/material'

import styles from './NotFound.module.scss'

const NotFound = (): JSX.Element => (
  <section className={styles.notFound}>
    <SentimentDissatisfiedRoundedIcon
      style={{
        fontWeight: 'lighter',
        fontSize: '80px',
      }}
    />
    <Typography variant='h2' component='h1'>
      404 Not Found
    </Typography>
  </section>
)

export default NotFound

export const getStaticProps = (): GetStaticPropsResult<unknown> => ({
  props: {},
})
