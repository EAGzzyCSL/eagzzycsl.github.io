export enum MsgType {
  text,
  voice,
  image,
  meme,
}

export interface MsgItem {
  who: 'left' | 'right'
  type: MsgType
  content: string
  voiceLength?: string
}

export interface Chats {
  history: MsgItem[]
  leftName: string
  leftAvatar: string
  rightAvatar: string
}
