import { Point } from '../type'
import { driftNumber, getDistanceFromTwoPoints } from '../utils'

import { PlumBranchDefine } from './track'

interface BranchOutline {
  // 枝条轨迹本身
  outline: Point[]
  // 枝条宽度（以枝条根部为准）
  width: number
}

export const getTraceTotalLength = (points: Point[]): number => {
  let totalLength = 0
  for (let i = 0; i < points.length - 1; i += 1) {
    totalLength += getDistanceFromTwoPoints(
      points[i].x,
      points[i].y,
      points[i + 1].x,
      points[i + 1].y,
    )
  }
  return totalLength
}

/**
 * 根据起止点和折点画一条枝出来
 */
export const createBranchOutline = ({
  points,
  width,
}: PlumBranchDefine): BranchOutline => {
  // 为了让枝条带有一点随机性，根据控制点画点时进行一些随机的偏移
  const pointDriftRange = 0.2

  /**
   * 宽度要随着枝条的延伸不断变细，
   * 因此首先计算枝条总长度，而后计算枝条到达不同折点时的宽度
   */
  const branchTotalLength = getTraceTotalLength(points)

  /**
   * 计算每一段时画笔的宽度
   */
  const widthOfNode: number[] = []

  for (let i = 1; i < points.length - 1; i += 1) {
    const segmentLength = getDistanceFromTwoPoints(
      points[i - 1].x,
      points[i - 1].y,
      points[i].x,
      points[i].y,
    )
    const preWidth = widthOfNode.length
      ? widthOfNode[widthOfNode.length - 1]
      : width
    // 避免末端过于尖细，因此枝条宽度到末端时不要完全下降为0（可以视为整个枝条是一个梯形）
    widthOfNode.push(
      preWidth - (segmentLength / branchTotalLength) * width * 0.9,
    )
  }

  const outline: Point[] = []

  /**
   * 绘制时起点和结尾点都只绘制一个点，其余中间控制点均按照宽度上下各绘制一个节点
   * 整个枝条的形状会是两头尖，中间宽：<==>
   * 因此绘制枝条时起点注意不要为(0,0)避免起点的尖露出
   */
  const { x: startX, y: startY } = points[0]
  outline.push(points[0])

  // 勾勒上部的点
  for (let i = 1; i < points.length - 1; i += 1) {
    const { x, y } = points[i]
    const nodeWidth = widthOfNode[i - 1]
    const yPrevious = points[i - 1].y
    const yNext = points[i + 1].y
    /**
     * 勾勒点时为了美观，不能让点直接位于控制点的上下，而要一个右上一个左下
     * 需要注意的是，对于往上走的点，控制点需要左下右上（如果依然右上左下容易出现斜率不一致导致出现|><|的形状）
     * 因此这里做了一个上坡与下坡的判断，只有位于坡底的控制点才将两个点绘制与正上和整下
     */
    if (y >= yPrevious && y <= yNext) {
      outline.push({
        x: x + driftNumber(nodeWidth / 2, pointDriftRange),
        y: y - driftNumber(nodeWidth / 2, pointDriftRange),
      })
    } else if (y <= yPrevious && y >= yNext) {
      outline.push({
        x: x - driftNumber(nodeWidth / 2, pointDriftRange),
        y: y - driftNumber(nodeWidth / 2, pointDriftRange),
      })
    } else {
      outline.push({ x, y: y - driftNumber(nodeWidth / 2, pointDriftRange) })
    }
  }

  // 勾勒结尾的点
  const { x: endX, y: endY } = points[points.length - 1]
  outline.push({ x: endX, y: endY })

  // 勾勒下部的点
  for (let i = points.length - 2; i > 0; i -= 1) {
    const { x, y } = points[i]
    const nodeWidth = widthOfNode[i - 1]
    const yPrevious = points[i - 1].y
    const yNext = points[i + 1].y
    if (y >= yPrevious && y <= yNext) {
      outline.push({
        x: x - driftNumber(nodeWidth / 2, pointDriftRange),
        y: y + driftNumber(nodeWidth / 2, pointDriftRange),
      })
    } else if (y <= yPrevious && y >= yNext) {
      outline.push({
        x: x + driftNumber(nodeWidth / 2, pointDriftRange),
        y: y + driftNumber(nodeWidth / 2, pointDriftRange),
      })
    } else {
      outline.push({ x, y: y + driftNumber(nodeWidth / 2, pointDriftRange) })
    }
  }

  // 让路径重新回到起点
  outline.push({ x: startX, y: startY })

  return {
    outline,
    width,
  }
}
