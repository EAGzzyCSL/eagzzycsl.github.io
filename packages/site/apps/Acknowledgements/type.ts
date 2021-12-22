export interface BasicDisplayItem {
  title: string
  url: string
  brief: string
  image?: string
}

export interface PictorialDisplayItem extends BasicDisplayItem {
  image: string
}

export type DisplayItem = BasicDisplayItem | PictorialDisplayItem

export interface DisplayData {
  icons: PictorialDisplayItem[]
  images: PictorialDisplayItem[]
  projects: DisplayItem[]
}
