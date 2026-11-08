import React from 'react'

import { GetStaticPropsResult } from 'next'
import Link from 'next/link'

import {
  WIDTH,
  HEIGHT,
  PADDLE_Y,
  PADDLE_WIDTH,
  BRICK_WIDTH,
  BRICK_HEIGHT,
} from './breakout'
import type { Game } from './breakout'
import GameControls from './GameControls'
import styles from './NotFound.module.scss'
import useBreakout, {
  getBallTransform,
  getPaddleTransform,
} from './useBreakout'

const STATUS_MESSAGES: Record<
  Game['status'],
  { title: string; detail?: string } | null
> = {
  idle: null,
  playing: null,
  paused: { title: '已暂停' },
  lost: {
    title: '404 Paddle Not Found',
    detail: 'The ball couldn’t find the paddle.',
  },
  won: { title: '✓ 204 No Content', detail: 'All bricks cleared.' },
}

const NotFound = (): React.JSX.Element => {
  const {
    game,
    ballElement,
    paddleElement,
    toggleGame,
    pressDirection,
    releaseDirection,
  } = useBreakout()
  const statusMessage = STATUS_MESSAGES[game.status]

  return (
    <main className={styles.notFound}>
      <div className={styles.content}>
        <svg
          className={styles.game}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role='img'
          aria-label={`404 打砖块，得分 ${game.score}`}
        >
          <text x={WIDTH - 12} y='24' textAnchor='end' className={styles.score}>
            {String(game.score).padStart(5, '0')}
          </text>
          <g shapeRendering='crispEdges'>
            {game.status !== 'idle' && (
              <path
                d={`M0 ${HEIGHT - 12} V0 H${WIDTH} V${HEIGHT - 12}`}
                className={styles.walls}
              />
            )}
            {game.bricks.map(brick => (
              <g key={brick.id} transform={`translate(${brick.x} ${brick.y})`}>
                <rect
                  className={styles.brickFace}
                  width={BRICK_WIDTH}
                  height={BRICK_HEIGHT}
                />
                <rect
                  y={BRICK_HEIGHT - 2}
                  width={BRICK_WIDTH}
                  height='2'
                  className={styles.brickShade}
                />
                <path
                  d='M4 4 h5 v2 H4 Z M15 9 h4 v2 h-4 Z'
                  className={styles.brickTexture}
                />
              </g>
            ))}
            <g
              ref={ballElement}
              data-testid='ball'
              transform={getBallTransform(game.ball)}
            >
              <path
                d='M2 0 H6 V1 H7 V2 H8 V6 H7 V7 H6 V8 H2 V7 H1 V6 H0 V2 H1 V1 H2 Z'
                className={styles.ballFace}
              />
              <path
                d='M2 1 H5 V2 H3 V3 H1 V2 H2 Z'
                className={styles.ballHighlight}
              />
              <path
                d='M7 3 H8 V6 H7 V7 H6 V8 H2 V7 H5 V6 H6 V5 H7 Z'
                className={styles.ballShade}
              />
            </g>
            <g
              ref={paddleElement}
              data-testid='paddle'
              transform={getPaddleTransform(game.paddle)}
            >
              <rect
                width={PADDLE_WIDTH}
                height='8'
                className={styles.paddleFace}
              />
              <rect
                y='6'
                width={PADDLE_WIDTH}
                height='2'
                className={styles.paddleShade}
              />
            </g>
          </g>
          {statusMessage && (
            <text
              x={WIDTH / 2}
              y={PADDLE_Y - 70}
              textAnchor='middle'
              className={styles.status}
            >
              <tspan x={WIDTH / 2}>{statusMessage.title}</tspan>
              {statusMessage.detail && (
                <tspan x={WIDTH / 2} dy='24' className={styles.statusDetail}>
                  {statusMessage.detail}
                </tspan>
              )}
            </text>
          )}
        </svg>
        <GameControls
          status={game.status}
          onToggle={toggleGame}
          onPressDirection={pressDirection}
          onReleaseDirection={releaseDirection}
        />
      </div>
      <div className={styles.description}>
        <h1
          className={styles.title}
          style={{ visibility: game.status === 'idle' ? 'visible' : 'hidden' }}
        >
          页面不见了
        </h1>
        <p className={styles.instructions}>空格开始 / 暂停 · ← → 移动</p>
      </div>
      <Link href='/' className={styles.home}>
        ← 返回首页
      </Link>
    </main>
  )
}

export default NotFound

export const getStaticProps = (): GetStaticPropsResult<unknown> => ({
  props: {},
})
