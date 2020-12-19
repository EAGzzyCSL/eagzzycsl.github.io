const { parseMarkdown } = require('./parser')

module.exports = source =>
  `export default ${JSON.stringify(parseMarkdown(source))}`
