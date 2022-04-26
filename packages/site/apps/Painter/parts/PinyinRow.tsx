import React, { useMemo } from 'react'

import { Autocomplete, TextField } from '@mui/material'
import pinyin from 'pinyin'

import HoverInput from './HoverInput'
import styles from './PinyinRow.module.scss'

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

interface PinyinRowProps {
  text: string
}

const PinyinRow = (props: PinyinRowProps): JSX.Element => {
  const { text } = props

  const pinyinList = useMemo(
    () =>
      // 应对可能要强行给字母加拼音的场景
      text.split('').map(
        item =>
          pinyin(item, {
            heteronym: true,
            // 开启分词会有性能问题，因此web版没有提供分词功能
          })[0],
      ),
    [text],
  )

  return (
    <div className={styles.pinyinRow}>
      {pinyinList.map((item, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={`${text}-${index}`}
          className={styles.pinyin}
        >
          <PinyinItem pinyinOfChar={item} />
        </div>
      ))}
    </div>
  )
}

export default PinyinRow
