import React from 'react'

import { Autocomplete, TextField } from '@/ui/material'

import HoverInput from './HoverInput'
import styles from './PinyinItem.module.scss'

interface PinyinItemProps {
  // 拼音列表，字可能是多音字
  pinyinOfChar: string[]
}

const PinyinItem = (props: PinyinItemProps): JSX.Element => {
  const { pinyinOfChar } = props
  return (
    <div className={styles.pinyinItem}>
      <HoverInput initValue={pinyinOfChar[0]}>
        <Autocomplete
          freeSolo
          options={pinyinOfChar}
          renderInput={params => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              variant='standard'
              autoFocus
            />
          )}
        />
      </HoverInput>
    </div>
  )
}

export default PinyinItem
