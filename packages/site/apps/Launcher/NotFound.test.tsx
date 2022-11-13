import React from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import * as renderer from 'react-test-renderer'

import NotFound from './NotFound'

test('render NotFound', () => {
  const tree = renderer.create(<NotFound />).toJSON()
  expect(tree).toMatchSnapshot()
})
