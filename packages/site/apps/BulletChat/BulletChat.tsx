import React, { useEffect, useRef, useState } from 'react'

import { GetStaticPropsResult } from 'next'

import AppPage from '@/shell/AppPage'
import { SendRoundedIcon } from '@/ui/icons'
import {
  Paper,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from '@/ui/material'
import { createFrameInterval } from '@/utils/time'

import styles from './BulletChat.module.scss'
import spring from './data/spring-river-flower-moon-night'
import BulletPlayer from './parts/BulletPlayer'
import theme from './theme'

const BulletChat = (): JSX.Element => {
  const sentenceCursor = useRef(0)
  const player = useRef<BulletPlayer>(null)

  const [inputValue, setInputValue] = useState('')
  const [enablePreset, setEnablePreset] = useState(true)
  useEffect(() => {
    if (enablePreset) {
      return createFrameInterval(() => {
        player.current?.addBullet(
          // eslint-disable-next-line no-plusplus
          spring[sentenceCursor.current++ % spring.length],
        )
      }, 1000)
    }
    return () => {}
  }, [enablePreset])

  const handleSend = (): void => {
    player.current?.addBullet(inputValue)
    setInputValue('')
  }

  return (
    <AppPage title='弹幕 demo' theme={theme} fullHeight>
      <section className={styles.bulletChat}>
        <BulletPlayer ref={player} />
        <Paper className={styles.bottomBar} elevation={3}>
          <FormControlLabel
            value={enablePreset}
            control={<Switch defaultChecked />}
            label='预设弹幕'
            onChange={e => {
              setEnablePreset(
                (e.target as unknown as { checked: boolean }).checked,
              )
            }}
          />
          <TextField
            size='small'
            value={inputValue}
            placeholder='输入要发送的弹幕…'
            onChange={e => {
              setInputValue(e.target.value)
            }}
            onKeyDown={e => {
              if (e.code === 'Enter') {
                handleSend()
              }
            }}
          />
          <Button
            sx={{
              marginLeft: '20px',
            }}
            variant='contained'
            endIcon={<SendRoundedIcon />}
            onClick={handleSend}
          >
            Send
          </Button>
        </Paper>
      </section>
    </AppPage>
  )
}

export default BulletChat

export const getStaticProps = (): GetStaticPropsResult<unknown> => ({
  props: {},
})
