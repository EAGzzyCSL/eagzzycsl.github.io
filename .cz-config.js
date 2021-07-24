const appsList = require('./apps-list')

module.exports = {
  // copied from commitlint rules
  types: [
    { name: 'build:      构建相关改动', value: 'build' },
    { name: 'chore:      杂项相关改动', value: 'chore' },
    { name: 'ci:         ci相关改动', value: 'ci' },
    { name: 'docs:       文档相关改动', value: 'docs' },
    { name: 'feat:       feature增加', value: 'feat' },
    { name: 'fix:        bug修复', value: 'fix' },
    { name: 'perf:       性能优化', value: 'perf' },
    { name: 'refactor:   代码重构', value: 'refactor' },
    { name: 'revert:     revert变更', value: 'revert' },
    { name: 'style:      代码格式相关改动', value: 'style' },
    { name: 'test:       测试相关改动', value: 'test' },
  ],

  scopes: appsList.map(({ name, desc }) => ({
    name: `${name}: ${desc}`,
    value: name,
  })),
  // skip any questions you want
  skipQuestions: ['body', 'footer'],
}
