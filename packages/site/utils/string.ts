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

export const snake2camel = (str: string): string =>
  str.replace(/(_[a-z])/g, k => k[1].toUpperCase())

export const kebab2camel = (str: string): string =>
  str.replace(/(-[a-z])/g, k => k[1].toUpperCase())

export const kebab2Pascal = (str: string): string =>
  str
    .split('-')
    .map(item =>
      item.length ? `${item[0].toUpperCase()}${item.slice(1)}` : item,
    )
    .join('')
