// FIXME: test.js 没有适配 lint 规则
/* global test, expect */
const yamlDemo = require('./yaml-demo.yaml')

test('transform-yaml', () => {
  expect(yamlDemo).toMatchSnapshot()
})
