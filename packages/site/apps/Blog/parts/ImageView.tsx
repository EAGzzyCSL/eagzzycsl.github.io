import { Typography } from '@material-ui/core'
import React from 'react'

import styles from './ImageView.module.scss'

export interface ImageViewProps {
  src: string
  alt: string
}
const ImageView = ({ src, alt }: ImageViewProps): JSX.Element => {
  /* eslint-disable-next-line global-require, @typescript-eslint/no-var-requires,import/no-dynamic-require */
  const realSrc = require(`../data/images/${src}`).default
  return (
    <span className={styles.imageView}>
      <img className={styles.image} src={realSrc} alt={alt} />
      <Typography
        className={styles.caption}
        component='span'
        variant='caption'
        color='textSecondary'
      >
        [ {alt} ]
      </Typography>
    </span>
  )
}

export default ImageView
