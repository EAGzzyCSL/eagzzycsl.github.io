import { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

import { advanceGame, createGame, BALL_SIZE, PADDLE_Y } from './breakout'
import type { Game } from './breakout'

export const getBallTransform = (ball: Game['ball']): string =>
  `translate(${Math.round(ball.x)} ${Math.round(ball.y)}) scale(${BALL_SIZE / 8})`

export const getPaddleTransform = (paddle: number): string =>
  `translate(${Math.round(paddle)} ${PADDLE_Y})`

interface BreakoutController {
  game: Game
  toggleGame: () => void
  pressDirection: (pointerId: number, direction: -1 | 1) => void
  releaseDirection: (pointerId: number) => void
  ballElement: RefObject<SVGGElement | null>
  paddleElement: RefObject<SVGGElement | null>
}

const useBreakout = (): BreakoutController => {
  // React keeps a render snapshot; simulation holds the latest frame.
  const [game, setGame] = useState(createGame)
  const keys = useRef(new Set<string>())
  const pointers = useRef(new Map<number, -1 | 1>())
  const simulation = useRef(game)
  const ballElement = useRef<SVGGElement>(null)
  const paddleElement = useRef<SVGGElement>(null)

  // Position updates bypass React; publish a snapshot only when the UI changes.
  const updateGame = useCallback((next: Game): void => {
    const previous = simulation.current
    simulation.current = next
    ballElement.current?.setAttribute('transform', getBallTransform(next.ball))
    paddleElement.current?.setAttribute(
      'transform',
      getPaddleTransform(next.paddle),
    )
    if (
      next.bricks !== previous.bricks ||
      next.score !== previous.score ||
      next.status !== previous.status
    ) {
      setGame(next)
    }
  }, [])

  const pressDirection = useCallback(
    (pointerId: number, direction: -1 | 1): void => {
      pointers.current.set(pointerId, direction)
    },
    [],
  )
  const releaseDirection = useCallback((pointerId: number): void => {
    pointers.current.delete(pointerId)
  }, [])
  const clearInput = useCallback((): void => {
    keys.current.clear()
    pointers.current.clear()
  }, [])
  const pauseGame = useCallback((): void => {
    clearInput()
    const { current } = simulation
    if (current.status === 'playing')
      updateGame({ ...current, status: 'paused' })
  }, [clearInput, updateGame])
  const toggleGame = useCallback((): void => {
    const { current } = simulation
    if (current.status === 'playing') {
      pauseGame()
    } else if (current.status === 'lost' || current.status === 'won') {
      updateGame({ ...createGame(), status: 'playing' })
    } else {
      updateGame({ ...current, status: 'playing' })
    }
  }, [pauseGame, updateGame])

  useEffect(() => {
    const pressedKeys = keys.current
    const keydown = (event: KeyboardEvent): void => {
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        (event.target instanceof HTMLElement &&
          event.target.closest(
            'a, button, input, textarea, select, [contenteditable="true"]',
          ))
      )
        return
      if (!['ArrowLeft', 'ArrowRight', 'Space'].includes(event.code)) return
      event.preventDefault()
      if (event.code !== 'Space') {
        pressedKeys.add(event.code)
      } else if (!event.repeat) {
        toggleGame()
      }
    }
    const keyup = (event: KeyboardEvent): void => {
      pressedKeys.delete(event.code)
    }
    const visibility = (): void => {
      if (document.hidden) pauseGame()
    }
    window.addEventListener('keydown', keydown)
    window.addEventListener('keyup', keyup)
    window.addEventListener('blur', pauseGame)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      window.removeEventListener('keydown', keydown)
      window.removeEventListener('keyup', keyup)
      window.removeEventListener('blur', pauseGame)
      document.removeEventListener('visibilitychange', visibility)
      clearInput()
    }
  }, [clearInput, pauseGame, toggleGame])

  useEffect(() => {
    if (game.status !== 'playing') return undefined
    let frame: number
    let previous: number | undefined
    const tick = (time: number): void => {
      if (simulation.current.status !== 'playing') return
      if (previous !== undefined) {
        const elapsed = (time - previous) / 1000
        let right = keys.current.has('ArrowRight')
        let left = keys.current.has('ArrowLeft')
        pointers.current.forEach(direction => {
          right ||= direction === 1
          left ||= direction === -1
        })
        const direction = Number(right) - Number(left)
        const next = advanceGame(simulation.current, direction, elapsed)
        updateGame(next)
        if (next.status !== 'playing') {
          clearInput()
          return
        }
      }
      previous = time
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
    }
  }, [game.status, updateGame, clearInput])

  return {
    game,
    ballElement,
    paddleElement,
    toggleGame,
    pressDirection,
    releaseDirection,
  }
}

export default useBreakout
