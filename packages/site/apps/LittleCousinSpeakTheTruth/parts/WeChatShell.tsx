import React, { useState } from 'react'

import {
  AddCircleOutlineRoundedIcon,
  InsertEmoticonRoundedIcon,
  MicIcon,
} from '@/ui/icons'

import { Chats } from '../type'

import ChatHistory from './ChatHistory'
import styles from './WeChatShell.module.scss'

const Footer = (): JSX.Element => (
  <div className={styles.footer}>
    <MicIcon fontSize='large' />

    <input className={styles.inputField} />
    <InsertEmoticonRoundedIcon fontSize='large' />
    <div className={styles.iconSplit} />
    <AddCircleOutlineRoundedIcon fontSize='large' />
  </div>
)

interface WeChatShellProps {
  chats: Chats
}

const WeChatShell = ({ chats }: WeChatShellProps): JSX.Element => {
  const [imageViewerVisible, setImageViewerVisible] = useState(false)
  const [imageViewerUrl, setImageViewerUrl] = useState('')
  const handleToggleImageViewer = (url = ''): void => {
    setImageViewerVisible(!imageViewerVisible)
    setImageViewerUrl(url)
  }

  return (
    <section className={styles.weChatShell}>
      <section className={styles.chatHome}>
        <ChatHistory
          onViewImage={handleToggleImageViewer}
          leftAvatar={chats.leftAvatar}
          rightAvatar={chats.rightAvatar}
          history={chats.history}
        />
        <Footer />
      </section>
      {imageViewerVisible && (
        <section
          onClick={() => {
            handleToggleImageViewer('')
          }}
          className={styles.imageViewer}
        >
          <img className={styles.image} src={imageViewerUrl} />
        </section>
      )}
    </section>
  )
}

export default WeChatShell
