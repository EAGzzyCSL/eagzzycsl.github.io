import React, { useRef, useState } from 'react'

import { RecordVoiceOverRounded as RecordVoiceOverRoundedIcon } from '@mui/icons-material'

import styles from './AudioMsg.module.scss'

interface AudioMsgProps {
  audioUrl: string
  length: string
}

const AudioMsg = ({ audioUrl, length }: AudioMsgProps): JSX.Element => {
  const audioPlayer = useRef<null | HTMLAudioElement>(null)

  const [audioAnimating, setAudioAnimating] = useState(false)
  const handleTapAudio = (): void => {
    const player = audioPlayer.current
    if (!player) {
      return
    }
    if (player.paused) {
      player.play()
    } else {
      player.pause()
    }
  }

  return (
    <div className={styles.audioMsg} onClick={handleTapAudio}>
      <div
        className={`${styles.iconPlay} ${
          audioAnimating ? styles.animating : ''
        }`}
      >
        <RecordVoiceOverRoundedIcon fontSize='small' color='primary' />
      </div>
      <span className={styles.length}>{length}</span>
      <audio
        ref={audioPlayer}
        className={styles.audio}
        src={audioUrl}
        onPlay={() => {
          setAudioAnimating(true)
        }}
        onPause={() => {
          setAudioAnimating(false)
        }}
      />
    </div>
  )
}

export default AudioMsg
