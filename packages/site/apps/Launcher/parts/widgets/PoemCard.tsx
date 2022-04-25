import React from 'react'

import { Card, CardContent, Typography } from '@mui/material'

import styles from './PoemCard.module.scss'

const PoemCard = (): JSX.Element => (
  <Card className={styles.poemCard}>
    <CardContent>
      <Typography variant='h4' color='primary' gutterBottom>
        摊破浣溪沙
      </Typography>
      <Typography gutterBottom variant='subtitle2'>
        李璟
      </Typography>
      <Typography
        variant='body1'
        component='p'
        color='textSecondary'
        gutterBottom
      >
        手卷真珠上玉钩，依前春恨锁重楼。
      </Typography>
      <Typography
        variant='body1'
        component='p'
        color='textSecondary'
        gutterBottom
      >
        风里落花谁是主？思悠悠。
      </Typography>
      <Typography
        variant='body1'
        component='p'
        color='textSecondary'
        gutterBottom
      >
        青鸟不传云外信，丁香空结雨中愁。
      </Typography>
      <Typography
        variant='body1'
        component='p'
        color='textSecondary'
        gutterBottom
      >
        回首绿波三楚暮，接天流。
      </Typography>
    </CardContent>
  </Card>
)

export default PoemCard
