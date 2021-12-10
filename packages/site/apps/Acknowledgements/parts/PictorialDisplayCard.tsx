import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import cx from 'classnames'
import React from 'react'

import { PictorialDisplayItem } from '../data'

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
  cover?: boolean
}

const Media = ({ image, cover }: MediaProps): JSX.Element => (
  <div
    className={styles.media}
    style={{
      backgroundImage: `url(${image})`,
      // stylelint-disable-next-line csstree/validator
      backgroundSize: cover ? 'cover' : 'contain',
    }}
  />
)

Media.defaultProps = {
  cover: false,
}

interface PictorialCardProps {
  data: PictorialDisplayItem
  landscape?: boolean
  fill?: boolean
}

const PictorialCard = ({
  data: { image, title, brief, url, cover },
  landscape,
  fill,
}: PictorialCardProps): JSX.Element => (
  <Card
    className={cx(styles.displayCard, {
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
        <Media image={image} cover={cover} />
      </>
    ) : (
      <>
        <CardActionArea>
          <Media image={image} cover={cover} />
          <Content title={title} brief={brief} />
        </CardActionArea>
        <Action url={url} />
      </>
    )}
  </Card>
)

PictorialCard.defaultProps = {
  landscape: false,
  fill: false,
}

export default PictorialCard
