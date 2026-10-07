import React from 'react'

import { cleanup, render } from '@testing-library/react'
import { afterEach, test, expect } from 'vitest'

import NotFound from './NotFound'

afterEach(cleanup)

test('render NotFound', () => {
  const { asFragment } = render(<NotFound />)
  expect(asFragment()).toMatchSnapshot()
})
