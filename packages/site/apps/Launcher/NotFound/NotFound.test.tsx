import React, { Profiler } from 'react'

import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, test, expect, vi } from 'vitest'

import NotFound from './index'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

test('shows the 404 game and a way home', () => {
  render(<NotFound />)
  expect(screen.getByRole('img').getAttribute('aria-label')).toBe(
    '404 打砖块，得分 0',
  )
  expect(
    screen.getByRole('link', { name: '← 返回首页' }).getAttribute('href'),
  ).toBe('/')
})

test('space starts the game, losing focus pauses it, and unmount removes listeners', () => {
  const { unmount } = render(<NotFound />)
  fireEvent.keyDown(window, { code: 'Space' })
  fireEvent.blur(window)
  expect(screen.getByText('已暂停')).toBeTruthy()
  fireEvent.keyDown(window, { code: 'Space' })
  expect(screen.queryByText('已暂停')).toBeNull()
  unmount()
  const event = new KeyboardEvent('keydown', {
    code: 'Space',
    cancelable: true,
  })
  window.dispatchEvent(event)
  expect(event.defaultPrevented).toBe(false)
})

test('animation moves the ball without React commits until a brick is hit', () => {
  vi.useFakeTimers({
    toFake: ['requestAnimationFrame', 'cancelAnimationFrame'],
  })
  const onRender = vi.fn()
  render(
    <Profiler id='game' onRender={onRender}>
      <NotFound />
    </Profiler>,
  )
  const ball = screen.getByTestId('ball')
  const initialPosition = ball.getAttribute('transform')
  fireEvent.keyDown(window, { code: 'Space' })
  onRender.mockClear()
  act(() => {
    vi.advanceTimersByTime(160)
  })
  expect(ball.getAttribute('transform')).not.toBe(initialPosition)
  expect(onRender).not.toHaveBeenCalled()
  for (let frame = 0; frame < 200; frame += 1) {
    act(() => {
      vi.advanceTimersByTime(16)
    })
    if (
      screen.getByRole('img').getAttribute('aria-label') !==
      '404 打砖块，得分 0'
    )
      break
  }
  expect(screen.getByRole('img').getAttribute('aria-label')).not.toBe(
    '404 打砖块，得分 0',
  )
  expect(onRender).toHaveBeenCalled()
  fireEvent.keyDown(window, { code: 'Space' })
  const pausedPosition = ball.getAttribute('transform')
  act(() => {
    vi.advanceTimersByTime(160)
  })
  expect(ball.getAttribute('transform')).toBe(pausedPosition)
})

test('finishing and unmounting stop animation, and a new round resets the game', () => {
  vi.useFakeTimers({
    toFake: ['requestAnimationFrame', 'cancelAnimationFrame'],
  })
  const { unmount } = render(
    <React.StrictMode>
      <NotFound />
    </React.StrictMode>,
  )
  const initialPosition = screen.getByTestId('ball').getAttribute('transform')
  fireEvent.keyDown(window, { code: 'Space' })
  act(() => {
    vi.advanceTimersByTime(10000)
  })
  expect(screen.getByText('404 Paddle Not Found')).toBeTruthy()
  expect(vi.getTimerCount()).toBe(0)
  fireEvent.keyDown(window, { code: 'Space' })
  expect(screen.queryByText('404 Paddle Not Found')).toBeNull()
  expect(screen.getByRole('img').getAttribute('aria-label')).toBe(
    '404 打砖块，得分 0',
  )
  expect(screen.getByTestId('ball').getAttribute('transform')).toBe(
    initialPosition,
  )
  expect(vi.getTimerCount()).toBe(1)
  unmount()
  expect(vi.getTimerCount()).toBe(0)
})

test('touch controls move until release or cancellation and clear held input on blur', () => {
  vi.useFakeTimers({
    toFake: ['requestAnimationFrame', 'cancelAnimationFrame'],
  })
  render(<NotFound />)
  const right = screen.getByRole('button', { name: '向右移动' })
  // jsdom does not implement pointer capture; movement still uses real events.
  right.setPointerCapture = vi.fn()
  const paddle = screen.getByTestId('paddle')
  const initial = paddle.getAttribute('transform')
  fireEvent.click(screen.getByRole('button', { name: '开始' }))
  fireEvent.pointerDown(right, { pointerId: 1, button: 0 })
  act(() => {
    vi.advanceTimersByTime(160)
  })
  expect(paddle.getAttribute('transform')).not.toBe(initial)
  fireEvent.pointerUp(right, { pointerId: 1 })
  const released = paddle.getAttribute('transform')
  act(() => {
    vi.advanceTimersByTime(160)
  })
  expect(paddle.getAttribute('transform')).toBe(released)
  fireEvent.pointerDown(right, { pointerId: 2, button: 0 })
  fireEvent.pointerCancel(right, { pointerId: 2 })
  act(() => {
    vi.advanceTimersByTime(160)
  })
  expect(paddle.getAttribute('transform')).toBe(released)
  fireEvent.pointerDown(right, { pointerId: 3, button: 0 })
  fireEvent.blur(window)
  fireEvent.click(screen.getByRole('button', { name: '继续' }))
  act(() => {
    vi.advanceTimersByTime(160)
  })
  expect(paddle.getAttribute('transform')).toBe(released)
  fireEvent.click(screen.getByRole('button', { name: '暂停' }))
  expect(screen.getByText('已暂停')).toBeTruthy()
})

test('opposing touches cancel out and losing capture releases only that finger', () => {
  vi.useFakeTimers({
    toFake: ['requestAnimationFrame', 'cancelAnimationFrame'],
  })
  render(<NotFound />)
  const left = screen.getByRole('button', { name: '向左移动' })
  const right = screen.getByRole('button', { name: '向右移动' })
  left.setPointerCapture = vi.fn()
  right.setPointerCapture = vi.fn()
  const paddle = screen.getByTestId('paddle')
  const initial = paddle.getAttribute('transform')
  fireEvent.click(screen.getByRole('button', { name: '开始' }))
  fireEvent.pointerDown(left, { pointerId: 1, button: 0 })
  fireEvent.pointerDown(right, { pointerId: 2, button: 0 })
  act(() => {
    vi.advanceTimersByTime(160)
  })
  expect(paddle.getAttribute('transform')).toBe(initial)
  fireEvent.lostPointerCapture(right, { pointerId: 2 })
  act(() => {
    vi.advanceTimersByTime(160)
  })
  expect(paddle.getAttribute('transform')).not.toBe(initial)
  fireEvent.pointerUp(left, { pointerId: 1 })
  const released = paddle.getAttribute('transform')
  act(() => {
    vi.advanceTimersByTime(160)
  })
  expect(paddle.getAttribute('transform')).toBe(released)
})
