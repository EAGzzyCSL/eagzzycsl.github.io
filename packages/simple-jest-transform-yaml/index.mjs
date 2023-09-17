import jsYaml from 'js-yaml'

export default {
  process(sourceText) {
    return {
      code: `module.exports = ${JSON.stringify(jsYaml.load(sourceText))};`,
    }
  },
}
