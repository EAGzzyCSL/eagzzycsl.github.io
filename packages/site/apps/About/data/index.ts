export interface Info {
  telegram: string
  github: string
  faq: { q: string; a: string }[]
}

export default {
  telegram: 'https://t.me/eagzzycsl',
  github: 'https://github.com/EAGzzyCSL',
  faq: [
    {
      q: '这是什么？',
      a: '这是一个个人主页',
    },
    {
      q: '“芹也”是什么？',
      a:
        '《列子·杨朱》载：“宋国有田夫……谓其妻曰：‘负日之暄，人莫知者，以献吾君，将有重赏。’里之富告之曰：‘昔人有美戎菽、甘枲茎芹萍子者，对乡豪称之。乡豪取而尝之，蜇于口，惨于腹，众哂而怨之，其人大惭。’”焉知吾非呈芹之宋人哉？',
    },
    {
      q: '为什么看起来像一个安卓手机界面？',
      a: '是的，而且是有意的模仿。出于对Material Design的喜欢。',
    },
    {
      q: '为什么做这么一个网站？',
      a:
        '本质是个人博客的扩展，因为博客形式不适合所有内容的承载，而又希望呈现更多的内容',
    },
  ],
}