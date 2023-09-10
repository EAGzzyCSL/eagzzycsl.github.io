import React from 'react'

import { Card, CardActionArea, CardContent } from '@/ui/material'

import { BasicDisplayItem } from '../type'

import styles from './Icon8DisplayCard.module.scss'

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

const Icon8DisplayCard = ({
  data: { image },
}: IconDisplayCardProps): JSX.Element => (
  <Card className={styles.icon8DisplayCard}>
    <CardActionArea className={styles.left}>
      <CardContent>
        <Media image={image ?? ''} />
      </CardContent>
    </CardActionArea>
  </Card>
)

export default Icon8DisplayCard
