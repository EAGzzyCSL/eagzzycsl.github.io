import React from 'react'

import { randomPick } from '@/utils'
import { createFrameTimeout } from '@/utils/time'

import avatars from '../data/avatars'
import coolhue from '../data/coolhue'

import styles from './BulletPlayer.module.scss'

const PLAYER_HEIGHT = 400
const TRACK_HEIGHT = 50
const TRACKS_COUNT = Math.floor(PLAYER_HEIGHT / TRACK_HEIGHT)
const pxPerSecond = 80

const gradientStyles = coolhue.map(
  item => `linear-gradient(135deg, ${item[0]} 10%, ${item[1]} 100%)`,
)

interface ITrack {
  key: number
  content: string
  top: number
  left: number
  backgroundImage: string
  avatar: string
}

interface BulletPlayerState {
  tracks: ITrack[]
  bulletDuration: number
}

/**
 * 函数式组件 useEffect 会因为 createFrameTimeout 频繁被销毁而无法清理过期弹幕
 */
class BulletPlayer extends React.Component<unknown, BulletPlayerState> {
  // 历史以来弹幕总量
  totalCount: 0

  // 需要清理的计时器
  timers: (() => void)[]

  resizeHandler: () => void

  playerRef: React.RefObject<HTMLDivElement>

  constructor(props: unknown) {
    super(props)
    this.totalCount = 0
    this.timers = []
    this.state = {
      tracks: [],
      bulletDuration: 6,
    }
    this.playerRef = React.createRef<HTMLDivElement>()
    this.resizeHandler = () => {
      if (!this.playerRef.current) {
        return
      }
      this.setState({
        // 速度大约为每秒 100px
        bulletDuration: Math.round(
          this.playerRef.current.clientWidth / pxPerSecond,
        ),
      })
    }
  }

  componentDidMount(): void {
    this.resizeHandler()
    window.addEventListener('resize', this.resizeHandler)
  }

  componentWillUnmount(): void {
    this.timers.forEach(item => item())
    window.removeEventListener('resize', this.resizeHandler)
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  public addBullet(newBullet: string): void {
    this.addBullets([newBullet])
  }

  private addBullets(newBullets: string[]): void {
    const { tracks, bulletDuration } = this.state
    this.setState({
      tracks: [
        ...tracks,
        ...newBullets.map(item => {
          this.totalCount += 1
          return {
            key: this.totalCount,
            content: item,
            top:
              TRACK_HEIGHT / 2 +
              ((this.totalCount + 1) % (TRACKS_COUNT - 1)) * TRACK_HEIGHT +
              Math.floor(10 * Math.random()) * (Math.random() > 0.5 ? 1 : -1),
            left: Math.ceil(Math.random() * 120),
            backgroundImage: randomPick(gradientStyles),
            avatar: randomPick(avatars),
          }
        }),
      ],
    })

    this.timers.push(
      createFrameTimeout(() => {
        const { tracks } = this.state
        this.setState({ tracks: tracks.slice(newBullets.length) })
      }, bulletDuration * 1000),
    )
  }

  render(): JSX.Element {
    const { tracks, bulletDuration } = this.state
    return (
      <section className={styles.bulletPlayer} ref={this.playerRef}>
        {tracks.map(item => (
          <div
            className={styles.line}
            key={item.key}
            style={{
              top: item.top,
              paddingLeft: item.left,
              animationDuration: `${bulletDuration}s`,
            }}
          >
            <div className={styles.bullet}>
              <img className={styles.avatar} src={item.avatar} />
              <span
                className={styles.text}
                style={{
                  backgroundImage: item.backgroundImage,
                }}
              >
                {item.content}
              </span>
            </div>
          </div>
        ))}
      </section>
    )
  }
}

export default BulletPlayer
