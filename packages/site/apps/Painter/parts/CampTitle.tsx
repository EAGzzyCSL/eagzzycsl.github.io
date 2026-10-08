import React from 'react'

import { TextField } from '@/ui/material'

import styles from './CampTitle.module.scss'
import HoverInput from './HoverInput'

interface TitleProps {
  title: string
  subTitle: string
}

const CampTitle = ({ title, subTitle }: TitleProps): React.JSX.Element => (
  <section className={styles.campTitle}>
    <HoverInput initValue={title} displayVariant='h6'>
      <TextField
        slotProps={{ htmlInput: { style: { textAlign: 'center' } } }}
      />
    </HoverInput>
    <HoverInput initValue={subTitle} displayVariant='subtitle1'>
      <TextField
        slotProps={{ htmlInput: { style: { textAlign: 'center' } } }}
        size='small'
      />
    </HoverInput>
  </section>
)

export default CampTitle
