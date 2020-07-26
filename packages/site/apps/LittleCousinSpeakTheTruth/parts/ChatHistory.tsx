import React from 'react'

import AudioMsg from './AudioMsg'
import styles from './ChatHistory.module.scss'

import { MsgItem, MsgType } from '../type'

interface ChatHistoryProps {
  history: MsgItem[]
  leftAvatar: string
  rightAvatar: string
  onViewImage: (url: string) => void
}
export default function ChatHistory({
  history,
  leftAvatar,
  rightAvatar,
  onViewImage,
}: ChatHistoryProps): JSX.Element {
  return (
    <section className={styles.chatHistory}>
      {history.map((msgItem, mIndex) => (
        <div
          className={`${styles.msgItem} ${
            msgItem.who === 'left' ? styles.leftSide : styles.rightSide
          }`}
          // eslint-disable-next-line react/no-array-index-key
          key={mIndex}
        >
          <img
            className={styles.avatar}
            src={msgItem.who === 'left' ? leftAvatar : rightAvatar}
          />
          {(msgItem.type === MsgType.text ||
            msgItem.type === MsgType.voice) && (
            <div className={styles.msgBubble}>
              {msgItem.type === MsgType.text && (
                <span className={styles.contentText}>{msgItem.content}</span>
              )}
              {msgItem.type === MsgType.voice && (
                <div className={styles.contentVoice}>
                  <AudioMsg
                    audioUrl={msgItem.content}
                    length={msgItem.voiceLength || ''}
                  />
                </div>
              )}
            </div>
          )}
          {(msgItem.type === MsgType.image ||
            msgItem.type === MsgType.meme) && (
            <>
              {msgItem.type === MsgType.image && (
                <img
                  className={styles.msgImage}
                  src={msgItem.content}
                  onClick={() => onViewImage(msgItem.content)}
                />
              )}
              {msgItem.type === MsgType.meme && (
                <img className={styles.msgMeme} src={msgItem.content} />
              )}
            </>
          )}
        </div>
      ))}
    </section>
  )
}
