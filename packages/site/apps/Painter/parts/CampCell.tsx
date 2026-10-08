import React from 'react'

import { TextField } from '@/ui/material'

import styles from './CampCell.module.scss'
import HoverInput from './HoverInput'
import ImageFrame from './ImageFrame'

interface CampCellProps {
  imgUrl: string
  description: string
}

const CampCell = (props: CampCellProps): React.JSX.Element => {
  const { imgUrl, description } = props
  return (
    <section className={styles.campCell}>
      <ImageFrame imgUrl={imgUrl} />
      <div className={styles.margin} />
      <HoverInput initValue={description} displayVariant='body2'>
        <TextField
          slotProps={{ htmlInput: { style: { textAlign: 'center' } } }}
        />
      </HoverInput>
    </section>
  )
}

export default CampCell
