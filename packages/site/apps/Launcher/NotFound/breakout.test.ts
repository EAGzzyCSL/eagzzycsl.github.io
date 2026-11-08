import { expect, test } from 'vitest'

import {
  advanceGame,
  BRICK_HEIGHT,
  createGame,
  HEIGHT,
  PADDLE_Y,
  WIDTH,
  PADDLE_WIDTH,
} from './breakout'

test('a brick hit scores once and clearing the last brick wins', () => {
  const game = createGame()
  game.status = 'playing'
  game.bricks = [{ id: 'last', x: 100, y: 100 }]
  game.ball = { x: 105, y: 100 + BRICK_HEIGHT + 2, vx: 0, vy: -240 }
  const next = advanceGame(game, 0, 0.02)
  expect(next.status).toBe('won')
  expect(next.score).toBe(10)
  expect(next.bricks).toHaveLength(0)
  expect(next.ball.vy).toBeGreaterThan(0)
  expect(game.bricks).toHaveLength(1)
})

test('the paddle reflects a falling ball and missing it ends the game', () => {
  const game = createGame()
  game.status = 'playing'
  game.ball = { x: game.paddle + 30, y: PADDLE_Y - 10, vx: 0, vy: 240 }
  expect(advanceGame(game, 0, 0.02).ball.vy).toBeLessThan(0)
  game.ball = { x: 0, y: HEIGHT - 1, vx: 0, vy: 240 }
  expect(advanceGame(game, 0, 0.02).status).toBe('lost')
})

test('movement stays inside the playfield and paused games do not advance', () => {
  const game = createGame()
  game.status = 'playing'
  game.paddle = WIDTH - PADDLE_WIDTH
  game.ball = { x: WIDTH - 9, y: 250, vx: 240, vy: 0 }
  const next = advanceGame(game, 1, 0.02)
  expect(next.paddle).toBe(WIDTH - PADDLE_WIDTH)
  expect(next.ball.vx).toBeLessThan(0)
  next.status = 'paused'
  expect(advanceGame(next, -1, 0.05)).toBe(next)
})
