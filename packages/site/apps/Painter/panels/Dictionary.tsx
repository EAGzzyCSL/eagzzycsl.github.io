import React, { useState } from 'react'

import {
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  Link,
} from '@/ui/material'

import MiSquares from '../parts/MiSquares'
import PanelContainer from '../parts/PanelContainer'
import PinyinRow from '../parts/PinyinRow'
import Saver from '../parts/Saver'

import styles from './Dictionary.module.scss'

const Dictionary = (): JSX.Element => {
  const [word, setWord] = useState('自编字典')
  const [definition, setDefinitions] = useState(
    '指把自己生造的词做成字典的样子，让其更加具有可信度。',
  )
  const [hasExample, setHasExample] = useState(true)
  const [example, setExample] = useState('使用这个页面，可以轻松实现自编字典。')

  return (
    <section className={styles.dictionary}>
      <PanelContainer
        size='small'
        board={
          <Saver saveAction='shotAndSave' fileName={word}>
            <div className={styles.card}>
              <div className={styles.word}>
                <PinyinRow text={word || ''} />
                <MiSquares text={word || ''} />
              </div>
              {definition && (
                <div className={styles.definitionBlock}>
                  <Typography variant='subtitle2'>【释义】</Typography>
                  <Typography className={styles.definition} variant='body2'>
                    {definition}
                  </Typography>
                </div>
              )}
              {hasExample && example && (
                <div className={styles.exampleBlock}>
                  <Typography variant='subtitle2'>【例句】</Typography>
                  <Typography className={styles.example} variant='body2'>
                    {example}
                  </Typography>
                </div>
              )}
            </div>
          </Saver>
        }
        control={
          <div className={styles.form}>
            <div className={styles.formItem}>
              <TextField
                label='词语'
                variant='outlined'
                value={word}
                onChange={event => {
                  // TODO: 打中文时会疯狂跳，鬼畜
                  setWord(event.target.value)
                }}
              />
            </div>
            <div className={styles.formItem}>
              <TextField
                label='释义'
                multiline
                variant='outlined'
                value={definition}
                onChange={event => {
                  setDefinitions(event.target.value)
                }}
              />
            </div>

            <div className={styles.formItem}>
              <FormControlLabel
                label='显示例句'
                control={<Checkbox />}
                checked={hasExample}
                onChange={(event, checked) => {
                  setHasExample(checked)
                }}
              />
            </div>
            <div className={styles.formItem}>
              {hasExample && (
                <TextField
                  label='例句'
                  multiline
                  variant='outlined'
                  value={example}
                  onChange={event => {
                    setExample(event.target.value)
                  }}
                />
              )}
            </div>
            <Typography variant='caption'>
              启发自
              <Link
                href='https://weibo.com/u/3197735761'
                target='_blank'
                rel='noopener'
                color='secondary'
              >
                语文指挥中心
              </Link>
            </Typography>
          </div>
        }
      />
    </section>
  )
}

export default Dictionary
