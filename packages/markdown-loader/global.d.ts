declare module 'markdown-toc' {
  const d: (content: string) => {
    json: { lvl: number; content: string }[]
  }

  export = d
}
