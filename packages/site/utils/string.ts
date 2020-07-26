export const camel2snake = (str: string): string =>
  str
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase()

export const camel2kebab = (str: string): string =>
  str
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase()
