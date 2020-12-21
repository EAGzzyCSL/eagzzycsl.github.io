import { PointTrack } from './type'

export const smoothPoints = (
  points: PointTrack[],
  ratio = 10,
): PointTrack[] => {
  const result: PointTrack[] = []
  if (points.length === 0) {
    return result
  }
  result.push(points[0])
  for (let i = 1; i < points.length; i += 1) {
    const previous = points[i - 1]
    const current = points[i]
    const deltaX = (current.x - previous.x) / ratio
    const deltaY = (current.y - previous.y) / ratio
    const deltaSize = (current.size - previous.size) / ratio
    for (let j = 1; j <= ratio; j += 1) {
      result.push({
        x: previous.x + deltaX * j,
        y: previous.y + deltaY * j,
        size: previous.size + deltaSize * j,
      })
    }
  }
  return result
}

const chars = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九']

export const numberToChar = (num: number): string => chars[num]
