const jsYaml = require('js-yaml')

module.exports = {
  process(sourceText) {
    return {
      code: `module.exports = ${JSON.stringify(jsYaml.load(sourceText))};`,
    }
  },
}
