const appsList = require('./packages/site/scripts/apps-list')

/**
 * commit的scope由基础的scope和site下的app名两部分组成
 */
module.exports = [
  { name: 'infra', desc: '「基础结构」' },
  ...appsList.map(app => ({ name: app.shortId, desc: `「${app.title}」` })),
]
