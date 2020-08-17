const { parseMarkdown } = require('./parser')

module.exports = source => {
  return `export default ${JSON.stringify(parseMarkdown(source))}`
}
