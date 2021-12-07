export interface IChangelogItem {
  date: string
  content: string
  color: string
}

export const getColorOfDate = (date: string): string => {
  const [, month] = date.split('-').map(item => parseInt(item, 10))
  if (month >= 12) {
    return '#9E9E9E'
  }
  if (month >= 9) {
    return '#FF9800'
  }
  if (month >= 6) {
    return '#03A9F4'
  }
  if (month >= 3) {
    return '#8BC34A'
  }
  return '#9E9E9E'
}

export default [
  {
    date: '2021-12-06',
    content: '大雪，为「管城春满」添加梅花',
  },
  {
    date: '2021-09-19',
    content: '优化首页的启动与图片加载',
  },
  {
    date: '2020-12-21',
    content: '冬至夜，创建「管城春满」',
  },

  {
    date: '2020-08-22',
    content: '仲夏，第一版发布',
  },
  {
    date: '2020-07-12',
    content: '初始化站点',
  },
].map(item => ({
  ...item,
  color: getColorOfDate(item.date),
})) as IChangelogItem[]
