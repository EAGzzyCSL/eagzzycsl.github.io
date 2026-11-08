export const WIDTH = 640
export const HEIGHT = 450
export const PADDLE_Y = HEIGHT - 32
export const PADDLE_WIDTH = 100
export const BALL_SIZE = 8
export const BRICK_WIDTH = 24
export const BRICK_HEIGHT = 16
const BALL_SPEED = 260
const PADDLE_SPEED = 380
const POINTS_PER_BRICK = 10
const MAX_FRAME_TIME = 0.05
const PHYSICS_STEP = 1 / 120

const DIGITS = [
  ['10001', '10001', '10001', '11111', '00001', '00001', '00001'],
  ['11111', '10001', '10001', '10001', '10001', '10001', '11111'],
  ['10001', '10001', '10001', '11111', '00001', '00001', '00001'],
]

export interface Brick {
  id: string
  x: number
  y: number
}

export interface Game {
  status: 'idle' | 'playing' | 'paused' | 'lost' | 'won'
  bricks: Brick[]
  paddle: number
  ball: { x: number; y: number; vx: number; vy: number }
  score: number
}

export const createGame = (): Game => ({
  status: 'idle',
  bricks: DIGITS.flatMap((rows, digit) =>
    rows.flatMap((row, y) =>
      [...row].flatMap((cell, x) =>
        cell === '1'
          ? [
              {
                id: `${digit}-${x}-${y}`,
                x: 78 + digit * 170 + x * 30,
                y: 58 + y * 22,
              },
            ]
          : [],
      ),
    ),
  ),
  paddle: (WIDTH - PADDLE_WIDTH) / 2,
  ball: {
    x: WIDTH / 2 - BALL_SIZE / 2,
    y: PADDLE_Y - BALL_SIZE,
    vx: 100,
    vy: -240,
  },
  score: 0,
})

// Small substeps prevent the ball from passing through a thin brick or paddle.
export const advanceGame = (
  game: Game,
  direction: number,
  elapsed: number,
): Game => {
  if (game.status !== 'playing') return game
  const duration = Math.min(elapsed, MAX_FRAME_TIME)
  if (duration <= 0) return game
  const steps = Math.ceil(duration / PHYSICS_STEP)
  const dt = duration / steps
  const next = { ...game, ball: { ...game.ball } }

  for (let i = 0; i < steps; i += 1) {
    next.paddle = Math.max(
      0,
      Math.min(
        WIDTH - PADDLE_WIDTH,
        next.paddle + direction * PADDLE_SPEED * dt,
      ),
    )
    const { x: previousX, y: previousY } = next.ball
    const { ball } = next
    ball.x += ball.vx * dt
    ball.y += ball.vy * dt

    if (ball.x < 0 || ball.x > WIDTH - BALL_SIZE) {
      ball.x = Math.max(0, Math.min(WIDTH - BALL_SIZE, ball.x))
      ball.vx *= -1
    }
    if (ball.y < 0) {
      ball.y = 0
      ball.vy = Math.abs(ball.vy)
    }
    if (
      ball.vy > 0 &&
      previousY + BALL_SIZE <= PADDLE_Y &&
      ball.y + BALL_SIZE >= PADDLE_Y &&
      ball.x + BALL_SIZE >= next.paddle &&
      ball.x <= next.paddle + PADDLE_WIDTH
    ) {
      const hit = Math.max(
        -1,
        Math.min(
          1,
          (ball.x + BALL_SIZE / 2 - next.paddle - PADDLE_WIDTH / 2) /
            (PADDLE_WIDTH / 2),
        ),
      )
      ball.y = PADDLE_Y - BALL_SIZE
      ball.vx = hit * BALL_SPEED * 0.85
      // Avoid a perfectly vertical trajectory that never reaches another column.
      if (Math.abs(ball.vx) < 45) ball.vx = (ball.vx < 0 ? -1 : 1) * 45
      ball.vy = -Math.sqrt(BALL_SPEED ** 2 - ball.vx ** 2)
    }

    const brick = next.bricks.find(
      item =>
        ball.x < item.x + BRICK_WIDTH &&
        ball.x + BALL_SIZE > item.x &&
        ball.y < item.y + BRICK_HEIGHT &&
        ball.y + BALL_SIZE > item.y,
    )
    if (brick) {
      if (
        previousY + BALL_SIZE <= brick.y ||
        previousY >= brick.y + BRICK_HEIGHT
      ) {
        ball.vy *= -1
        ball.y = previousY
      } else {
        ball.vx *= -1
        ball.x = previousX
      }
      next.bricks = next.bricks.filter(item => item.id !== brick.id)
      next.score += POINTS_PER_BRICK
      if (!next.bricks.length) {
        next.status = 'won'
        break
      }
    }
    if (ball.y >= HEIGHT) {
      next.status = 'lost'
      break
    }
  }
  return next
}
