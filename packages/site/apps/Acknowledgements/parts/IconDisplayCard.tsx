import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import React from 'react'

import styles from './IconDisplayCard.module.scss'

import { BasicDisplayItem } from '../data'

interface IconDisplayCardProps {
  data: BasicDisplayItem
}

const Media = ({ image }: { image: string }): JSX.Element => (
  <div
    className={styles.media}
    style={{
      backgroundImage: `url(${image})`,
    }}
  />
)

const IconDisplayCard = ({
  data: { url, image, title },
}: IconDisplayCardProps): JSX.Element => {
  const handleVisit = (): void => {
    window.open(url)
  }
  return (
    <Card className={styles.iconDisplayCard}>
      <CardActionArea className={styles.left}>
        <CardContent>
          <Media image={image || ''} />
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.actions}>
        <Typography
          variant='body2'
          color='textSecondary'
          component='span'
          align='center'
        >
          {title}
        </Typography>
        {url && (
          <Button size='small' color='primary' onClick={handleVisit}>
            访问
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default IconDisplayCard
