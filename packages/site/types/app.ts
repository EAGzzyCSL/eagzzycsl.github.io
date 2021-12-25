export interface IAcknowledgementItem {
  // 资源类型
  type: 'project' | 'icon' | 'image'
  // 资源名称
  title: string
  // 资源的图片地址，用于展示（如果未提供则使用title作为替代）
  image?: string
  // 资源的在线地址（如果资源本身不要求注明出处则可以不提供url）
  url?: string
  // 资源简介
  brief?: string
}

export interface IManifest<ROUTES extends string> {
  // app的路由根目录
  root?: string
  // app的简写id，目前只用于 commitlint
  shortId?: string
  // app的icon
  icon: string
  // app的标题
  title: string
  // app下的子路由
  router: {
    [key in ROUTES]: string
  }
  // app所属的桌面编号（从0开始）
  tableIndex: number
  // app使用的资源致谢
  acknowledgements?: IAcknowledgementItem[]
}

export interface AppDescribe extends IManifest<string> {
  appId: string
  root: string
  shortId: string
}

export interface StaticPath<P> {
  params: P
}

export interface StaticPathsResponse<P> {
  paths: StaticPath<P>[]
  fallback: boolean
}
