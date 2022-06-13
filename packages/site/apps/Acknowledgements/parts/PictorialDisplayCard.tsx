import React from 'react'

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import cx from 'classnames'

import { PictorialDisplayItem } from '../type'

import styles from './PictorialDisplayCard.module.scss'

const Content = ({
  title,
  brief,
}: {
  title: string
  brief: string
}): JSX.Element => (
  <CardContent>
    <Typography gutterBottom variant='h5' component='h2'>
      {title}
    </Typography>
    <Typography variant='body2' color='textSecondary' component='p'>
      {brief}
    </Typography>
  </CardContent>
)

const Action = ({ url }: { url: string }): JSX.Element => {
  const handleVisit = (): void => {
    window.open(url)
  }
  return (
    <CardActions>
      <Button size='small' color='primary' onClick={handleVisit}>
        访问
      </Button>
    </CardActions>
  )
}

interface MediaProps {
  image: string
}

const Media = ({ image }: MediaProps): JSX.Element => (
  <div
    className={styles.media}
    style={{
      backgroundImage: `url(${image})`,
    }}
  />
)

interface PictorialDisplayCardProps {
  data: PictorialDisplayItem
  landscape?: boolean
  fill?: boolean
}

const PictorialDisplayCard = ({
  data: { image, title, brief, url },
  landscape,
  fill,
}: PictorialDisplayCardProps): JSX.Element => (
  <Card
    className={cx(styles.pictorialDisplayCard, {
      [styles.landscape]: landscape,
      [styles.fill]: fill,
    })}
  >
    {landscape ? (
      <>
        <div className={styles.left}>
          <Content title={title} brief={brief} />
          <Action url={url} />
        </div>
        <Media image={image} />
      </>
    ) : (
      <>
        <CardActionArea>
          <Media image={image} />
          <Content title={title} brief={brief} />
        </CardActionArea>
        <Action url={url} />
      </>
    )}
  </Card>
)

PictorialDisplayCard.defaultProps = {
  landscape: false,
  fill: false,
}

export default PictorialDisplayCard
