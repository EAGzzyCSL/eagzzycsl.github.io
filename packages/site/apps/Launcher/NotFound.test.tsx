import React from 'react'
import * as renderer from 'react-test-renderer'

import NotFound from './NotFound'

test('render NotFound', () => {
  const tree = renderer.create(<NotFound />).toJSON()
  expect(tree).toMatchSnapshot()
})
