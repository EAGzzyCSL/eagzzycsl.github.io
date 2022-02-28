class LoggerFor {
  private group: string

  private enable: boolean

  constructor(group: string, enable = false) {
    this.group = group
    this.enable = enable
  }

  log(tag: string, ...contents: unknown[]): void {
    if (!this.enable) {
      return
    }
    // eslint-disable-next-line no-console
    console.log('◉', `#${this.group}#`, `[${tag}]`, ...contents)
  }
}

const Logger = {
  myRouter: new LoggerFor('myRouter', false),
  discussion: new LoggerFor('discussion', true),
}

export default Logger
