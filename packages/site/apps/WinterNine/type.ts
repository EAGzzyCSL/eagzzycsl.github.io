export interface Point {
  x: number
  y: number
}

export interface PointTrack extends Point {
  size: number
}

export interface PointMoveTo extends Point {
  type: 'M'
}

export interface PointLineTo extends Point {
  type: 'L'
}

export interface PointQuadTo extends Point {
  type: 'Q'
  cp1x: number
  cp1y: number
}

export type Outline = (PointMoveTo | PointLineTo | PointQuadTo)[]

export interface CharDescription {
  char: string
  strokes: {
    outline: Outline
    track: PointTrack[]
  }[]
}

export type XYTuple = [number, number]
