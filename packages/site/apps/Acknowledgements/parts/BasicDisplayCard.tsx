import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core'
import React from 'react'

import styles from './BasicDisplayCard.module.scss'

import { BasicDisplayItem } from '../data'

interface BasicDisplayCardProps {
  data: BasicDisplayItem
}
const BasicDisplayCard = ({
  data: { title, url, brief },
}: BasicDisplayCardProps): JSX.Element => {
  const handleVisit = (): void => {
    window.open(url)
  }
  return (
    <Card className={styles.basicDisplayCard}>
      <CardActionArea className={styles.top}>
        <Typography
          variant='h3'
          color='textPrimary'
          component='span'
          align='center'
        >
          {title}
        </Typography>
        <CardContent>
          <Typography
            variant='body2'
            color='textSecondary'
            component='span'
            align='center'
          >
            {brief}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary' onClick={handleVisit}>
          访问
        </Button>
      </CardActions>
    </Card>
  )
}

export default BasicDisplayCard
