import { Autocomplete, TextField, Typography } from '@mui/material'
import pinyin from 'pinyin'
import React, { useState, useMemo } from 'react'

import styles from './PinyinRow.module.scss'

interface PinyinItemProps {
  // 拼音列表，字可能是多音字
  pinyinOfChar: string[]
}

const PinyinItem = (props: PinyinItemProps): JSX.Element => {
  const { pinyinOfChar } = props
  const [isEdit, setIsEdit] = useState(false)
  const [displayPinyin, setDisplayPinyin] = useState(pinyinOfChar[0])
  return (
    <div className={styles.pinyinItem}>
      {isEdit ? (
        <Autocomplete
          className={styles.input}
          freeSolo
          options={pinyinOfChar}
          value={displayPinyin}
          onChange={(event, newValue) => {
            if (newValue) {
              setDisplayPinyin(newValue)
            }
          }}
          onBlur={() => {
            setIsEdit(false)
          }}
          renderInput={params => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              variant='standard'
              autoFocus
              onChange={event => {
                setDisplayPinyin(event.target.value)
              }}
            />
          )}
        />
      ) : (
        <Typography
          onClick={() => {
            setIsEdit(true)
          }}
          variant='h6'
          className={styles.display}
        >
          {displayPinyin || pinyinOfChar[0]}
        </Typography>
      )}
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
