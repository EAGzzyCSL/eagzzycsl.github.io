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
