import Typography from '@material-ui/core/Typography'
import SentimentDissatisfiedRoundedIcon from '@material-ui/icons/SentimentDissatisfiedRounded'
import { GetStaticPropsResult } from 'next'
import React from 'react'

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
