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

  error(tag: string, ...contents: unknown[]): void {
    if (!this.enable) {
      return
    }
    // eslint-disable-next-line no-console
    console.error('◉', `#${this.group}#`, `[${tag}]`, ...contents)
  }
}

const Logger = {
  myRouter: new LoggerFor('myRouter', false),
  discussion: new LoggerFor('discussion', true),
  bookletFull: new LoggerFor('bookletFull', true),
  storage: new LoggerFor('storage', true),
  earth: new LoggerFor('earth', true),
  base: new LoggerFor('base', true),
}

export default Logger
